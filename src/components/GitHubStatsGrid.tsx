import {Meteors} from "@/shadcn/components/ui/meteors";

type RepoResponse = {
    stargazers_count: number;
    pushed_at: string | null;
};

type ReleaseResponse = {
    published_at: string | null;
    prerelease?: boolean;
};

type LanguagesResponse = Record<string, number>;

type CommitStatsResponse = {
    totalCommits: number | null;
};

type RepoStats = {
    totalCommits: string;
    openIssues: string;
    latestReleaseRelative: string;
    latestReleaseFull: string;
    lastUpdatedRelative: string;
    lastUpdatedFull: string;
    stars: string;
    languages: string;
};

type BuiltInStatKey =
    | "totalCommits"
    | "openIssues"
    | "latestRelease"
    | "lastUpdated"
    | "stars"
    | "languages";

type StatItem = {
    label: string;
    value: string;
    valueClassName?: string;
    hoverDetail?: string;
};

type CustomStatItem = StatItem & {
    key: string;
};

type CardAccent = {
    containerClassName: string;
    dotClassName: string;
};

type GitHubStatsGridProps = {
    owner: string;
    repo: string;
    title?: string;
    revalidateSeconds?: number;
    enabledStats?: BuiltInStatKey[];
    customStats?: CustomStatItem[];
};

const GITHUB_API_BASE = "https://api.github.com";

const FALLBACK_STATS: RepoStats = {
    totalCommits: "Unavailable",
    openIssues: "Unavailable",
    latestReleaseRelative: "No releases yet",
    latestReleaseFull: "No releases yet",
    lastUpdatedRelative: "Unavailable",
    lastUpdatedFull: "Unavailable",
    stars: "Unavailable",
    languages: "Unavailable",
};

const DEFAULT_STAT_ORDER: BuiltInStatKey[] = [
    "totalCommits",
    "openIssues",
    "latestRelease",
    "lastUpdated",
    "stars",
    "languages",
];

const CARD_ACCENTS: CardAccent[] = [
    {
        containerClassName: "border-t-4 border-t-blue-500/70 dark:border-t-blue-400/80 bg-gradient-to-br from-blue-50/60 to-white dark:from-blue-950/20 dark:to-gray-800",
        dotClassName: "bg-blue-500 dark:bg-blue-400",
    },
    {
        containerClassName: "border-t-4 border-t-emerald-500/70 dark:border-t-emerald-400/80 bg-gradient-to-br from-emerald-50/60 to-white dark:from-emerald-950/20 dark:to-gray-800",
        dotClassName: "bg-emerald-500 dark:bg-emerald-400",
    },
    {
        containerClassName: "border-t-4 border-t-amber-500/70 dark:border-t-amber-400/80 bg-gradient-to-br from-amber-50/60 to-white dark:from-amber-950/20 dark:to-gray-800",
        dotClassName: "bg-amber-500 dark:bg-amber-400",
    },
    {
        containerClassName: "border-t-4 border-t-rose-500/70 dark:border-t-rose-400/80 bg-gradient-to-br from-rose-50/60 to-white dark:from-rose-950/20 dark:to-gray-800",
        dotClassName: "bg-rose-500 dark:bg-rose-400",
    },
    {
        containerClassName: "border-t-4 border-t-violet-500/70 dark:border-t-violet-400/80 bg-gradient-to-br from-violet-50/60 to-white dark:from-violet-950/20 dark:to-gray-800",
        dotClassName: "bg-violet-500 dark:bg-violet-400",
    },
    {
        containerClassName: "border-t-4 border-t-cyan-500/70 dark:border-t-cyan-400/80 bg-gradient-to-br from-cyan-50/60 to-white dark:from-cyan-950/20 dark:to-gray-800",
        dotClassName: "bg-cyan-500 dark:bg-cyan-400",
    },
];

