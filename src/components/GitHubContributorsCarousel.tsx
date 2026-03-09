import Link from "next/link";
import Image from "next/image";

type Contributor = {
    id: number;
    login: string;
    html_url: string;
    avatar_url: string;
    contributions: number;
};

type GitHubContributorsCarouselProps = {
    owner: string;
    repo: string;
    title?: string;
    revalidateSeconds?: number;
    limit?: number;
    excludeLogins?: string[];
};

async function fetchContributors(
    owner: string,
    repo: string,
    revalidateSeconds: number
): Promise<Contributor[]> {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`,
            {
                headers: {
                    Accept: "application/vnd.github+json",
                },
                next: {revalidate: revalidateSeconds},
            }
        );

        if (!response.ok) return [];
        return (await response.json()) as Contributor[];
    } catch {
        return [];
    }
}

export default async function GitHubContributorsCarousel({
    owner,
    repo,
    title = "Contributors",
    revalidateSeconds = 60 * 30,
    limit = 100,
    excludeLogins = ["dependabot[bot]"],
}: GitHubContributorsCarouselProps) {
    const contributors = (await fetchContributors(owner, repo, revalidateSeconds))
        .filter((contributor) => !excludeLogins.includes(contributor.login))
        .slice(0, limit);
    const animationDurationSeconds = Math.max(24, contributors.length * 3);

    const renderContributorCards = (keyPrefix: string) => contributors.map((contributor) => (
        <article
            key={`${keyPrefix}-${contributor.id}`}
            className="w-44 shrink-0 rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900"
        >
            <Link href={contributor.html_url} target="_blank" rel="noopener noreferrer" className="block">
                <Image
                    src={contributor.avatar_url}
                    alt={`${contributor.login} avatar`}
                    className="h-16 w-16 rounded-full object-cover mb-3"
                    width={64}
                    height={64}
                />
                <h3 className="font-semibold truncate">{contributor.login}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    {contributor.contributions} contributions
                </p>
            </Link>
        </article>
    ));

    return <>
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-12">
            {contributors.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">Contributors are unavailable right now.</p>
            ) : (
                <div className="overflow-hidden">
                    <div
                        className="flex w-max gap-4 pb-2 animate-[contributors-marquee_linear_infinite]"
                        style={{animationDuration: `${animationDurationSeconds}s`}}
                    >
                        <div className="flex gap-4">
                            {renderContributorCards("a")}
                        </div>
                        <div className="flex gap-4" aria-hidden="true">
                            {renderContributorCards("b")}
                        </div>
                    </div>
                </div>
            )}
        </section>
    </>;
}
