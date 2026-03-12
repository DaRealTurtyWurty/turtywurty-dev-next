import Link from "next/link";
import Image from "next/image";
import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import GitHubContributorsCarousel from "@/components/GitHubContributorsCarousel";
import GitHubOrgProjectsSection from "@/components/GitHubOrgProjectsSection";
import GitHubProjectSection from "@/components/GitHubProjectSection";
import {GitHubRepositoryButton} from "@/components/GitHubLinkButtons";
import YouTubePlaylistCarousel from "@/components/YouTubePlaylistCarousel";
import {Button} from "@/shadcn/components/ui/button";

const TECH_STACK = ["Java", "Gradle", "JavaFX"];
const RAILROAD_PLAYLIST_ID = "PLaevjqy3XufbFB4EwJ_50M1X0B73T-qiv";
const RAILROAD_PLAYLIST_URL = "https://youtube.com/playlist?list=" + RAILROAD_PLAYLIST_ID;

const FEATURE_STORIES = [
    {
        title: "Guided Mod Project Creation",
        description:
            "Railroad is built to get new Minecraft mod projects moving quickly, with setup flows that understand the modding platforms you are actually targeting.",
        points: [
            "Guided project creation for Forge, Fabric, and NeoForge mods",
            "Version-aware setup that fits the wider Railroad metadata tooling",
            "Less manual bootstrapping before real development starts",
        ],
        image: "https://placehold.co/960x540/png?text=Railroad+Workspace+Setup",
        isWip: false,
    },
    {
        title: "Purpose-Built Asset and Data Editors",
        description:
            "A large part of Minecraft modding lives outside plain Java files. Railroad brings common asset and data workflows into the IDE so iteration is faster and more visual.",
        points: [
            "In-IDE texture and model editors for quick asset iteration",
            "Structure and NBT editors with live previews",
            "JSON authoring helpers for recipes, loot tables, biomes, and other data-driven content",
        ],
        image: "https://placehold.co/960x540/png?text=Railroad+Metadata+Tools",
        isWip: true,
    },
    {
        title: "Debugging and Code Inspections for Mods",
        description:
            "Railroad focuses on code and debugging workflows that general-purpose editors do not understand, especially when working with Minecraft-specific conventions and mixin-heavy projects.",
        points: [
            "Mixin debugging with inline mixin visualisation",
            "Modding-aware code inspections such as inconsistent modid detection",
            "Tooling aimed at catching project-specific issues earlier in development",
        ],
        image: "https://placehold.co/960x540/png?text=Railroad+Plugin+Ecosystem",
        isWip: true,
    },
    {
        title: "Visual Tools for Screens and Sound",
        description:
            "Railroad also covers the more visual parts of mod development with tools that help you iterate on interfaces and audio without constantly leaving the IDE.",
        points: [
            "Visual GUI creator tailored for Minecraft screens",
            "Audio visualizer to inspect and balance custom sound assets",
            "More direct feedback for content that is awkward to tune in code alone",
        ],
        image: "https://placehold.co/960x540/png?text=Railroad+Visual+Tooling",
        isWip: true,
    },
];

export default function RailroadPage() {
    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <section className="relative overflow-hidden rounded-xl p-8 mb-12 shadow-lg bg-gradient-to-r from-cyan-700 via-sky-700 to-blue-800 text-white">
                <div
                    className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_18%_18%,#a5f3fc_0,transparent_42%),radial-gradient(circle_at_84%_82%,#bfdbfe_0,transparent_38%)]"/>
                <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Railroad IDE</h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6">
                        An IDE focused on Minecraft mod development, built by the community for the community.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {TECH_STACK.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 text-sm rounded-full bg-cyan-100/20 text-cyan-50 border border-cyan-100/30"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <GitHubRepositoryButton
                            href="https://github.com/Railroad-Team/Railroad"
                            className="bg-cyan-100 text-cyan-900 hover:bg-cyan-50"
                        />
                        <Button asChild variant="secondary" className="bg-cyan-950/35 text-cyan-50 hover:bg-cyan-950/50">
                            <Link href="https://railroadide.dev/" target="_blank" rel="noopener noreferrer">
                                Visit Website
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <GitHubStatsGrid
                owner="Railroad-Team"
                repo="Railroad"
                title="Repository Stats"
            />

            <GitHubContributorsCarousel owner="Railroad-Team" repo="Railroad"/>

            <GitHubOrgProjectsSection
                org="Railroad-Team"
                excludeRepos={["Railroad"]}
                featuredRepos={[
                    {
                        name: "RailroadPluginAPI",
                        summary: "Plugin API surface for extending Railroad with custom integrations and tooling.",
                        status: "Featured",
                    },
                    {
                        name: "RailroadDocs",
                        summary: "Central documentation repository for user guides, setup flows, and ecosystem references.",
                        status: "Featured",
                    },
                    {
                        name: "Switchboard",
                        summary: "A metadata service that provides version catalogs for Railroad IDE, including Minecraft, Fabric, and NeoForge version data.",
                        status: "Featured",
                    }
                ]}
                description="Beyond the main IDE, Railroad-Team maintains companion repositories across plugins, tooling, and supporting infrastructure."
            />

            <YouTubePlaylistCarousel
                playlistId={RAILROAD_PLAYLIST_ID}
                playlistUrl={RAILROAD_PLAYLIST_URL}
                title="Development Streams"
                description="Watch Railroad development streams on YouTube."
                buttonLabel="Open Playlist"
            />

            <h2 className="text-3xl font-bold mb-6">Primary Features</h2>
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
                                    {story.isWip && (
                                        <div className="absolute top-3 right-3 rounded-full bg-cyan-100/95 text-cyan-900 px-2.5 py-1 text-xs font-semibold shadow-sm">
                                            WIP
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="md:w-1/2 p-6">
                                <h3 className="text-2xl font-semibold mb-3">{story.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{story.description}</p>
                                <ul className="space-y-2.5">
                                    {story.points.map((point, index) => (
                                        <li key={point} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
                                            <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 dark:from-cyan-300 dark:to-blue-500 text-[11px] font-bold text-white shadow-sm ring-1 ring-cyan-200/70 dark:ring-cyan-700/60">
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

            <GitHubProjectSection
                org="Railroad-Team"
                projectNumber={4}
            />
        </div>
    );
}