const PATTERN_SVGS: Record<string, string> = {
    totalCommits: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024' fill='rgba(107,114,128,0.18)'><path d='M740 161c-61.8 0-112 50.2-112 112 0 50.1 33.1 92.6 78.5 106.9v95.9L320 602.4V318.1c44.2-15 76-56.9 76-106.1 0-61.8-50.2-112-112-112s-112 50.2-112 112c0 49.2 31.8 91 76 106.1V706c-44.2 15-76 56.9-76 106.1 0 61.8 50.2 112 112 112s112-50.2 112-112c0-49.2-31.8-91-76-106.1v-27.8l423.5-138.7a50.52 50.52 0 0 0 34.9-48.2V378.2c42.9-15.8 73.6-57 73.6-105.2 0-61.8-50.2-112-112-112zm-504 51a48.01 48.01 0 0 1 96 0 48.01 48.01 0 0 1-96 0zm96 600a48.01 48.01 0 0 1-96 0 48.01 48.01 0 0 1 96 0zm408-491a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z'/></svg>`,
    openIssues: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(107,114,128,0.18)' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='8'/><path d='M12 8v5'/><path d='M12 16h.01'/></svg>`,
    latestRelease: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(107,114,128,0.18)' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'><path d='M7 10V4h10v6'/><rect x='5' y='10' width='14' height='10' rx='2'/><path d='M9 14h6'/></svg>`,
    lastUpdated: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(107,114,128,0.18)' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='8'/><path d='M12 7v5l3 2'/></svg>`,
    stars: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='rgba(107,114,128,0.16)'><path d='M12 3.5 14.5 8.8l5.9.8-4.3 4.2 1 5.8L12 16.7 6.9 19.4l1-5.8-4.3-4.2 5.9-.8L12 3.5Z'/></svg>`,
    languages: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(107,114,128,0.18)' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'><path d='m9 8-4 4 4 4'/><path d='m15 8 4 4-4 4'/></svg>`,
    default: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(107,114,128,0.16)' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='5'/></svg>`,
};

function getCardPatternStyle(statKey: string): {
    backgroundImage: string;
    backgroundRepeat: string;
    backgroundSize: string
} {
    const svg = PATTERN_SVGS[statKey] ?? PATTERN_SVGS.default;
    return {
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "30px 30px",
    };
}

