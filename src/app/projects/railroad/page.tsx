import Link from "next/link";
import Image from "next/image";
import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import GitHubContributorsCarousel from "@/components/GitHubContributorsCarousel";
import GitHubOrgProjectsSection from "@/components/GitHubOrgProjectsSection";
import GitHubProjectSection from "@/components/GitHubProjectSection";
import YouTubePlaylistCarousel from "@/components/YouTubePlaylistCarousel";
import {Button} from "@/shadcn/components/ui/button";

const TECH_STACK = ["Java", "Gradle", "JavaFX", "LSP"];
const RAILROAD_PLAYLIST_URL = "https://youtube.com/playlist?list=PLaevjqy3XufbFB4EwJ_50M1X0B73T-qiv";
const RAILROAD_PLAYLIST_ID = "PLaevjqy3XufbFB4EwJ_50M1X0B73T-qiv";

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
                        <Button asChild className="bg-cyan-100 text-cyan-900 hover:bg-cyan-50">
                            <Link href="https://github.com/Railroad-Team/Railroad" target="_blank" rel="noopener noreferrer">
                                <span className="inline-flex items-center gap-2">
                                    <Image src="/images/github_icon.svg" alt="" aria-hidden="true" width={16} height={16}/>
                                    View Repository
                                </span>
                            </Link>
                        </Button>
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

            <GitHubProjectSection
                org="Railroad-Team"
                projectNumber={4}
            />
        </div>
    );
}
