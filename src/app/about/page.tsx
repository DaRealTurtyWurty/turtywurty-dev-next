import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/shadcn/components/ui/button";
import SimpleBrandIcon from "@/components/SimpleBrandIcon";
import {CONTACT_YOUTUBE_URL} from "@/lib/contact";
import YouTubePlaylistCarousel from "@/components/YouTubePlaylistCarousel";
import DiscordServerWidget from "@/components/discord/DiscordServerWidget";

export const metadata: Metadata = {
    title: "About | turtywurty.dev",
    description: "Background, experience, education, and current areas of work for TurtyWurty.",
};

const EXPERIENCE = [{
    role: "Software Developer Work Experience",
    organisation: "Worldpay",
    logo: "/images/worldpay.png",
    location: "London",
    dates: "November 2025 - December 2025",
    points: [
        "Built a JWT generator CLI that is now used by Worldpay level 3 support teams.",
        "Co-developed a Java SDK for client event capture to improve internal logging workflows.",
        "Presented completed work to teams of up to 50 people.",
    ],
}, {
    role: "Website Developer & Maintainer",
    dates: "September 2023 - October 2025",
    detailsOnRequest: true,
    points: [
        "Led a rebuild from Wix to a custom Next.js and SQL-based platform.",
        "Maintained the site, including product listings and pricing updates.",
    ],
}, {
    role: "Software Development Intern",
    dates: "April 2018 - May 2018",
    detailsOnRequest: true,
    points: [
        "Shadowed developers in an insurance brokerage environment.",
        "Observed CI/CD workflows, QA practices, and release processes.",
    ],
}];

interface EducationHighlight {
    title: string;
    description: string;
    skills: string[];
    slug: string;
    image?: string;
}

interface EducationEntry {
    qualification: string;
    organisation?: string;
    logo?: string;
    dates: string;
    details: string[];
    detailsOnRequest?: boolean;
    highlights: EducationHighlight[];
}

const EDUCATION: EducationEntry[] = [{
    qualification: "B.Sc. (Hons) Software Engineering",
    organisation: "University of Brighton",
    logo: "/images/university-of-brighton.png",
    dates: "September 2022 - August 2025",
    details: [
        "Relevant modules: Databases, Web Development, Object-Oriented Development and Testing, Mobile Application Development.",
    ],
    highlights: [
        {
            title: "Game Dashboard",
            description: "A dashboard to view and manage your installed games from multiple sources all in one place.",
            skills: ["Java", "JavaFX", "Gradle", "Git"],
            slug: "game-dashboard",
            image: "/images/game-dashboard.png",
        },
        {
            title: "V&A Museum Browser",
            description: "A website to browse the Victoria and Albert Museum's collection, with searching and detailed views of items.",
            skills: ["HTML", "CSS", "JavaScript", "REST APIs"],
            slug: "va-museum-browser",
            image: "/images/va-museum-browser.png",
        },
        {
            title: "PepoLang",
            description: "A final-year university project exploring the design and implementation of a beginner-friendly programming language.",
            skills: ["Java", "Gradle", "LLVM", "Language Design"],
            slug: "pepolang",
            image: "/images/pepolang.png",
        }
    ],
}, {
    qualification: "Extended Diploma in Creative Media Production and Technology",
    dates: "2020 - 2022",
    detailsOnRequest: true,
    details: [
        "Relevant modules: C#, Unity, Object-Oriented Programming, Game Development.",
    ],
    highlights: [
        {
            title: "2D-Maze-Game",
            description: "A 2D maze game built in Unity with C#, where you have to navigate to steal the hostage while avoiding the enemies and taking power-ups.",
            skills: ["Unity", "C#", "Game Development"],
            slug: "2d-maze-game",
            image: "/images/2d-maze-game.png",
        },
        {
            title: "Mystic Factories",
            description: "A Fantasy Factory Automation Game built in Unity with C#, where you have to build a factory to produce goods while managing resources and optimizing your layout.",
            skills: ["Unity", "C#", "Game Development", "Procedural Generation"],
            slug: "mystic-factories",
            image: "/images/mystic-factories.png",
        },
        {
            title: "Agerlocus",
            description: "A 2D side-scroller terraria-like game built in Unity with C#, where you're in a procedurally generated world and have to fight enemies to survive.",
            skills: ["Unity", "C#", "Game Development", "Procedural Generation"],
            slug: "agerlocus",
            image: "/images/agerlocus.png",
        }
    ],
}];