function renderHoverEffect(statKey: string, statValue: string) {
    if (statKey === "stars") {
        return (
            <div
                className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Meteors
                    className="!absolute !inset-0 rounded-lg"
                    count={100}
                    angle={215}
                    color="#dbeafe"
                    tailColor="#93c5fd"
                    showBackground={false}
                    showOverlay={false}
                    showVignette={false}
                />
            </div>
        );
    }

    if (statKey === "totalCommits") {
        return (
            <div aria-hidden="true"
                 className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-20 w-28 -translate-x-1/2 translate-y-[85%] opacity-0 transition-all duration-500 ease-out group-hover:-translate-y-1/2 group-hover:opacity-100">
                <svg viewBox="0 0 120 40" className="absolute inset-0 h-full w-full">
                    <path
                        d="M14 20h92"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        className="text-blue-500/50 dark:text-blue-300/50 opacity-0 group-hover:animate-[commit-line-pulse_900ms_ease-out_forwards]"
                    />
                    <circle
                        cx="14"
                        cy="20"
                        r="3.2"
                        className="fill-blue-500/85 dark:fill-blue-300/85 origin-center [transform-box:fill-box] group-hover:animate-[commit-node-pulse_1200ms_ease-out_infinite]"
                    />
                    <circle
                        cx="60"
                        cy="20"
                        r="4.6"
                        className="fill-blue-500/90 dark:fill-blue-300/90 origin-center [transform-box:fill-box] [animation-delay:170ms] group-hover:animate-[commit-node-pulse_1200ms_ease-out_infinite]"
                    />
                    <circle
                        cx="106"
                        cy="20"
                        r="3.2"
                        className="fill-blue-500/85 dark:fill-blue-300/85 origin-center [transform-box:fill-box] [animation-delay:340ms] group-hover:animate-[commit-node-pulse_1200ms_ease-out_infinite]"
                    />
                </svg>
            </div>
        );
    }

    if (statKey === "openIssues") {
        return (
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-1/2 top-full z-10 h-16 w-16 -translate-x-1/2 text-amber-500/75 dark:text-amber-300/75 opacity-0 transition-all duration-500 ease-out group-hover:top-1/2 group-hover:-translate-y-1/2 group-hover:opacity-100"
                fill="currentColor"
            >
                <path d="M1.4 20.2h21.2L12 1.8 1.4 20.2Zm11.6-2.5h-2v-2h2v2Zm0-3.8h-2v-5h2v5Z"/>
            </svg>
        );
    }

    if (statKey === "languages" && /\bJava\b/i.test(statValue)) {
        return (
            <div aria-hidden="true"
                 className="pointer-events-none absolute left-1/2 -bottom-20 z-10 h-24 w-24 -translate-x-1/2 opacity-0 transition-all duration-500 ease-out group-hover:-bottom-4 group-hover:opacity-100">
                <svg viewBox="0 0 24 24"
                     className="absolute bottom-2 left-1/2 h-14 w-14 -translate-x-1/2 text-[#6f4e37]/80 dark:text-[#c4a484]/80"
                     fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 10h11v2.5a4.5 4.5 0 0 1-4.5 4.5h-2A4.5 4.5 0 0 1 5 12.5V10Z" fill="currentColor"
                          stroke="none"/>
                    <path d="M5 10h11v2.5a4.5 4.5 0 0 1-4.5 4.5h-2A4.5 4.5 0 0 1 5 12.5V10Z"/>
                    <path d="M16 11.2h2.1a2.4 2.4 0 0 1 0 4.8H16"/>
                    <path d="M4 18h16" fill="currentColor" stroke="none"/>
                </svg>
                <div className="absolute left-[calc(50%-3px)] bottom-[2.275rem] h-10 w-10 -translate-x-1/2">
                    <svg viewBox="0 0 12 32"
                         className="absolute left-1 top-0 h-10 w-4 text-gray-500/75 dark:text-gray-300/75 opacity-0 group-hover:animate-[coffee-wisp-1_1200ms_ease-out_infinite]"
                         fill="none">
                        <path d="M6 30C2 25 10 21 6 15C2 10 10 6 6 2" stroke="currentColor" strokeWidth="1.6"
                              strokeLinecap="round"/>
                    </svg>
                    <svg viewBox="0 0 12 32"
                         className="absolute left-4 top-0 h-10 w-4 text-gray-500/75 dark:text-gray-300/75 opacity-0 [animation-delay:140ms] group-hover:animate-[coffee-wisp-2_1280ms_ease-out_infinite]"
                         fill="none">
                        <path d="M6 30C9 24 2 20 6 14C9 9 2 5 6 2" stroke="currentColor" strokeWidth="1.6"
                              strokeLinecap="round"/>
                    </svg>
                    <svg viewBox="0 0 12 32"
                         className="absolute left-7 top-1 h-9 w-4 text-gray-500/70 dark:text-gray-300/70 opacity-0 [animation-delay:260ms] group-hover:animate-[coffee-wisp-3_1180ms_ease-out_infinite]"
                         fill="none">
                        <path d="M6 30C2 25 10 20 6 14C2 9 10 5 6 2" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round"/>
                    </svg>
                </div>
            </div>
        );
    }

    return null;
}

async function fetchGitHub(path: string, revalidateSeconds: number): Promise<Response> {
    return fetch(`${GITHUB_API_BASE}${path}`, {
        headers: {
            Accept: "application/vnd.github+json",
        },
        next: {revalidate: revalidateSeconds},
    });
}

function formatNumber(value: number | null): string {
    if (value === null || Number.isNaN(value)) {
        return "Unavailable";
    }

    return new Intl.NumberFormat("en-US").format(value);
}

function formatDateTime(value: string | null): string {
    if (!value) {
        return "Unavailable";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "Unavailable";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
        timeZoneName: "short",
    }).format(date);
}

function formatLanguages(languages: LanguagesResponse): string {
    const entries = Object.entries(languages);
    if (entries.length === 0) {
        return "Unavailable";
    }

    const totalBytes = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
    if (totalBytes === 0) {
        return "Unavailable";
    }

    const languagePercentages = entries
        .sort(([, aBytes], [, bBytes]) => bBytes - aBytes)
        .map(([language, bytes]) => {
            const rawPercentage = (bytes / totalBytes) * 100;
            return {
                language,
                rawPercentage,
                formattedPercentage: rawPercentage >= 1 ? `${Math.round(rawPercentage)}%` : "<1%",
            };
        });

    const meaningfulLanguages = languagePercentages
        .filter(({rawPercentage}) => rawPercentage >= 1)
        .slice(0, 3);

    const selectedLanguages = meaningfulLanguages.length > 0
        ? meaningfulLanguages
        : languagePercentages.slice(0, 3);

    return selectedLanguages
        .map(({language, formattedPercentage}) => `${language} ${formattedPercentage}`)
        .join(" • ");
}

