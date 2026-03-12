import {ModerinthApiError, ModrinthV2Client} from "@xmcl/modrinth";
import {unstable_cache} from "next/cache";
import Curseforge from "node-curseforge";

export type ModrinthProjectConfig = {
    projectId: string;
    url?: string;
    label?: string;
};

export type CurseForgeProjectConfig = {
    projectId?: number;
    slug?: string;
    url?: string;
    label?: string;
};

export type MinecraftModPlatformStatsInput = {
    modrinth?: ModrinthProjectConfig;
    curseForge?: CurseForgeProjectConfig;
    revalidateSeconds?: number;
};

export type PlatformAvailability = "available" | "unavailable" | "missing_api_key";

export type PlatformVersionPresence = {
    version: string;
    onModrinth: boolean;
    onCurseForge: boolean;
};

export type MarketplacePlatformSnapshot = {
    downloads: number | null;
    versions: string[];
    url?: string;
    label: string;
    availability: PlatformAvailability;
};

export type MinecraftModPlatformStats = {
    totalDownloads: number | null;
    totalDownloadsPartial: boolean;
    modrinth: MarketplacePlatformSnapshot;
    curseForge: MarketplacePlatformSnapshot;
    versions: PlatformVersionPresence[];
};

type CurseForgeModLike = {
    id: number;
    slug?: string;
    downloadCount?: number;
    links?: {
        websiteUrl?: string;
    };
};

type CurseForgeFileLike = {
    gameVersions?: string[];
};

type CurseForgeSearchOptions = {
    index?: number;
    pageSize?: number;
    searchFilter?: string;
};

const CURSEFORGE_MINECRAFT_GAME_ID = 432;
const CURSEFORGE_PAGE_SIZE = 50;
const MINECRAFT_VERSION_PATTERN = /^\d+\.\d+(?:\.\d+)?$/;
const curseForgeClients = new Map<string, Curseforge>();
const modrinthClient = new ModrinthV2Client();

function createUnavailableSnapshot(label: string, url?: string): MarketplacePlatformSnapshot {
    return {
        downloads: null,
        versions: [],
        url,
        label,
        availability: "unavailable",
    };
}

function isMinecraftVersion(value: string): boolean {
    return MINECRAFT_VERSION_PATTERN.test(value.trim());
}

function compareMinecraftVersionsDesc(left: string, right: string): number {
    const leftParts = left.split(".").map(Number);
    const rightParts = right.split(".").map(Number);
    const maxLength = Math.max(leftParts.length, rightParts.length);

    for (let index = 0; index < maxLength; index += 1) {
        const leftPart = leftParts[index] ?? 0;
        const rightPart = rightParts[index] ?? 0;

        if (leftPart !== rightPart) {
            return rightPart - leftPart;
        }
    }

    return 0;
}

function normalizeVersions(values: string[]): string[] {
    return [...new Set(values.map((value) => value.trim()).filter(isMinecraftVersion))]
        .sort(compareMinecraftVersionsDesc);
}

function buildVersionPresence(modrinthVersions: string[], curseForgeVersions: string[]): PlatformVersionPresence[] {
    const normalizedModrinthVersions = normalizeVersions(modrinthVersions);
    const normalizedCurseForgeVersions = normalizeVersions(curseForgeVersions);
    const modrinthSet = new Set(normalizedModrinthVersions);
    const curseForgeSet = new Set(normalizedCurseForgeVersions);

    return normalizeVersions([...normalizedModrinthVersions, ...normalizedCurseForgeVersions]).map((version) => ({
        version,
        onModrinth: modrinthSet.has(version),
        onCurseForge: curseForgeSet.has(version),
    }));
}

function getCurseForgeClient(apiKey: string): Curseforge {
    let client = curseForgeClients.get(apiKey);

    if (!client) {
        client = new Curseforge(apiKey);
        curseForgeClients.set(apiKey, client);
    }

    return client;
}

function hasCurseForgeErrorCode(error: unknown, code: number): boolean {
    return typeof error === "object"
        && error !== null
        && "code" in error
        && (error as {code?: number}).code === code;
}

async function fetchModrinthStatsUncached(
    config: ModrinthProjectConfig
): Promise<MarketplacePlatformSnapshot> {
    try {
        const project = await modrinthClient.getProject(config.projectId);

        return {
            downloads: typeof project.downloads === "number" ? project.downloads : null,
            versions: normalizeVersions(project.game_versions ?? []),
            url: config.url,
            label: config.label ?? "Modrinth",
            availability: "available",
        };
    } catch (error) {
        if (error instanceof ModerinthApiError && error.status === 404) {
            console.warn(`Modrinth project "${config.projectId}" was not found.`);
        } else {
            console.warn(`Modrinth data is unavailable for "${config.projectId}".`);
        }

        return {
            downloads: null,
            versions: [],
            url: config.url,
            label: config.label ?? "Modrinth",
            availability: "unavailable",
        };
    }
}

async function fetchModrinthStats(
    config: ModrinthProjectConfig,
    revalidateSeconds: number
): Promise<MarketplacePlatformSnapshot> {
    const getCachedStats = unstable_cache(
        async (cachedConfig: ModrinthProjectConfig) => fetchModrinthStatsUncached(cachedConfig),
        ["minecraft-mod-platform-stats", "modrinth"],
        {revalidate: revalidateSeconds}
    );

    return getCachedStats(config);
}

