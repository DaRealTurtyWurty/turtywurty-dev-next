import Link from "next/link";
import Image from "next/image";
import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import {GitHubIssuesButton, GitHubRepositoryButton} from "@/components/GitHubLinkButtons";
import MinecraftModPlatformStats from "@/components/MinecraftModPlatformStats";
import MarketplaceLinkButton from "@/components/MarketplaceLinkButton";

const TECH_STACK = ["Java", "Forge", "Gradle", "Minecraft"];

const FEATURE_CARDS = [
    {
        title: "Dynamic Block Transformations",
        description: "Pathforged explores blocks that can change behaviour or state dynamically instead of staying locked to a single static form.",
    },
    {
        title: "Adjustable Block Properties",
        description: "The core idea is giving blocks configurable properties so they can either preserve their original composition or shift into a modified state when needed.",
    },
    {
        title: "Systems-Oriented Experimentation",
        description: "Compared with simpler content mods, Pathforged leans more into systems design and how flexible block behaviour can open up new interactions.",
    },
];

export default function PathforgedPage() {
    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <section className="relative overflow-hidden rounded-xl p-8 mb-12 shadow-lg bg-gradient-to-br from-lime-200 via-emerald-300 to-amber-700 text-zinc-950">
                <div
                    className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.9)_0,transparent_28%),radial-gradient(circle_at_82%_20%,rgba(110,231,183,0.65)_0,transparent_24%),radial-gradient(circle_at_78%_82%,rgba(120,53,15,0.28)_0,transparent_28%)]"/>
                <div className="absolute inset-y-0 right-[-8%] w-[34%] rotate-12 bg-white/18 blur-3xl"/>
                <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Pathforged</h1>
                    <p className="text-lg md:text-xl text-zinc-900/85 max-w-3xl mb-6">
                        A Minecraft mod built around dynamic block transformations and adjustable block properties.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {TECH_STACK.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 text-sm rounded-full bg-zinc-950/12 text-zinc-950 border border-zinc-950/15"
                            >
                                {tech}
                            </span>
                        ))}
                        <span className="px-3 py-1 text-sm rounded-full bg-red-950/80 text-red-100 border border-red-900/70">
                            Outdated
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <GitHubRepositoryButton
                            href="https://github.com/DaRealTurtyWurty/Pathforged"
                            className="bg-zinc-950 text-lime-100 hover:bg-zinc-900"
                        />
                        <GitHubIssuesButton
                            href="https://github.com/DaRealTurtyWurty/Pathforged/issues"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                        <MarketplaceLinkButton
                            platform="modrinth"
                            href="https://modrinth.com/mod/pathforged"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                        <MarketplaceLinkButton
                            platform="curseforge"
                            href="https://www.curseforge.com/minecraft/mc-mods/pathforged"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                    </div>
                </div>
            </section>

            <MinecraftModPlatformStats
                title="Downloads & Version Support"
                description="Marketplace reach and supported Minecraft versions across the available platforms."
                modrinth={{
                    projectId: "pathforged",
                    url: "https://modrinth.com/mod/pathforged",
                }}
                curseForge={{
                    slug: "pathforged",
                    url: "https://www.curseforge.com/minecraft/mc-mods/pathforged",
                }}
            />

            <GitHubStatsGrid
                owner="DaRealTurtyWurty"
                repo="Pathforged"
                title="Repository Stats"
                enabledStats={["totalCommits", "openIssues", "lastUpdated", "stars", "languages"]}
            />

            <h2 className="text-3xl font-bold mb-6 text-center">Core Idea</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {FEATURE_CARDS.map((card) => (
                    <article key={card.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-l-emerald-500">
                        <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
                    </article>
                ))}
            </section>
        </div>
    );
}
