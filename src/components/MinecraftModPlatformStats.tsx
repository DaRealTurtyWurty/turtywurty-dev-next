import Image from "next/image";
import {
    CurseForgeProjectConfig,
    getMinecraftModPlatformStats,
    ModrinthProjectConfig,
    PlatformAvailability,
} from "@/lib/minecraftModPlatformData";
import MarketplaceLinkButton from "@/components/MarketplaceLinkButton";

type MinecraftModPlatformStatsProps = {
    title?: string;
    description?: string;
    modrinth?: ModrinthProjectConfig;
    curseForge?: CurseForgeProjectConfig;
    revalidateSeconds?: number;
};

type PlatformStatCardProps = {
    label: string;
    value: string;
    helperText: string;
    iconSrc?: string;
    accentClassName: string;
    iconWrapperClassName: string;
};

function formatNumber(value: number | null, partial = false): string {
    if (value === null || Number.isNaN(value)) {
        return "Unavailable";
    }

    return `${new Intl.NumberFormat("en-US").format(value)}${partial ? "+" : ""}`;
}

function getPlatformHelperText(availability: PlatformAvailability, versionCount: number): string {
    if (availability === "missing_api_key") {
        return "Awaiting API access";
    }

    if (availability === "unavailable") {
        return "Unavailable right now";
    }

    return `${new Intl.NumberFormat("en-US").format(versionCount)} supported versions`;
}

function PlatformStatCard({
    label,
    value,
    helperText,
    iconSrc,
    accentClassName,
    iconWrapperClassName,
}: PlatformStatCardProps) {
    return (
        <article
            className={`rounded-lg border bg-white p-4 shadow-md dark:bg-gray-800 ${accentClassName}`}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="mt-1 font-semibold text-lg sm:text-xl text-gray-900 dark:text-gray-100">{value}</p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{helperText}</p>
                </div>
                {iconSrc && (
                    <div className={`rounded-full p-2.5 ${iconWrapperClassName}`}>
                        <Image src={iconSrc} alt="" aria-hidden="true" width={20} height={20}/>
                    </div>
                )}
            </div>
        </article>
    );
}

export default async function MinecraftModPlatformStats({
    title = "Downloads & Versions",
    description = "Combined download counts and supported Minecraft versions across the available platforms.",
    modrinth,
    curseForge,
    revalidateSeconds = 60 * 60,
}: MinecraftModPlatformStatsProps) {
    const stats = await getMinecraftModPlatformStats({
        modrinth,
        curseForge,
        revalidateSeconds,
    });
    const showModrinth = stats.modrinth.availability === "available";
    const showCurseForge = stats.curseForge.availability === "available";
    const visiblePlatformCount = Number(showModrinth) + Number(showCurseForge);

    if (visiblePlatformCount === 0) {
        return null;
    }

    const totalDownloadsHelperText = stats.totalDownloads === null
        ? "Unavailable right now"
        : stats.totalDownloadsPartial
            ? "Partial total from available sources"
            : "Combined across both platforms";
    const statsGridClassName = visiblePlatformCount === 2
        ? "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        : "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4";

    return (
        <>
            <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-3 shrink-0">
                        {showModrinth && modrinth?.url && (
                            <MarketplaceLinkButton
                                platform="modrinth"
                                href={modrinth.url}
                                variant="outline"
                                label={modrinth.label ?? "Modrinth"}
                            />
                        )}
                        {showCurseForge && curseForge?.url && (
                            <MarketplaceLinkButton
                                platform="curseforge"
                                href={curseForge.url}
                                variant="outline"
                                label={curseForge.label ?? "CurseForge"}
                            />
                        )}
                    </div>
                </div>

                <div className={statsGridClassName}>
                    <PlatformStatCard
                        label="Total Downloads"
                        value={formatNumber(stats.totalDownloads, stats.totalDownloadsPartial)}
                        helperText={totalDownloadsHelperText}
                        accentClassName="border-gray-200 dark:border-gray-700"
                        iconWrapperClassName="bg-gray-100 dark:bg-gray-900"
                    />
                    {showModrinth && (
                        <PlatformStatCard
                            label={`${stats.modrinth.label} Downloads`}
                            value={formatNumber(stats.modrinth.downloads)}
                            helperText={getPlatformHelperText(stats.modrinth.availability, stats.modrinth.versions.length)}
                            iconSrc="/images/modrinth_icon.svg"
                            accentClassName="border-emerald-200 dark:border-emerald-800"
                            iconWrapperClassName="bg-emerald-100 dark:bg-emerald-950/50"
                        />
                    )}
                    {showCurseForge && (
                        <PlatformStatCard
                            label={`${stats.curseForge.label} Downloads`}
                            value={formatNumber(stats.curseForge.downloads)}
                            helperText={getPlatformHelperText(stats.curseForge.availability, stats.curseForge.versions.length)}
                            iconSrc="/images/curseforge_icon.svg"
                            accentClassName="border-orange-200 dark:border-orange-800"
                            iconWrapperClassName="bg-orange-100 dark:bg-orange-950/50"
                        />
                    )}
                </div>

                <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Supported Minecraft Versions</p>
                            <h3 className="mt-2 text-xl font-semibold">{stats.versions.length > 0 ? `${stats.versions.length} versions` : "No versions available"}</h3>
                        </div>
                        {showModrinth && showCurseForge && (
                            <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                                <p>{stats.modrinth.versions.length} on Modrinth</p>
                                <p>{stats.curseForge.versions.length} on CurseForge</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2.5">
                        {stats.versions.length > 0 ? stats.versions.map((version) => {
                            const className = version.onModrinth && version.onCurseForge
                                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                                : version.onModrinth
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200"
                                    : "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200";

                            return (
                                <span
                                    key={version.version}
                                    className={`rounded-full px-3 py-1.5 text-sm font-medium shadow-sm ${className}`}
                                    title={version.onModrinth && version.onCurseForge
                                        ? "Available on Modrinth and CurseForge"
                                        : version.onModrinth
                                            ? "Available on Modrinth"
                                            : "Available on CurseForge"}
                                >
                                    {version.version}
                                </span>
                            );
                        }) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Version data is unavailable right now.
                            </p>
                        )}
                    </div>

                    <div className="mt-6 grid gap-3 text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3">
                        {showModrinth && showCurseForge && (
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-gray-900 dark:bg-gray-100"/>
                                Both platforms
                            </div>
                        )}
                        {showModrinth && (
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-emerald-500"/>
                                {showCurseForge ? "Modrinth only" : "Modrinth"}
                            </div>
                        )}
                        {showCurseForge && (
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-orange-500"/>
                                {showModrinth ? "CurseForge only" : "CurseForge"}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
