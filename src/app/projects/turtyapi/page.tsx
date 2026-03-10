import Link from "next/link";
import Image from "next/image";
import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import {Button} from "@/shadcn/components/ui/button";

const TECH_STACK = ["Java", "Gradle", "Javalin", "REST API"];

const FEATURE_STORIES = [
    {
        title: "Content and Utility Endpoints",
        description:
            "TurtyAPI gives TurtyBot a single backend for a mix of utility and content-driven features, instead of spreading those lookups across lots of separate command implementations.",
        points: [
            "Code snippets and utility responses",
            "Random celebrities and would-you-rather style prompts",
            "Random words plus country borders and flags",
        ],
        image: "https://placehold.co/960x540/png?text=TurtyAPI+Service+Layer",
    },
    {
        title: "Game and Minecraft Data",
        description:
            "A big part of the API is exposing structured data that TurtyBot can turn into useful responses for games and Minecraft-related commands.",
        points: [
            "Game artwork, covers, and information",
            "Minecraft version data for Forge, NeoForge, Fabric, Yarn, and Parchment",
            "Structured responses that fit bot commands more cleanly than raw upstream APIs",
        ],
        image: "https://placehold.co/960x540/png?text=TurtyAPI+Endpoints",
    },
    {
        title: "Image Processing Helpers",
        description:
            "TurtyAPI also handles image-based features so TurtyBot can request transformed results without embedding that processing directly into the bot.",
        points: [
            "Image manipulation endpoints such as flag overlays and flipping",
            "A backend layer for media-style command responses",
            "Keeps heavier processing concerns outside the Discord bot runtime",
        ],
        image: "https://placehold.co/960x540/png?text=TurtyAPI+Images",
    },
];

const CAPABILITY_GROUPS = [
    {
        title: "TurtyBot Backend",
        detail: "A supporting REST API used by TurtyBot for utility, content, and data-heavy commands.",
    },
    {
        title: "Mixed Endpoint Surface",
        detail: "It covers everything from random content and snippets to game lookups, image manipulation, and Minecraft metadata.",
    },
    {
        title: "Practical Command Support",
        detail: "The goal is simple: give TurtyBot a cleaner source of data and processed results for commands that need more than local bot logic.",
    },
];

export default function TurtyAPIPage() {
    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <section className="relative overflow-hidden rounded-xl p-8 mb-12 shadow-lg bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white">
                <div
                    className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_16%_20%,#a7f3d0_0,transparent_42%),radial-gradient(circle_at_82%_78%,#99f6e4_0,transparent_36%)]"/>
                <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">TurtyAPI</h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6">
                        A REST API used by TurtyBot for utility endpoints, game data, image processing, Minecraft version lookups, and other command support.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {TECH_STACK.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 text-sm rounded-full bg-emerald-100/20 text-emerald-50 border border-emerald-100/30"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button asChild className="bg-emerald-100 text-emerald-900 hover:bg-emerald-50">
                            <Link href="https://github.com/DaRealTurtyWurty/TurtyAPI" target="_blank" rel="noopener noreferrer">
                                <span className="inline-flex items-center gap-2">
                                    <Image src="/images/github_icon.svg" alt="" aria-hidden="true" width={16} height={16}/>
                                    View Repository
                                </span>
                            </Link>
                        </Button>
                        <Button asChild variant="secondary" className="bg-emerald-950/35 text-emerald-50 hover:bg-emerald-950/50">
                            <Link href="https://github.com/DaRealTurtyWurty/TurtyAPI/issues" target="_blank" rel="noopener noreferrer">
                                Open Issues
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <GitHubStatsGrid
                owner="DaRealTurtyWurty"
                repo="TurtyAPI"
                title="Repository Stats"
                enabledStats={["totalCommits", "openIssues", "lastUpdated", "stars", "languages"]}
            />

            <h2 className="text-3xl font-bold mb-6 text-center">Core Capabilities</h2>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {CAPABILITY_GROUPS.map((group) => (
                    <article key={group.title} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-l-emerald-500">
                        <h3 className="text-xl font-semibold mb-3">{group.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{group.detail}</p>
                    </article>
                ))}
            </section>

            <h2 className="text-3xl font-bold mb-6 text-center">What It Powers</h2>
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
                                    {story.points.map((point, pointIndex) => (
                                        <li key={point} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                                            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-700 dark:from-emerald-300 dark:to-cyan-500 text-[11px] font-bold text-white shadow-sm ring-1 ring-emerald-200/70 dark:ring-emerald-700/60">
                                                {pointIndex + 1}
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
        </div>
    );
}
