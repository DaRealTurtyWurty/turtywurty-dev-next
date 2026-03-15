import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import {Button} from "@/shadcn/components/ui/button";

export const metadata: Metadata = {
    title: "Game Dashboard | turtywurty.dev",
    description: "A university coursework project for viewing and managing installed games from multiple sources in one dashboard.",
};

const HIGHLIGHTS = [
    "Brings installed games from different sources into one interface.",
    "Focuses on browsing, organizing, and managing a local game library.",
    "Built as university coursework with a Java, JavaFX, and Gradle stack.",
];

const GITHUB_OWNER = "DaRealTurtyWurty";
const GITHUB_REPO = "GameDashboard";

export default function GameDashboardPage() {
    return (
        <main className="mx-4 space-y-8 py-12 md:mx-8 lg:mx-16">
            <section className="rounded-lg bg-section-background p-8 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Coursework Highlight
                </p>
                <h1 className="mt-2 text-4xl font-bold">Game Dashboard</h1>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    A university coursework project centered on viewing and managing installed games from multiple sources in a single desktop-style dashboard.
                    The goal was to provide one place to browse a library, inspect entries, and reduce the friction of jumping between separate launchers and tools.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                    {["Java", "JavaFX", "Gradle", "Git"].map((skill) => (
                        <span
                            key={skill}
                            className="rounded-full bg-white px-3 py-1 text-sm text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-200"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </section>

            <GitHubStatsGrid
                owner={GITHUB_OWNER}
                repo={GITHUB_REPO}
                title="Repository Stats"
                enabledStats={["totalCommits", "openIssues", "lastUpdated", "stars", "languages"]}
            />

            <section className="grid gap-4 md:grid-cols-3">
                {HIGHLIGHTS.map((highlight) => (
                    <article
                        key={highlight}
                        className="rounded-lg bg-section-background p-6 shadow-lg"
                    >
                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Focus
                        </p>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">{highlight}</p>
                    </article>
                ))}
            </section>

            <section className="rounded-lg bg-section-background p-6 shadow-lg md:p-8">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Screenshot
                        </p>
                        <h2 className="mt-2 text-3xl font-bold">Interface Preview</h2>
                        <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-300">
                            The available coursework asset is a dashboard screenshot, so this page presents the project as a case study rather than embedding a runnable build.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/images/game-dashboard.png" target="_blank" rel="noreferrer">
                            Open Full Image
                        </Link>
                    </Button>
                </div>

                <div className="mt-6 overflow-hidden rounded-lg border border-black/10 bg-white shadow-md dark:border-white/10">
                    <Image
                        src="/images/game-dashboard.png"
                        alt="Game Dashboard coursework screenshot"
                        width={1422}
                        height={714}
                        className="h-auto w-full"
                        priority
                    />
                </div>
            </section>
        </main>
    );
}
