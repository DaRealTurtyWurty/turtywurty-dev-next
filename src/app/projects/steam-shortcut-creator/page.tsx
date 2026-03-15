import type {Metadata} from "next";
import Image from "next/image";
import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import {GitHubIssuesButton, GitHubRepositoryButton} from "@/components/GitHubLinkButtons";

export const metadata: Metadata = {
    title: "Steam Shortcut Creator | turtywurty.dev",
    description: "A Windows desktop app for creating and managing Steam shortcuts with a modern WPF interface.",
};

const TECH_STACK = ["C#", "WPF", ".NET 9", "SteamKit2", "Inno Setup"];

const FEATURE_CARDS = [
    {
        title: "Steam Library Detection",
        description: "The app can detect Steam installations and work from the existing library setup instead of forcing manual path management every time.",
    },
    {
        title: "Shortcut Creation Workflow",
        description: "It focuses on a practical desktop utility flow: pick an installed game, then generate the shortcuts you want for faster access.",
    },
    {
        title: "Windows 11-Style UI",
        description: "The interface leans into Fluent-style WPF presentation with rounded surfaces, theme support, and a cleaner native desktop feel.",
    },
];

const DELIVERY_OPTIONS = [
    {
        title: "Desktop and Start Menu Shortcuts",
        detail: "Designed around generating shortcuts where they are actually useful for day-to-day launching and organization.",
    },
    {
        title: "Installer-Friendly Distribution",
        detail: "The project includes installer-oriented tooling so the application can be packaged for real Windows distribution instead of staying as a dev-only build.",
    },
    {
        title: "Windows-Focused Utility App",
        detail: "This is a purpose-built desktop tool rather than a web wrapper, so the project is optimized around local Steam installs and native Windows UX.",
    },
];

export default function SteamShortcutCreatorPage() {
    return (
        <div className="container mx-auto max-w-7xl p-4">
            <section
                className="relative mb-12 overflow-hidden rounded-xl bg-gradient-to-br from-slate-200 via-cyan-100 to-blue-300 p-8 text-slate-950 shadow-lg">
                <div
                    className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.95)_0,transparent_28%),radial-gradient(circle_at_78%_24%,rgba(59,130,246,0.28)_0,transparent_26%),radial-gradient(circle_at_82%_82%,rgba(15,23,42,0.12)_0,transparent_30%)]"/>
                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                            Desktop Utility
                        </p>
                        <h1 className="mt-3 text-4xl font-bold md:text-5xl">Steam Shortcut Creator</h1>
                        <p className="mt-4 text-lg text-slate-800/85 md:text-xl">
                            A Windows desktop app for creating and managing Steam shortcuts with a cleaner Windows
                            11-style workflow.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                            {TECH_STACK.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 text-sm text-slate-800 shadow-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <GitHubRepositoryButton
                                href="https://github.com/DaRealTurtyWurty/SteamShortcutCreator"
                                className="bg-slate-950 text-slate-50 hover:bg-slate-800"
                            />
                            <GitHubIssuesButton
                                href="https://github.com/DaRealTurtyWurty/SteamShortcutCreator/issues"
                                className="border border-slate-900/10 bg-white/70 text-slate-900 hover:bg-white"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-end">
                        <div className="rounded-[2rem] border border-white/70 bg-white/70 p-1 shadow-2xl backdrop-blur">
                            <Image
                                src="/images/steam-shortcut-creator.png"
                                alt="Steam Shortcut Creator icon"
                                width={1024}
                                height={1024}
                                className="h-48 w-48 rounded-2xl"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            <GitHubStatsGrid
                owner="DaRealTurtyWurty"
                repo="SteamShortcutCreator"
                title="Repository Stats"
                enabledStats={["totalCommits", "openIssues", "lastUpdated", "stars", "languages"]}
            />

            <h2 className="mb-6 text-center text-3xl font-bold">Core Focus</h2>
            <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                {FEATURE_CARDS.map((card) => (
                    <article
                        key={card.title}
                        className="rounded-lg border-l-4 border-l-cyan-500 bg-white p-6 shadow-md dark:bg-gray-800"
                    >
                        <h3 className="mb-3 text-xl font-semibold">{card.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
                    </article>
                ))}
            </section>

            <h2 className="mb-6 text-center text-3xl font-bold">Delivery and Use</h2>
            <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                {DELIVERY_OPTIONS.map((item) => (
                    <article
                        key={item.title}
                        className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
                    >
                        <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.detail}</p>
                    </article>
                ))}
            </section>

            <h2 className="mb-6 text-center text-3xl font-bold">Build Notes</h2>
            <section className="mb-12 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                        <span
                            className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 text-[11px] font-bold text-white shadow-sm">
                            1
                        </span>
                        <span>
                            Targets <code
                            className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-900 dark:bg-slate-700 dark:text-slate-100">net9.0-windows</code> with WPF enabled for a native desktop application stack.
                        </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                        <span
                            className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 text-[11px] font-bold text-white shadow-sm">
                            2
                        </span>
                        <span>
                            Uses Steam-related libraries for reading and working with Steam shortcut and library data.
                        </span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                        <span
                            className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 text-[11px] font-bold text-white shadow-sm">
                            3
                        </span>
                        <span>
                            Supports installer packaging paths including Inno Setup for distributable builds.
                        </span>
                    </li>
                </ul>
            </section>
        </div>
    );
}