const CORE_STACK = ["Java", "TypeScript", "Next.js", "Node.js", "Gradle", "Git", "SQL", "Fabric"];

const SKILL_USAGE_AREAS = [{
    title: "Developer Tooling",
    description: "A lot of my work is built around tools for developers, especially Java-based tooling, Gradle workflows, and software that improves modding and development workflows.",
    technologies: ["Java", "Gradle", "Maven", "Git"],
}, {
    title: "Web Platforms",
    description: "For websites and custom platforms, I mainly work in TypeScript with Next.js, Node.js, and SQL-backed systems.",
    technologies: ["TypeScript", "Next.js", "Node.js", "SQL"],
}, {
    title: "Minecraft and Game-Adjacent Work",
    description: "Minecraft modding has been a long-running part of my work, alongside related tooling and earlier game-development work with Unity and C#.",
    technologies: ["Fabric", "Java", "Unity", "C#"],
}];

const ADDITIONAL_SKILLS = ["Python", "C++", "Lua", "Docker", "CI/CD"];

const SELECTED_PROJECTS = [{
    name: "Railroad IDE",
    href: "/projects/railroad",
    logo: "/images/railroad.png",
    summary: "Minecraft-specific IDE work focused on plugin management, Gradle tooling, and improving the modding workflow.",
}, {
    name: "TurtyBot",
    href: "/projects/turtybot",
    logo: "/images/turtybot.png",
    summary: "A multi-purpose Discord bot maintained for over five years, covering moderation, economy systems, and mini-games.",
}, {
    name: "Industria",
    href: "/projects/industria",
    logo: "/images/industria.png",
    summary: "A technology and chemistry Minecraft mod built around more complex processing systems and community-driven development.",
}];

const YOUTUBE_PLAYLIST_ID = "PLaevjqy3XufZ5qFgfd-XnNgoiXynSZLZy";
const YOUTUBE_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`;
const YOUTUBE_CHANNEL_NAME = "TurtyWurty";
const YOUTUBE_AVATAR_URL = "https://yt3.googleusercontent.com/ytc/AIdro_kYSuli_Sd6W-EmHvRPEeUe0YWwaoNeCr_ZEFNmzana8Zo=s120-c-k-c0x00ffffff-no-rj";
const YOUTUBE_CHANNEL_HANDLE = "@TurtyWurty";
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

function formatSubscriberCount(value: string | null): string {
    return value ?? "Subscriber count unavailable";
}

async function fetchYouTubeSubscriberCount(): Promise<string | null> {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
        return null;
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=${encodeURIComponent(YOUTUBE_CHANNEL_HANDLE)}&key=${encodeURIComponent(apiKey)}`,
            {
                next: {revalidate: ONE_DAY_IN_SECONDS},
            }
        );

        if (!response.ok) {
            return null;
        }

        const data = await response.json() as {
            items?: Array<{
                statistics?: {
                    hiddenSubscriberCount?: boolean;
                    subscriberCount?: string;
                };
            }>;
        };

        const statistics = data.items?.[0]?.statistics;
        if (!statistics || statistics.hiddenSubscriberCount || !statistics.subscriberCount) {
            return null;
        }

        const count = Number(statistics.subscriberCount);
        if (Number.isNaN(count)) return null;

        return `${new Intl.NumberFormat("en-GB").format(count)} subscribers`;
    } catch {
        return null;
    }
}