function formatRelativeTime(value: string | null): string {
    if (!value) {
        return "Unavailable";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "Unavailable";
    }

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) {
        return "Just now";
    }

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    if (diffMs < minute) return "Just now";
    if (diffMs < hour) {
        const mins = Math.floor(diffMs / minute);
        return `${mins} minute${mins === 1 ? "" : "s"} ago`;
    }
    if (diffMs < day) {
        const hours = Math.floor(diffMs / hour);
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }
    if (diffMs < week) {
        const days = Math.floor(diffMs / day);
        return `${days} day${days === 1 ? "" : "s"} ago`;
    }
    if (diffMs < month) {
        const weeks = Math.floor(diffMs / week);
        return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
    }
    if (diffMs < year) {
        const months = Math.floor(diffMs / month);
        return `${months} month${months === 1 ? "" : "s"} ago`;
    }

    const years = Math.floor(diffMs / year);
    return `${years} year${years === 1 ? "" : "s"} ago`;
}

async function fetchTotalCommits(owner: string, repo: string, revalidateSeconds: number): Promise<CommitStatsResponse> {
    try {
        const response = await fetchGitHub(
            `/repos/${owner}/${repo}/commits?per_page=1`,
            revalidateSeconds
        );

        if (!response.ok) {
            return {totalCommits: null};
        }

        const linkHeader = response.headers.get("link");
        if (linkHeader) {
            const lastPageMatch = linkHeader.match(/[?&]page=(\d+)>;\s*rel="last"/);
            if (lastPageMatch?.[1]) {
                return {totalCommits: Number.parseInt(lastPageMatch[1], 10)};
            }
        }

        const commits = (await response.json()) as unknown[];
        return {totalCommits: commits.length};
    } catch {
        return {totalCommits: null};
    }
}

async function fetchRepoStats(owner: string, repo: string, revalidateSeconds: number): Promise<RepoStats> {
    try {
        const [repoResponse, releaseResponse, languagesResponse, commitStats] = await Promise.all([
            fetchGitHub(`/repos/${owner}/${repo}`, revalidateSeconds),
            fetchGitHub(`/repos/${owner}/${repo}/releases/latest`, revalidateSeconds),
            fetchGitHub(`/repos/${owner}/${repo}/languages`, revalidateSeconds),
            fetchTotalCommits(owner, repo, revalidateSeconds),
        ]);

        if (!repoResponse.ok || !languagesResponse.ok) {
            return FALLBACK_STATS;
        }

        const repoData = (await repoResponse.json()) as RepoResponse;
        const languagesData = (await languagesResponse.json()) as LanguagesResponse;

        let latestReleasePublishedAt: string | null = null;
        let latestReleaseIsPrerelease = false;
        if (releaseResponse.ok) {
            const releaseData = (await releaseResponse.json()) as ReleaseResponse;
            latestReleasePublishedAt = releaseData.published_at;
            latestReleaseIsPrerelease = Boolean(releaseData.prerelease);
        } else {
            const anyReleaseResponse = await fetchGitHub(
                `/repos/${owner}/${repo}/releases?per_page=1`,
                revalidateSeconds
            );

            if (anyReleaseResponse.ok) {
                const releaseList = (await anyReleaseResponse.json()) as ReleaseResponse[];
                const latestAnyRelease = releaseList[0];
                if (latestAnyRelease?.published_at) {
                    latestReleasePublishedAt = latestAnyRelease.published_at;
                    latestReleaseIsPrerelease = Boolean(latestAnyRelease.prerelease);
                }
            }
        }

        const releaseSuffix = latestReleaseIsPrerelease ? " (pre-release)" : "";
        const latestReleaseRelative = latestReleasePublishedAt
            ? `${formatRelativeTime(latestReleasePublishedAt)}${releaseSuffix}`
            : "No releases yet";
        const latestReleaseFull = latestReleasePublishedAt
            ? `${formatDateTime(latestReleasePublishedAt)}${releaseSuffix}`
            : "No releases yet";

        const openIssuesResponse = await fetchGitHub(
            `/search/issues?q=repo:${owner}/${repo}+is:issue+is:open&per_page=1`,
            revalidateSeconds
        );

        let openIssues = "Unavailable";
        if (openIssuesResponse.ok) {
            const openIssuesData = (await openIssuesResponse.json()) as { total_count?: number };
            openIssues = formatNumber(openIssuesData.total_count ?? null);
        }

        return {
            totalCommits: formatNumber(commitStats.totalCommits),
            openIssues,
            latestReleaseRelative,
            latestReleaseFull,
            lastUpdatedRelative: formatRelativeTime(repoData.pushed_at),
            lastUpdatedFull: formatDateTime(repoData.pushed_at),
            stars: formatNumber(repoData.stargazers_count),
            languages: formatLanguages(languagesData),
        };
    } catch {
        return FALLBACK_STATS;
    }
}