async function fetchCurseForgeModBySlug(
    client: Curseforge,
    slug: string,
): Promise<CurseForgeModLike | null> {
    const normalizedSlug = slug.toLowerCase();
    const searchAttempts: CurseForgeSearchOptions[] = [
        {searchFilter: slug, pageSize: CURSEFORGE_PAGE_SIZE},
        {searchFilter: slug.replace(/-/g, " "), pageSize: CURSEFORGE_PAGE_SIZE},
    ];

    for (const options of searchAttempts) {
        try {
            const results = await client.search_mods(
                CURSEFORGE_MINECRAFT_GAME_ID,
                options
            );

            const exactMatch = results.find((mod) => mod.slug?.toLowerCase() === normalizedSlug)
                ?? results.find((mod) => mod.links?.websiteUrl?.toLowerCase().endsWith(`/${normalizedSlug}`));

            if (exactMatch) {
                return exactMatch as CurseForgeModLike;
            }
        } catch (error) {
            if (hasCurseForgeErrorCode(error, 400)) {
                continue;
            }

            throw error;
        }
    }

    return null;
}

async function fetchCurseForgeModById(
    client: Curseforge,
    modId: number,
): Promise<CurseForgeModLike | null> {
    const mod = await client.get_mod(modId);
    return mod as CurseForgeModLike;
}

async function fetchCurseForgeFiles(
    client: Curseforge,
    modId: number,
): Promise<CurseForgeFileLike[]> {
    const files: CurseForgeFileLike[] = [];
    let index = 0;

    while (true) {
        const pageFiles = await client.get_files(modId, {
            index,
            pageSize: CURSEFORGE_PAGE_SIZE,
        });

        files.push(...pageFiles);

        const pagination = pageFiles.paging;
        if (!pagination || pagination.resultCount === 0 || index + pagination.resultCount >= pagination.totalCount) {
            break;
        }

        index += pagination.pageSize;
    }

    return files;
}

async function fetchCurseForgeStatsUncached(
    config: CurseForgeProjectConfig,
    apiKey: string
): Promise<MarketplacePlatformSnapshot> {
    const label = config.label ?? "CurseForge";
    const client = getCurseForgeClient(apiKey);
    const projectIdentifier = config.slug ?? (typeof config.projectId === "number" ? String(config.projectId) : "unknown");

    try {
        let modId = config.projectId;
        let downloadCount: number | null = null;

        if (modId) {
            const mod = await fetchCurseForgeModById(client, modId);
            downloadCount = typeof mod?.downloadCount === "number" ? mod.downloadCount : null;
        } else if (config.slug) {
            const mod = await fetchCurseForgeModBySlug(client, config.slug);
            modId = mod?.id;
            downloadCount = typeof mod?.downloadCount === "number" ? mod.downloadCount : null;
        }

        if (!modId) {
            console.warn(`CurseForge project "${projectIdentifier}" was not found.`);

            return {
                downloads: downloadCount,
                versions: [],
                url: config.url,
                label,
                availability: "unavailable",
            };
        }

        const files = await fetchCurseForgeFiles(client, modId);
        const versions = normalizeVersions(
            files.flatMap((file) => file.gameVersions ?? [])
        );

        return {
            downloads: downloadCount,
            versions,
            url: config.url,
            label,
            availability: "available",
        };
    } catch (error) {
        if (hasCurseForgeErrorCode(error, 404)) {
            console.warn(`CurseForge project "${projectIdentifier}" was not found.`);
        } else {
            console.warn(`CurseForge data is unavailable for "${projectIdentifier}".`);
        }

        return {
            downloads: null,
            versions: [],
            url: config.url,
            label,
            availability: "unavailable",
        };
    }
}

async function fetchCurseForgeStats(
    config: CurseForgeProjectConfig,
    revalidateSeconds: number
): Promise<MarketplacePlatformSnapshot> {
    const apiKey = process.env.CURSEFORGE_API_KEY;
    const label = config.label ?? "CurseForge";

    if (!apiKey || apiKey === "your_api_key_here") {
        console.warn("CURSEFORGE_API_KEY is not set. CurseForge marketplace stats will be unavailable.");

        return {
            downloads: null,
            versions: [],
            url: config.url,
            label,
            availability: "missing_api_key",
        };
    }

    const getCachedStats = unstable_cache(
        async (cachedConfig: CurseForgeProjectConfig, cachedApiKey: string) => fetchCurseForgeStatsUncached(cachedConfig, cachedApiKey),
        ["minecraft-mod-platform-stats", "curseforge"],
        {revalidate: revalidateSeconds}
    );

    return getCachedStats(config, apiKey);
}

export async function getMinecraftModPlatformStats({
    modrinth,
    curseForge,
    revalidateSeconds = 60 * 60,
}: MinecraftModPlatformStatsInput): Promise<MinecraftModPlatformStats> {
    const configuredPlatformCount = Number(Boolean(modrinth)) + Number(Boolean(curseForge));
    const [modrinthStats, curseForgeStats] = await Promise.all([
        modrinth
            ? fetchModrinthStats(modrinth, revalidateSeconds)
            : Promise.resolve(createUnavailableSnapshot("Modrinth")),
        curseForge
            ? fetchCurseForgeStats(curseForge, revalidateSeconds)
            : Promise.resolve(createUnavailableSnapshot("CurseForge")),
    ]);

    const availableDownloads = [modrinthStats.downloads, curseForgeStats.downloads]
        .filter((value): value is number => typeof value === "number");

    return {
        totalDownloads: availableDownloads.length > 0
            ? availableDownloads.reduce((sum, value) => sum + value, 0)
            : null,
        totalDownloadsPartial: availableDownloads.length > 0 && availableDownloads.length < configuredPlatformCount,
        modrinth: modrinthStats,
        curseForge: curseForgeStats,
        versions: buildVersionPresence(modrinthStats.versions, curseForgeStats.versions),
    };
}