export default async function AboutPage() {
    const subscriberCount = await fetchYouTubeSubscriberCount();

    return (
        <main className="mx-4 md:mx-8 lg:mx-16 space-y-8 py-12">
            <section className="bg-section-background rounded-lg shadow-lg p-8">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                    <div className="flex justify-center lg:justify-start">
                        <div
                            className="relative h-40 w-40 overflow-hidden rounded-full bg-white dark:bg-gray-800 shadow-md">
                            <Image
                                src="/images/turtywurty.png"
                                alt="TurtyWurty"
                                fill
                                sizes="160px"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            About
                        </p>
                        <h1 className="mt-2 text-4xl font-bold">
                            Software engineering, tooling, and community-driven projects
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            I&apos;m TurtyWurty, a Software Engineering graduate from the UK who mainly works with Java
                            and TypeScript. Most of my work sits around developer tools, web platforms, automation,
                            and game-adjacent software.
                        </p>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">
                            I started programming in 2018 and have since worked across open-source projects,
                            commercial web development, internal tooling, Discord bots, and Minecraft modding tools.
                            Alongside university, I built and maintained projects used by real teams and wider
                            communities.
                        </p>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
                    <p className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Started Programming
                    </p>
                    <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        2018
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Started building software in 2018 and have kept a strong focus on practical projects since then.
                    </p>
                </article>
                <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
                    <p className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Degree Completed
                    </p>
                    <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        2025
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Completed a B.Sc. (Hons) in Software Engineering at the University of Brighton in August 2025.
                    </p>
                </article>
                <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
                    <p className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Main Stack
                    </p>
                    <p className="mt-3 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Java + TS
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Most of my recent work centres around Java, TypeScript, Next.js, Node.js, and Minecraft tooling.
                    </p>
                </article>
            </section>

            <section className="bg-section-background rounded-lg shadow-lg p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Experience
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                    Work History
                </h2>

                <div className="mt-6 space-y-6">
                    {EXPERIENCE.map((entry) => (
                        <article
                            key={`${entry.organisation}-${entry.role}`}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                        >
                            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                <div className="flex items-center gap-4">
                                    {entry.logo ? (
                                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                                            <Image
                                                src={entry.logo}
                                                alt={`${entry.role} logo`}
                                                fill
                                                sizes="48px"
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : null}
                                    <div>
                                        <h3 className="text-2xl font-semibold">
                                            {entry.role}
                                        </h3>
                                        {entry.organisation && entry.location ? (
                                            <p className="text-gray-600 dark:text-gray-300">
                                                {entry.organisation} · {entry.location}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {entry.dates}
                                </p>
                            </div>

                            {entry.detailsOnRequest ? (
                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                                    <Link href="/contact" className="font-medium underline underline-offset-4">
                                        Email me for details
                                    </Link>
                                </p>
                            ) : null}

                            <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300 list-disc pl-5">
                                {entry.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </section>

            <section className="space-y-8">
                <div className="bg-section-background rounded-lg shadow-lg p-8">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Education
                    </p>
                    <h2 className="mt-2 text-3xl font-bold">
                        Academic Background
                    </h2>

                    <div className="mt-6 space-y-6">
                        {EDUCATION.map((entry) => (
                            <article
                                key={`${entry.organisation}-${entry.qualification}`}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                            >
                                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                                    <div className="flex items-center gap-4">
                                        {entry.logo ? (
                                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                                                <Image
                                                    src={entry.logo}
                                                    alt={`${entry.qualification} logo`}
                                                    fill
                                                    sizes="48px"
                                                    className="object-contain"
                                                />
                                            </div>
                                        ) : null}
                                        <div>
                                            <h3 className="text-2xl font-semibold">
                                                {entry.qualification}
                                            </h3>
                                            {entry.organisation ? (
                                                <p className="text-gray-600 dark:text-gray-300">
                                                    {entry.organisation}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        {entry.dates}
                                    </p>
                                </div>

                                {entry.detailsOnRequest ? (
                                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                                        <Link href="/contact" className="font-medium underline underline-offset-4">
                                            Email me for details
                                        </Link>
                                    </p>
                                ) : null}

                                <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                                    {entry.details.map((detail) => (
                                        <p key={detail}>{detail}</p>
                                    ))}
                                </div>

                                {entry.highlights.length > 0 ? (
                                    <div className="mt-5">
                                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                            Module Highlights
                                        </p>
                                        <div className="mt-3 flex flex-wrap justify-center gap-4">
                                            {entry.highlights.map((highlight) => (
                                                <article
                                                    key={highlight.slug}
                                                    className="w-80 shrink-0 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
                                                >
                                                    {highlight.image ? (
                                                        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                                                            <Image
                                                                src={highlight.image}
                                                                alt={`${highlight.title} preview`}
                                                                width={640}
                                                                height={360}
                                                                className="h-44 w-full object-cover"
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                        {highlight.title}
                                                    </h4>
                                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                                        {highlight.description}
                                                    </p>
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        {highlight.skills.map((skill) => (
                                                            <span
                                                                key={skill}
                                                                className="rounded-full bg-white px-3 py-1 text-sm text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-200"
                                                            >
                                                            {skill}
                                                        </span>
                                                        ))}
                                                    </div>
                                                    <div className="mt-4">
                                                        <Button asChild variant="outline">
                                                            <Link href={`/coursework/${highlight.slug}`}>
                                                                Open Project
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}
                            </article>
                        ))}
                    </div>
                </div>

                <div className="bg-section-background rounded-lg shadow-lg p-8">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Skills
                    </p>
                    <h2 className="mt-2 text-3xl font-bold">
                        What I Build With
                    </h2>
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                        Java and TypeScript sit at the centre of most of my current work, with the surrounding stack
                        shifting depending on whether I&apos;m building tooling, web platforms, or Minecraft-related
                        projects.
                    </p>

                    <section className="mt-6">
                        <h3 className="text-xl font-semibold">
                            Core Stack
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {CORE_STACK.map((item) => (
                                <span
                                    key={item}
                                    className="px-3 py-1 text-sm rounded-full bg-white dark:bg-gray-800 shadow-sm text-gray-700 dark:text-gray-200"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="mt-8 space-y-4">
                        <h3 className="text-xl font-semibold">
                            Where I Use It
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {SKILL_USAGE_AREAS.map((area) => (
                                <article
                                    key={area.title}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5"
                                >
                                    <h4 className="text-lg font-semibold">
                                        {area.title}
                                    </h4>
                                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                                        {area.description}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {area.technologies.map((technology) => (
                                            <span
                                                key={technology}
                                                className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200"
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="mt-8">
                        <h3 className="text-xl font-semibold">
                            Additional Experience
                        </h3>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {ADDITIONAL_SKILLS.map((item) => (
                                <span
                                    key={item}
                                    className="px-3 py-1 text-sm rounded-full bg-white dark:bg-gray-800 shadow-sm text-gray-700 dark:text-gray-200"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </section>

            <section className="bg-section-background rounded-lg shadow-lg p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Selected Work
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                    Projects I&apos;ve Spent Time Building
                </h2>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SELECTED_PROJECTS.map((project) => (
                        <article
                            key={project.name}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                                    <Image
                                        src={project.logo}
                                        alt={`${project.name} logo`}
                                        fill
                                        sizes="48px"
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-2xl font-semibold">
                                    {project.name}
                                </h3>
                            </div>
                            <p className="mt-3 text-gray-600 dark:text-gray-300 flex-grow">
                                {project.summary}
                            </p>
                            <div className="mt-5">
                                <Button asChild variant="outline">
                                    <Link href={project.href}>
                                        View Project
                                    </Link>
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="bg-section-background rounded-lg shadow-lg p-8">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        YouTube
                    </p>
                    <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
                        <div
                            className="relative h-18 w-18 shrink-0 overflow-hidden rounded-full bg-white shadow-md dark:bg-gray-800">
                            <Image
                                src={YOUTUBE_AVATAR_URL}
                                alt={`${YOUTUBE_CHANNEL_NAME} YouTube avatar`}
                                fill
                                sizes="72px"
                                className="object-cover"
                            />
                        </div>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-3xl font-bold">
                                    {YOUTUBE_CHANNEL_NAME}
                                </h2>
                                <div
                                    className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-gray-800 px-4 py-2 shadow-sm">
                                    <SimpleBrandIcon brand="youtube" colored className="h-5 w-5"/>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        {formatSubscriberCount(subscriberCount)}
                                    </span>
                                </div>
                            </div>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                YouTube channel
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 space-y-4 text-gray-600 dark:text-gray-300">
                        <p>
                            The channel covers Minecraft modding across several Forge generations, from 1.12.2 through
                            to 1.20, alongside Fabric 1.21. The tutorial side of the channel is focused on helping
                            people work through version-specific modding setups rather than treating every release as
                            the same environment.
                        </p>
                        <p>
                            Alongside tutorials, I stream the development of Railroad and Industria every week, so the
                            channel also acts as a public record of how those projects evolve over time.
                        </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <Button asChild variant="outline">
                            <Link href={CONTACT_YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                                <SimpleBrandIcon brand="youtube" colored/>
                                Visit Channel
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="mt-8 rounded-lg bg-white dark:bg-gray-800 shadow-md p-6">
                    <YouTubePlaylistCarousel
                        playlistId={YOUTUBE_PLAYLIST_ID}
                        playlistUrl={YOUTUBE_PLAYLIST_URL}
                        title="Featured Playlist"
                        description="A playlist from the channel."
                        buttonLabel="Open Playlist"
                        embedded
                    />
                </div>
            </section>

            <section className="bg-section-background rounded-lg shadow-lg p-8">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Discord
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                    Discord Server
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    I also run a Discord server.
                </p>

                <div className="mt-6">
                    <DiscordServerWidget
                        guildId="1017111640023506974"
                        fallbackName="TurtyWurty Discord Server"
                    />
                </div>
            </section>
        </main>
    );
}
