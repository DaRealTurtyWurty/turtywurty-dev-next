import Link from "next/link";
import Image from "next/image";
import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import {GitHubIssuesButton, GitHubRepositoryButton} from "@/components/GitHubLinkButtons";
import MinecraftModPlatformStats from "@/components/MinecraftModPlatformStats";
import MarketplaceLinkButton from "@/components/MarketplaceLinkButton";

const TECH_STACK = ["Java", "Forge", "Gradle", "Minecraft"];

const FEATURE_CARDS = [
    {
        title: "What Gets Added",
        description: "Better Sponges adds Damp Sponges, Potion Infused Sponges, Lava Sponges, and Burnt Sponges, turning the vanilla sponge line into a larger progression of block states and utility variants.",
    },
    {
        title: "How Vanilla Sponges Change",
        description: "Wet sponges can dry gradually into damp and then normal sponges in sunlight or near heat, can become wetter in rain, and even convert into lava sponges when drying in the Nether.",
    },
    {
        title: "Extra Interactions And Automation",
        description: "Dispensers, bottles, thrown potions, thrown water bottles, and shears all gain sponge-related behaviour, and the mod also tweaks guardian progression and sponge drops in specific combat cases.",
    },
];

const ADDED_FEATURES = [
    "Damp Sponge as an intermediate stage between Wet Sponge and Sponge.",
    "Potion Infused Sponge, which gives the player an effect on contact.",
    "Lava Sponge for absorbing lava instead of water.",
    "Burnt Sponge as the spent lava-absorption result, usable as furnace fuel.",
];

const CHANGED_FEATURES = [
    "Wet sponges dry over time into damp sponges and then normal sponges in sunlight or near heat sources like lava.",
    "Sponges can become damp and then wet if left out in the rain.",
    "Wet sponges in the Nether turn into lava sponges instead of normal sponges.",
];

const INTERACTION_GROUPS = [
    [
        "Shears in dispensers can pick up Sponge, Wet Sponge, Damp Sponge, Potion Sponge, Lava Sponge, and Burnt Sponge.",
        "Glass Bottles in dispensers can extract potion contents from Potion Sponges and revert them back to normal sponges.",
        "Dispensers can place Sponge, Damp Sponge, Wet Sponge, and Lava Sponge into the world.",
        "Throwing a Water Bottle at a sponge progresses it to Damp Sponge and then Wet Sponge.",
    ],
    [
        "Throwing a Potion at a sponge turns it into a Potion Sponge.",
        "Right-clicking a Wet Sponge or Damp Sponge with a Glass Bottle gives a Water Bottle and steps the sponge back down a stage.",
        "Right-clicking a Potion Infused Sponge with a Glass Bottle returns the sponge to normal and gives the matching potion.",
        "Guardians struck by lightning become Elder Guardians.",
        "Guardians killed by a player-assisted Axolotl have a 3% sponge drop chance, increased by Looting.",
    ],
];

type DetailListProps = {
    items: string[];
    tone?: "green" | "yellow" | "neutral";
    showMarker?: boolean;
};

function DetailList({items, tone = "yellow", showMarker = true}: DetailListProps) {
    const toneClasses = tone === "green"
        ? {
            item: "border-emerald-200/70 dark:border-emerald-900/50 bg-emerald-50/70 dark:bg-emerald-950/10",
            marker: "bg-emerald-500 text-emerald-950",
        }
        : tone === "neutral"
            ? {
                item: "border-gray-200/70 dark:border-gray-700 bg-gray-50 dark:bg-gray-900",
                marker: "bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-100",
            }
            : {
                item: "border-yellow-200/70 dark:border-yellow-900/50 bg-yellow-50/70 dark:bg-yellow-950/10",
                marker: "bg-yellow-400 text-yellow-950",
            };

    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li
                    key={item}
                    className={`flex items-start gap-3 rounded-lg border p-3 ${toneClasses.item}`}
                >
                    {showMarker && (
                        <span className={`mt-1 inline-flex h-3 w-3 shrink-0 rounded-full ${toneClasses.marker}`}/>
                    )}
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

export default function BetterSpongesPage() {
    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <section className="relative overflow-hidden rounded-xl p-8 mb-12 shadow-lg bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-500 text-zinc-950">
                <div
                    className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.9)_0,transparent_28%),radial-gradient(circle_at_82%_22%,rgba(253,224,71,0.68)_0,transparent_24%),radial-gradient(circle_at_78%_82%,rgba(161,98,7,0.22)_0,transparent_28%)]"/>
                <div className="absolute inset-y-0 right-[-8%] w-[34%] rotate-12 bg-white/18 blur-3xl"/>
                <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Better Sponges</h1>
                    <p className="text-lg md:text-xl text-zinc-900/85 max-w-3xl mb-6">
                        A Minecraft mod that adds lava sponges, potion sponges, and broader sponge functionality improvements.
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
                            href="https://github.com/DaRealTurtyWurty/BetterSponges"
                            className="bg-zinc-950 text-yellow-100 hover:bg-zinc-900"
                        />
                        <GitHubIssuesButton
                            href="https://github.com/DaRealTurtyWurty/BetterSponges/issues"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                        <MarketplaceLinkButton
                            platform="curseforge"
                            href="https://www.curseforge.com/minecraft/mc-mods/better-sponges"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                    </div>
                </div>
            </section>

            <MinecraftModPlatformStats
                title="Downloads & Version Support"
                description="CurseForge downloads and supported Minecraft versions for the actual mod release."
                curseForge={{
                    slug: "better-sponges",
                    url: "https://www.curseforge.com/minecraft/mc-mods/better-sponges",
                }}
            />

            <GitHubStatsGrid
                owner="DaRealTurtyWurty"
                repo="BetterSponges"
                title="Repository Stats"
                enabledStats={["totalCommits", "openIssues", "lastUpdated", "stars", "languages"]}
            />

            <h2 className="text-3xl font-bold mb-6 text-center">Feature Breakdown</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {FEATURE_CARDS.map((card) => (
                    <article key={card.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-l-yellow-500">
                        <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
                    </article>
                ))}
            </section>

            <section className="space-y-8 mb-12">
                <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-2xl font-semibold mb-4">Detailed Changes</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Added</h4>
                            <DetailList items={ADDED_FEATURES} tone="green"/>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Changed</h4>
                            <DetailList items={CHANGED_FEATURES}/>
                        </div>
                    </div>
                </article>

                <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h3 className="text-2xl font-semibold mb-4">Interactions</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-gray-600 dark:text-gray-300">
                        {INTERACTION_GROUPS.map((group, index) => (
                            <DetailList key={index} items={group} tone="neutral" showMarker={false}/>
                        ))}
                    </div>
                </article>
            </section>
        </div>
    );
}
