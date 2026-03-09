import Link from "next/link";
import Image from "next/image";
import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import GitHubContributorsCarousel from "@/components/GitHubContributorsCarousel";
import YouTubePlaylistCarousel from "@/components/YouTubePlaylistCarousel";
import {Button} from "@/shadcn/components/ui/button";

const TECH_STACK = ["Java", "Fabric", "Gradle", "Minecraft"];
const INDUSTRIA_PLAYLIST_URL = "https://www.youtube.com/playlist?list=PLaevjqy3XufbR1PJM3b9P67vTjtbeOnv-";
const INDUSTRIA_PLAYLIST_ID = "PLaevjqy3XufbR1PJM3b9P67vTjtbeOnv-";
const SYSTEM_PILLARS = [
    {
        title: "Multiblock Structures",
        description: "Large industrial machines are built as multiblocks to make processing scale feel physical and engineered.",
        image: "https://placehold.co/960x540/png?text=Multiblock+Structures",
    },
    {
        title: "Pipes, Cables, and Networks",
        description: "Separate transfer networks for energy and materials let factories route power and process media cleanly.",
        image: "https://placehold.co/960x540/png?text=Pipes+Cables+Networks",
    },
    {
        title: "Conveyors and Logistics",
        description: "Conveyors handle item movement as a dedicated logistics system alongside machine and network infrastructure.",
        image: "https://placehold.co/960x540/png?text=Conveyors+and+Logistics",
    },
];

const FEATURE_STORIES = [
    {
        title: "Build Automated Processing Lines",
        description:
            "Set up machine workflows for refining raw materials into useful industrial products. The design encourages chaining processes instead of relying on a single block solution.",
        points: [
            "Machine-focused progression loop",
            "Multi-stage resource processing",
            "Factory-style planning and expansion",
        ],
        image: "https://placehold.co/960x540/png?text=Industria+Factory+Floor",
    },
    {
        title: "Lean Into Chemistry Systems",
        description:
            "Fluid, gas, and slurry mechanics are part of progression and production. These systems connect to machines and logistics so chemistry feels practical and integrated.",
        points: [
            "Fluid + gas + slurry workflows",
            "Process conversion and refinement",
            "Engineering over simple crafting",
        ],
        image: "https://placehold.co/960x540/png?text=Industria+Chemistry+Pipeline",
    },
    {
        title: "Scale Power and Infrastructure",
        description:
            "Combine generation, storage, and transport networks to support larger setups. As your base grows, infrastructure decisions become a key part of progression.",
        points: [
            "Multiple power generation approaches",
            "Networked transport systems",
            "Scalable industrial architecture",
        ],
        image: "https://placehold.co/960x540/png?text=Industria+Power+Network",
    },
];

const PROCESS_LINES = [
    {
        name: "Bayer + Hall-Heroult (Aluminium)",
        summary: "Bauxite refining into alumina, then high-energy electrochemical reduction into aluminium.",
        image: "https://placehold.co/960x540/png?text=Bayer+%2B+Hall-Heroult",
        isWIP: false,
    },
    {
        name: "Crude Oil to Fractional Distillation",
        summary: "Oil extraction and staged separation into useful fractions for downstream industrial chains.",
        image: "https://placehold.co/960x540/png?text=Crude+Oil+Distillation",
        isWIP: false,
    },
    {
        name: "Downs Process (Sodium + Chlorine)",
        summary: "Electrolytic pathway for producing highly reactive chemical feedstocks used in wider processing.",
        image: "https://placehold.co/960x540/png?text=Downs+Process",
        isWIP: true,
    },
    {
        name: "Pidgeon Process (Magnesium)",
        summary: "Thermochemical reduction route represented as a high-heat materials progression line.",
        image: "https://placehold.co/960x540/png?text=Pidgeon+Process",
        isWIP: true,
    },
    {
        name: "Beneficiation (Tin + Other Metals)",
        summary: "Ore concentration and upgrading steps before final metal extraction and alloy workflows.",
        image: "https://placehold.co/960x540/png?text=Beneficiation",
        isWIP: false,
    },
    {
        name: "Kroll and Hunter (Titanium)",
        summary: "Advanced titanium production pathways that emphasize chemistry stages and specialized processing.",
        image: "https://placehold.co/960x540/png?text=Kroll+and+Hunter",
        isWIP: true,
    },
    {
        name: "Mond Process (Nickel)",
        summary: "Purification-focused nickel line with chemistry-forward intermediate handling.",
        image: "https://placehold.co/960x540/png?text=Mond+Process",
        isWIP: true,
    },
    {
        name: "Latex to Rubber",
        summary: "Rubber tree resources feed into coagulation and refinement for industrial rubber components.",
        image: "https://placehold.co/960x540/png?text=Latex+to+Rubber",
        isWIP: false,
    },
];

function IssueIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
            <path d="M1.5 20h21L12 2 1.5 20ZM13 17h-2v-2h2v2Zm0-4h-2V8h2v5Z"/>
        </svg>
    );
}

export default async function IndustriaPage() {
    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <section className="relative overflow-hidden rounded-xl p-8 mb-12 shadow-lg bg-gradient-to-r from-slate-700 to-zinc-800 text-white">
                <div className="absolute inset-0 opacity-15 [background:radial-gradient(circle_at_20%_20%,#fff_0,transparent_45%),radial-gradient(circle_at_80%_80%,#fff_0,transparent_35%)]"/>
                <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Industria</h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6">
                        A Minecraft tech-chem mod focused on industrial progression, automation concepts, and
                        chemistry-driven gameplay systems.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {TECH_STACK.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 text-sm rounded-full bg-white/20 text-white border border-white/25"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild className="bg-white text-slate-800 hover:bg-white/90">
                            <Link href="https://github.com/DaRealTurtyWurty/Industria" target="_blank" rel="noopener noreferrer">
                                <span className="inline-flex items-center gap-2">
                                    <Image src="/images/github_icon.svg" alt="" aria-hidden="true" width={16} height={16}/>
                                    View Repository
                                </span>
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" className="bg-black/25 text-white hover:bg-black/35">
                            <Link
                                href="https://github.com/DaRealTurtyWurty/Industria/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <IssueIcon/>
                                    Open Issues
                                </span>
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" className="bg-black/25 text-white hover:bg-black/35">
                            <Link
                                href="https://modrinth.com/project/industriamod"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Image src="/images/modrinth_icon.svg" alt="" aria-hidden="true" width={16} height={16}/>
                                    View on Modrinth
                                </span>
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" className="bg-black/25 text-white hover:bg-black/35">
                            <Link
                                href="https://www.curseforge.com/minecraft/mc-mods/industriamod"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Image src="/images/curseforge_icon.svg" alt="" aria-hidden="true" width={16} height={16}/>
                                    View on CurseForge
                                </span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <GitHubStatsGrid
                owner="DaRealTurtyWurty"
                repo="Industria"
                title="Repository Stats"
                enabledStats={["totalCommits", "openIssues", "lastUpdated", "stars", "languages"]}
            />
            <GitHubContributorsCarousel owner="DaRealTurtyWurty" repo="Industria"/>

            <YouTubePlaylistCarousel
                playlistId={INDUSTRIA_PLAYLIST_ID}
                playlistUrl={INDUSTRIA_PLAYLIST_URL}
                title="Development Streams"
                description="Follow ongoing Industria development on YouTube."
                buttonLabel="Open Playlist"
            />

            <h2 className="text-3xl font-bold mb-6 text-center">Core Pillars</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {SYSTEM_PILLARS.map((pillar) => (
                    <article key={pillar.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className="relative w-full aspect-video">
                            <Image
                                src={pillar.image}
                                alt={`${pillar.title} placeholder`}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{pillar.description}</p>
                        </div>
                    </article>
                ))}
            </section>

            <h2 className="text-3xl font-bold mb-6 text-center">Inside The Mod</h2>
            <section className="space-y-8 mb-12">
                {FEATURE_STORIES.map((story, index) => (
                    <article key={story.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}>
                            <div className="md:w-1/2">
                                <div className="relative w-full h-full aspect-video">
                                    <Image
                                        src={story.image}
                                        alt={`${story.title} placeholder`}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                    />
                                </div>
                            </div>
                            <div className="md:w-1/2 p-6">
                                <h3 className="text-2xl font-semibold mb-3">{story.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{story.description}</p>
                                <ul className="space-y-2.5">
                                    {story.points.map((point, index) => (
                                        <li key={point} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                                            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 dark:from-slate-400 dark:to-slate-600 text-[11px] font-bold text-white shadow-sm">
                                                {index + 1}
                                            </span>
                                            <span className="leading-relaxed">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </article>
                ))}
            </section>

            <h2 className="text-3xl font-bold mb-6 text-center">Processing Lines</h2>
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Industria models real-world-inspired industrial pathways as gameplay progression. These lines are
                    intended as high-level process themes rather than one-to-one textbook simulation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PROCESS_LINES.map((process) => (
                        <article key={process.name} className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <div className="relative">
                                <div className="relative w-full aspect-[16/7]">
                                    <Image
                                        src={process.image}
                                        alt={`${process.name} placeholder`}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                    />
                                </div>
                                {!process.isWIP || <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    WIP
                                </div>}
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold mb-2">{process.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{process.summary}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

        </div>
    );
}
