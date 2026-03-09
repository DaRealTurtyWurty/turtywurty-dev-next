import Link from "next/link";

type OrgRepoResponse = {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    pushed_at: string | null;
    archived: boolean;
    fork: boolean;
    private: boolean;
};

type FeaturedRepo = {
    name: string;
    summary?: string;
    status?: string;
};

type GitHubOrgProjectsSectionProps = {
    org: string;
    title?: string;
    description?: string;
    featuredRepos?: FeaturedRepo[];
    excludeRepos?: string[];
    maxAutoRepos?: number;
    revalidateSeconds?: number;
};

const GITHUB_API_BASE = "https://api.github.com";

function formatNumber(value: number): string {
    return new Intl.NumberFormat("en-US").format(value);
}

function formatRelativeTime(value: string | null): string {
    if (!value) return "Unknown update";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Unknown update";

    const diffMs = Date.now() - date.getTime();
    if (diffMs < 0) return "Just now";

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

async function fetchOrgRepos(org: string, revalidateSeconds: number): Promise<OrgRepoResponse[]> {
    try {
        const response = await fetch(
            `${GITHUB_API_BASE}/orgs/${org}/repos?type=public&sort=updated&per_page=100`,
            {
                headers: {
                    Accept: "application/vnd.github+json",
                },
                next: {revalidate: revalidateSeconds},
            }
        );

        if (!response.ok) return [];
        return (await response.json()) as OrgRepoResponse[];
    } catch {
        return [];
    }
}

export default async function GitHubOrgProjectsSection({
    org,
    title = "Railroad Ecosystem",
    description = "Other projects in the organization that support the wider Railroad toolchain.",
    featuredRepos = [],
    excludeRepos = [],
    maxAutoRepos = 20,
    revalidateSeconds = 60 * 30,
}: GitHubOrgProjectsSectionProps) {
    const repos = (await fetchOrgRepos(org, revalidateSeconds))
        .filter((repo) => !repo.archived && !repo.private && !repo.fork)
        .filter((repo) => !excludeRepos.includes(repo.name));

    const repoMap = new Map(repos.map((repo) => [repo.name, repo]));

    const requestedFeatured = featuredRepos.map((repo) => repo.name);
    const autoFillFeatured = repos
        .filter((repo) => !requestedFeatured.includes(repo.name))
        .slice(0, Math.max(0, 3 - featuredRepos.length))
        .map((repo) => ({
            name: repo.name,
            summary: repo.description ?? "Repository in the organization.",
            status: "Featured",
        }));

    const featuredSeed = featuredRepos.length > 0
        ? [...featuredRepos, ...autoFillFeatured]
        : repos.slice(0, 3).map((repo) => ({
            name: repo.name,
            summary: repo.description ?? "Repository in the organization.",
            status: "Featured",
        }));

    const featured = featuredSeed
        .map((entry) => ({
            ...entry,
            repo: repoMap.get(entry.name),
        }))
        .filter((entry) => entry.repo || entry.name);

    const featuredNames = new Set(featured.map((entry) => entry.name));
    const autoRepos = repos
        .filter((repo) => !featuredNames.has(repo.name))
        .slice(0, maxAutoRepos);

    return <>
        <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
            <div className="flex items-start justify-between gap-4 mb-6">
                <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                    {description}
                </p>
                <Link
                    href={`https://github.com/${org}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-sm font-medium text-cyan-700 dark:text-cyan-300 hover:underline"
                >
                    View Organization
                </Link>
            </div>

            {featured.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {featured.map((entry) => {
                        const repo = entry.repo;
                        return (
                            <article
                                key={`featured-${entry.name}`}
                                className="rounded-lg border border-cyan-200/70 dark:border-cyan-800/70 bg-cyan-50/40 dark:bg-cyan-950/20 p-4 h-full flex flex-col"
                            >
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <h3 className="font-semibold text-lg leading-tight">{entry.name}</h3>
                                    <span
                                        className="rounded-full bg-cyan-100 dark:bg-cyan-900/70 text-cyan-800 dark:text-cyan-200 px-2 py-0.5 text-xs font-medium">
                                        {entry.status ?? "Featured"}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                    {entry.summary ?? repo?.description ?? "Repository in the organization."}
                                </p>
                                <div className="mt-auto flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span className="inline-flex items-center gap-1">
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                                            <path d="M12 3.5 14.5 8.8l5.9.8-4.3 4.2 1 5.8L12 16.7 6.9 19.4l1-5.8-4.3-4.2 5.9-.8L12 3.5Z"/>
                                        </svg>
                                        {formatNumber(repo?.stargazers_count ?? 0)} stars
                                    </span>
                                    <span>{formatRelativeTime(repo?.pushed_at ?? null)}</span>
                                </div>
                                <Link
                                    href={repo?.html_url ?? `https://github.com/${org}/${entry.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 inline-flex text-sm font-medium text-cyan-700 dark:text-cyan-300 hover:underline"
                                >
                                    Open repository
                                </Link>
                            </article>
                        );
                    })}
                </div>
            )}

            {autoRepos.length > 0 && (
                <div className="overflow-x-auto playlist-scrollbar">
                    <div className="flex gap-4 min-w-max pb-2">
                        {autoRepos.map((repo) => (
                            <article
                                key={`auto-${repo.id}`}
                                className="w-64 shrink-0 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4"
                            >
                                <Link
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-base hover:underline"
                                >
                                    {repo.name}
                                </Link>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 h-10 overflow-hidden">
                                    {repo.description ?? "Repository in the organization."}
                                </p>
                                <div className="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span className="inline-flex items-center gap-1">
                                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                                            <path d="M12 3.5 14.5 8.8l5.9.8-4.3 4.2 1 5.8L12 16.7 6.9 19.4l1-5.8-4.3-4.2 5.9-.8L12 3.5Z"/>
                                        </svg>
                                        {formatNumber(repo.stargazers_count)} stars
                                    </span>
                                    <span>{formatRelativeTime(repo.pushed_at)}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            )}
        </section>
    </>;
}
