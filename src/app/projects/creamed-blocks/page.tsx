import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import {GitHubIssuesButton, GitHubRepositoryButton} from "@/components/GitHubLinkButtons";
import MinecraftModPlatformStats from "@/components/MinecraftModPlatformStats";
import MarketplaceLinkButton from "@/components/MarketplaceLinkButton";

const TECH_STACK = ["Java", "Forge", "Fabric", "Gradle", "Minecraft"];

const FEATURE_CARDS = [
    {
        title: "Protect Builds In Snowy Biomes",
        description: "Cream blocks to stop snow layers building up on rooftops, paths, and exposed surfaces that are meant to stay clean.",
    },
    {
        title: "Simple Survival-Friendly Interaction",
        description: "The mod is built around a straightforward idea: use magma cream on a block and give it a practical weather-resistance purpose.",
    },
    {
        title: "Small Scope, Clear Utility",
        description: "Creamed Blocks focuses on one specific annoyance and solves it cleanly without turning into a giant feature-heavy overhaul.",
    },
];

export default function CreamedBlocksPage() {
    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <section className="relative overflow-hidden rounded-xl p-8 mb-12 shadow-lg bg-gradient-to-br from-amber-200 via-orange-300 to-red-500 text-zinc-950">
                <div
                    className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.92)_0,transparent_28%),radial-gradient(circle_at_82%_22%,rgba(253,186,116,0.7)_0,transparent_24%),radial-gradient(circle_at_76%_82%,rgba(153,27,27,0.24)_0,transparent_28%)]"/>
                <div className="absolute inset-y-0 right-[-8%] w-[34%] rotate-12 bg-white/18 blur-3xl"/>
                <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Creamed Blocks</h1>
                    <p className="text-lg md:text-xl text-zinc-900/85 max-w-3xl mb-6">
                        A Minecraft mod that lets you apply magma cream to blocks so snow layers stop forming on them.
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
                            href="https://github.com/DaRealTurtyWurty/Creamed-Blocks"
                            className="bg-zinc-950 text-orange-100 hover:bg-zinc-900"
                        />
                        <GitHubIssuesButton
                            href="https://github.com/DaRealTurtyWurty/Creamed-Blocks/issues"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                        <MarketplaceLinkButton
                            platform="modrinth"
                            href="https://modrinth.com/mod/creamed-blocks"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                        <MarketplaceLinkButton
                            platform="curseforge"
                            href="https://www.curseforge.com/minecraft/mc-mods/creamed-blocks"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                    </div>
                </div>
            </section>

            <MinecraftModPlatformStats
                title="Downloads & Version Support"
                description="Marketplace reach and supported Minecraft versions across the available platforms."
                modrinth={{
                    projectId: "creamed-blocks",
                    url: "https://modrinth.com/mod/creamed-blocks",
                }}
                curseForge={{
                    slug: "creamed-blocks",
                    url: "https://www.curseforge.com/minecraft/mc-mods/creamed-blocks",
                }}
            />

            <GitHubStatsGrid
                owner="DaRealTurtyWurty"
                repo="Creamed-Blocks"
                title="Repository Stats"
                enabledStats={["totalCommits", "openIssues", "lastUpdated", "stars", "languages"]}
            />

            <h2 className="text-3xl font-bold mb-6 text-center">Why It Exists</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {FEATURE_CARDS.map((card) => (
                    <article key={card.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-l-orange-500">
                        <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
                    </article>
                ))}
            </section>
        </div>
    );
}
