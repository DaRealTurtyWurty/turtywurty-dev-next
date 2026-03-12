import Link from "next/link";
import Image from "next/image";
import GitHubStatsGrid from "@/components/GitHubStatsGrid";
import MinecraftModPlatformStats from "@/components/MinecraftModPlatformStats";
import ImageWithBackup from "@/components/ImageWithBackup";
import {GitHubIssuesButton, GitHubRepositoryButton} from "@/components/GitHubLinkButtons";
import MarketplaceLinkButton from "@/components/MarketplaceLinkButton";
import {Button} from "@/shadcn/components/ui/button";

const TECH_STACK = ["Java", "Forge", "Gradle", "Minecraft"];
const FUNDY_CHANNEL = {
    name: "Fundy",
    url: "https://www.youtube.com/@Fundy",
    avatarUrl: "https://yt3.googleusercontent.com/ytc/AIdro_nfLcmExW-JmqD1p1mXI4lU3C7h_8fkNE_n7uQDLe7VPsw=s200-c-k-c0x00ffffff-no-rj",
};
const FUNDY_VIDEOS = [
    {
        id: "1BVE51x---0",
        title: "I made every block extremely slippery in Minecraft...",
        url: "https://www.youtube.com/watch?v=1BVE51x---0",
    },
    {
        id: "gpEr6bFV-hc",
        title: "I made every block extremely slippery (ft. WilburSoot)",
        url: "https://www.youtube.com/watch?v=gpEr6bFV-hc",
    },
];

export default function SlipperyModPage() {
    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <section className="relative overflow-hidden rounded-xl p-8 mb-12 shadow-lg bg-gradient-to-br from-lime-300 via-emerald-400 to-teal-700 text-zinc-950">
                <div
                    className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.9)_0,transparent_26%),radial-gradient(circle_at_82%_20%,rgba(190,242,100,0.85)_0,transparent_28%),radial-gradient(circle_at_78%_82%,rgba(20,184,166,0.55)_0,transparent_34%)]"/>
                <div className="absolute inset-y-0 right-[-8%] w-[34%] rotate-12 bg-white/18 blur-3xl"/>
                <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Slippery Mod</h1>
                    <p className="text-lg md:text-xl text-zinc-900/85 max-w-3xl mb-6">
                        A Minecraft mod that makes blocks slippery, with a no-friction variant for even more chaotic movement.
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
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <GitHubRepositoryButton
                            href="https://github.com/DaRealTurtyWurty/SlipperyMod-normal"
                            className="bg-zinc-950 text-lime-100 hover:bg-zinc-900"
                        />
                        <GitHubIssuesButton
                            href="https://github.com/DaRealTurtyWurty/SlipperyMod-normal/issues"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                        <MarketplaceLinkButton
                            platform="modrinth"
                            href="https://modrinth.com/mod/slippery-mod"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                        <MarketplaceLinkButton
                            platform="curseforge"
                            href="https://www.curseforge.com/minecraft/mc-mods/slippery-mod"
                            className="bg-white/22 text-zinc-950 hover:bg-white/35 border border-white/35"
                        />
                    </div>
                </div>
            </section>

            <GitHubStatsGrid
                owner="DaRealTurtyWurty"
                repo="SlipperyMod-normal"
                title="Repository Stats"
                enabledStats={["totalCommits", "openIssues", "lastUpdated", "stars", "languages"]}
            />

            <h2 className="text-3xl font-bold mb-6 text-center">Backstory</h2>
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)] gap-6 mb-6">
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        <p>
                            Slippery Mod started as a custom Minecraft mod made for{" "}
                            <Link
                                href={FUNDY_CHANNEL.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-lime-700 dark:text-lime-300 hover:underline"
                            >
                                Fundy
                            </Link>
                            . The original brief was the standard slippery version, so that came first, and the later
                            no-friction variant only exists because he came back and wanted the idea pushed even
                            further.
                        </p>
                        <p>
                            That split is why there are effectively two versions of the mod: the original slippery
                            release and the even more chaotic no-friction follow-up. Both of the videos below used that
                            later direction as the concept evolved.
                        </p>
                        <p>
                            The earliest versions were built with JavaScript coremods and relied on some pretty hacky
                            techniques to force the movement behaviour. Newer versions moved over to Mixins, which are
                            much cleaner to maintain and far more widely supported across modern modding setups.
                        </p>
                    </div>

                    <article className="rounded-lg border border-lime-200 dark:border-lime-800 bg-lime-50/60 dark:bg-lime-950/20 p-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-lime-700 dark:text-lime-300 mb-4">
                            Made For
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-lime-200 dark:border-lime-700">
                                <ImageWithBackup
                                    src={FUNDY_CHANNEL.avatarUrl}
                                    backupsrc="https://placehold.co/128x128/png?text=F"
                                    alt={`${FUNDY_CHANNEL.name} profile picture`}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {FUNDY_CHANNEL.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                    Creator the mod was originally built for.
                                </p>
                                <Button asChild variant="outline">
                                    <Link href={FUNDY_CHANNEL.url} target="_blank" rel="noopener noreferrer">
                                        Visit Channel
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </article>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {FUNDY_VIDEOS.map((video) => (
                        <article
                            key={video.id}
                            className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900"
                        >
                            <div className="aspect-video">
                                <iframe
                                    className="h-full w-full"
                                    src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                                    title={video.title}
                                    loading="lazy"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-base mb-2 text-gray-900 dark:text-gray-100">
                                    {video.title}
                                </h3>
                                <Link
                                    href={video.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-lime-700 dark:text-lime-300 hover:underline"
                                >
                                    Watch on YouTube
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <MinecraftModPlatformStats
                title="Downloads & Version Support"
                description="Marketplace reach and supported Minecraft versions across the available platforms."
                modrinth={{
                    projectId: "slippery-mod",
                    url: "https://modrinth.com/mod/slippery-mod",
                }}
                curseForge={{
                    slug: "slippery-mod",
                    url: "https://www.curseforge.com/minecraft/mc-mods/slippery-mod",
                }}
            />
        </div>
    );
}
