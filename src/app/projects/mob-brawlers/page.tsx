import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import {GitHubIssuesButton, GitHubRepositoryButton} from "@/components/GitHubLinkButtons";
import MinecraftModPlatformStats from "@/components/MinecraftModPlatformStats";
import MarketplaceLinkButton from "@/components/MarketplaceLinkButton";

const TECH_STACK = ["Java", "Forge", "Gradle", "Minecraft"];

const FEATURE_CARDS = [
    {
        title: "Push Mob Aggression Further",
        description: "Mob Brawlers lets hostile behaviour spread beyond the default Minecraft rules so creatures can turn on far more than just the player.",
    },
    {
        title: "Configurable Detection Range",
        description: "The mod exposes mob sight range as a configurable system, including exaggerated values that can make encounters feel much less local and much more chaotic.",
    },
    {
        title: "Small Mod, Strong Gameplay Shift",
        description: "It is a lightweight idea with a big gameplay impact: changing target logic and awareness is enough to make familiar worlds behave very differently.",
    },
];

export default function MobBrawlersPage() {
    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <section className="relative overflow-hidden rounded-xl p-8 mb-12 shadow-lg bg-gradient-to-br from-red-300 via-rose-400 to-red-700 text-zinc-950">
                <div
                    className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.88)_0,transparent_28%),radial-gradient(circle_at_80%_20%,rgba(252,165,165,0.72)_0,transparent_24%),radial-gradient(circle_at_78%_82%,rgba(127,29,29,0.32)_0,transparent_28%)]"/>
                <div className="absolute inset-y-0 right-[-8%] w-[34%] rotate-12 bg-white/18 blur-3xl"/>
                <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Mob Brawlers</h1>
                    <p className="text-lg md:text-xl text-zinc-900/85 max-w-3xl mb-6">
                        A Minecraft mod that expands mob aggression and lets their sight range scale all the way up to extreme values.
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
                            href="https://github.com/DaRealTurtyWurty/MobBrawlers"
                            className="bg-zinc-950 text-red-100 hover:bg-zinc-900"
                        />
                        <GitHubIssuesButton
                            href="https://github.com/DaRealTurtyWurty/MobBrawlers/issues"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                        <MarketplaceLinkButton
                            platform="modrinth"
                            href="https://modrinth.com/mod/mob-brawlers"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                        <MarketplaceLinkButton
                            platform="curseforge"
                            href="https://www.curseforge.com/minecraft/mc-mods/mob-brawlers"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                    </div>
                </div>
            </section>

            <MinecraftModPlatformStats
                title="Downloads & Version Support"
                description="Marketplace reach and supported Minecraft versions across the available platforms."
                modrinth={{
                    projectId: "mob-brawlers",
                    url: "https://modrinth.com/mod/mob-brawlers",
                }}
                curseForge={{
                    slug: "mob-brawlers",
                    url: "https://www.curseforge.com/minecraft/mc-mods/mob-brawlers",
                }}
            />

            <GitHubStatsGrid
                owner="DaRealTurtyWurty"
                repo="MobBrawlers"
                title="Repository Stats"
                enabledStats={["totalCommits", "openIssues", "lastUpdated", "stars", "languages"]}
            />

            <h2 className="text-3xl font-bold mb-6 text-center">What It Changes</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {FEATURE_CARDS.map((card) => (
                    <article key={card.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-l-red-500">
                        <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
                    </article>
                ))}
            </section>
        </div>
    );
}