export default async function GitHubStatsGrid({
                                                  owner,
                                                  repo,
                                                  title = "GitHub Stats",
                                                  revalidateSeconds = 60 * 30,
                                                  enabledStats = DEFAULT_STAT_ORDER,
                                                  customStats = [],
                                              }: GitHubStatsGridProps) {
    const stats = await fetchRepoStats(owner, repo, revalidateSeconds);
    const builtInStatItems: Record<BuiltInStatKey, StatItem> = {
        totalCommits: {label: "Total Commits", value: stats.totalCommits},
        openIssues: {label: "Open Issues", value: stats.openIssues},
        latestRelease: {
            label: "Latest Release",
            value: stats.latestReleaseRelative,
            hoverDetail: stats.latestReleaseFull
        },
        lastUpdated: {label: "Last Updated", value: stats.lastUpdatedRelative, hoverDetail: stats.lastUpdatedFull},
        stars: {label: "Stars", value: stats.stars},
        languages: {label: "Languages", value: stats.languages, valueClassName: "text-sm sm:text-base"},
    };

    const statItems = enabledStats.map((key) => ({
        key,
        ...builtInStatItems[key],
    }));

    const extraStatItems = customStats.map((stat) => ({
        key: stat.key,
        label: stat.label,
        value: stat.value,
        valueClassName: stat.valueClassName,
        hoverDetail: stat.hoverDetail,
    }));
    const allStatItems = [...statItems, ...extraStatItems];

    function getTwoColumnCenterClass(index: number, total: number): string {
        const remainder = total % 2;
        if (remainder === 1 && index === total - 1) {
            return "col-start-2";
        }

        return "";
    }

    function getThreeColumnCenterClass(index: number, total: number): string {
        const remainder = total % 3;

        if (remainder === 1 && index === total - 1) {
            return "lg:col-start-3";
        }

        if (remainder === 2) {
            if (index === total - 2) return "lg:col-start-2";
            if (index === total - 1) return "lg:col-start-4";
        }

        return "";
    }

    return <>
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
            {allStatItems.map((statItem, index) => {
                const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
                const patternStyle = getCardPatternStyle(statItem.key);
                return (
                    <div
                        key={statItem.key}
                        className={`group relative overflow-hidden col-span-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${accent.containerClassName} ${getTwoColumnCenterClass(index, allStatItems.length)} ${getThreeColumnCenterClass(index, allStatItems.length)}`}>
                        <div
                            aria-hidden="true"
                            className="absolute -inset-16 pointer-events-none opacity-70 dark:opacity-55 -rotate-[22deg]"
                            style={patternStyle}
                        />
                        {renderHoverEffect(statItem.key, statItem.value)}
                        <p className="relative z-10 text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                            <span className={`inline-block h-1.5 w-1.5 rounded-full ${accent.dotClassName}`}/>
                            {statItem.label}
                        </p>
                        {statItem.hoverDetail ? (
                            <div
                                className={`relative z-10 mt-1 overflow-hidden h-7 sm:h-8 ${statItem.valueClassName ?? ""}`}>
                                <div
                                    className="transition-transform duration-300 ease-out group-hover:-translate-y-7 sm:group-hover:-translate-y-8">
                                    <p className="h-7 sm:h-8 flex items-center font-semibold text-base sm:text-lg leading-none text-gray-900 dark:text-gray-100">
                                        {statItem.value}
                                    </p>
                                    <p className="h-7 sm:h-8 flex items-center font-semibold text-[13px] sm:text-sm leading-none text-gray-900 dark:text-gray-100">
                                        {statItem.hoverDetail}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p
                                className={`relative z-10 mt-1 font-semibold text-base sm:text-lg leading-snug text-gray-900 dark:text-gray-100 ${statItem.valueClassName ?? ""}`}>
                                {statItem.value}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    </>;
}
