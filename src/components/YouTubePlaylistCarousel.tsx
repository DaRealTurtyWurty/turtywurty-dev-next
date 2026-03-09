import Link from "next/link";
import Image from "next/image";
import {Button} from "@/shadcn/components/ui/button";

type StreamVideo = {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    publishedAt: string;
    views?: number;
};

type YouTubePlaylistCarouselProps = {
    playlistId: string;
    playlistUrl: string;
    title?: string;
    description?: string;
    buttonLabel?: string;
    revalidateSeconds?: number;
};

function decodeXml(value: string): string {
    return value
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&#39;/g, "'");
}

function formatPublishDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Unknown date";
    return new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
}

function formatViewCount(value?: number): string {
    if (typeof value !== "number" || Number.isNaN(value)) return "Views unavailable";
    return `${new Intl.NumberFormat("en-GB").format(value)} views`;
}

function parsePlaylistFeed(xml: string): StreamVideo[] {
    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
    const videos: StreamVideo[] = [];

    for (const entry of entries) {
        const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1]?.trim();
        const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim();
        const url = entry.match(/<link[^>]*href="([^"]+)"[^>]*>/)?.[1]?.trim();
        const published = entry.match(/<published>(.*?)<\/published>/)?.[1]?.trim() ?? "";
        const rawViews = entry.match(/<media:statistics[^>]*views=['"](\d+)['"][^>]*\/?>/)?.[1]
            ?? entry.match(/<yt:statistics[^>]*viewCount=['"](\d+)['"][^>]*\/?>/)?.[1];

        if (!videoId || !title || !url) continue;

        videos.push({
            id: videoId,
            title: decodeXml(title),
            url,
            thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            publishedAt: published,
            views: rawViews ? Number(rawViews) : undefined,
        });
    }

    return videos;
}

async function fetchPlaylistVideos(playlistId: string, revalidateSeconds: number): Promise<StreamVideo[]> {
    try {
        const response = await fetch(
            `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`,
            {
                next: {revalidate: revalidateSeconds},
            }
        );

        if (!response.ok) return [];
        const xml = await response.text();
        return parsePlaylistFeed(xml);
    } catch {
        return [];
    }
}

export default async function YouTubePlaylistCarousel({
    playlistId,
    playlistUrl,
    title = "Development Streams",
    description = "Follow ongoing development on YouTube.",
    buttonLabel = "Open Playlist",
    revalidateSeconds = 60 * 60,
}: YouTubePlaylistCarouselProps) {
    const videos = await fetchPlaylistVideos(playlistId, revalidateSeconds);

    return <>
        <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-12">
            <div className="flex items-center justify-between gap-3 mb-5">
                <p className="text-gray-600 dark:text-gray-300">
                    {description}
                </p>
                <Button asChild variant="outline">
                    <Link href={playlistUrl} target="_blank" rel="noopener noreferrer">
                        {buttonLabel}
                    </Link>
                </Button>
            </div>

            {videos.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No stream videos available right now.</p>
            ) : (
                <div className="overflow-x-auto playlist-scrollbar">
                    <div className="flex gap-4 snap-x snap-mandatory pb-2 min-w-max">
                        {videos.map((video) => (
                            <article
                                key={video.id}
                                className="snap-start w-[300px] md:w-[340px] shrink-0 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900"
                            >
                                <Link href={video.url} target="_blank" rel="noopener noreferrer" className="block">
                                    <div className="relative w-full aspect-video">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.title}
                                            fill
                                            className="object-cover"
                                            sizes="(min-width: 768px) 340px, 300px"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-sm md:text-base mb-1 leading-snug h-[2.6rem] overflow-hidden">
                                            {video.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                                                <path
                                                    d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9ZM5 6a1 1 0 0 0-1 1v1h16V7a1 1 0 0 0-1-1H5Z"/>
                                            </svg>
                                            {formatPublishDate(video.publishedAt)}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                                                <path
                                                    d="M12 5c4.52 0 8.44 2.76 10 7-1.56 4.24-5.48 7-10 7S3.56 16.24 2 12c1.56-4.24 5.48-7 10-7Zm0 2C8.58 7 5.53 8.94 4.1 12 5.53 15.06 8.58 17 12 17s6.47-1.94 7.9-5C18.47 8.94 15.42 7 12 7Zm0 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"/>
                                            </svg>
                                            {formatViewCount(video.views)}
                                        </p>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            )}
        </section>
    </>;
}
