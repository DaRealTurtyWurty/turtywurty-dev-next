import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import {isMinecraftProject, PROJECTS} from "@/lib/projects";
import {Project} from "@/types/projects";
import {buttonVariants} from "@/shadcn/components/ui/button";

export const metadata: Metadata = {
    title: "Projects | turtywurty.dev",
    description: "Browse software projects, Minecraft mods, tools, and experiments by TurtyWurty.",
};

const APP_AND_TOOL_PROJECTS = PROJECTS.filter((project) => !isMinecraftProject(project));
const MINECRAFT_PROJECTS = PROJECTS.filter(isMinecraftProject);

type CourseworkEntry = {
    title: string;
    description: string;
    skills: string[];
    slug: string;
    image: string;
};

const COURSEWORK: CourseworkEntry[] = [
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
    },
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
    },
];

const EXPERIMENTS: Project[] = [
    {
        id: "mod-loader-testing",
        name: "Brass Mod Loader",
        logo: "/images/brass.png",
        description: "A scratch-built Minecraft mod loader experiment used for testing loading behavior and related tooling ideas.",
        technologies: ["Java", "Gradle", "Minecraft"],
        githubUrl: "https://github.com/BrassMC/ModLoaderTesting",
    },
    {
        id: "mystic-factories-lwjgl",
        name: "Mystic Factories LWJGL",
        logo: "/images/mystic-factories-lwjgl.png",
        description: "A remake of my college game built with OpenGL and LWJGL, used to explore a lower-level rendering and game framework stack.",
        technologies: ["Java", "LWJGL", "OpenGL", "GLSL"],
        isWip: true,
        githubUrl: "https://github.com/DaRealTurtyWurty/MysticFactoriesLWJGL",
    },
    {
        id: "dynamic-fluid-tanks",
        name: "Dynamic Fluid Tanks",
        logo: "/images/dynamic-fluid-tanks.png",
        description: "An experiment around scalable Minecraft fluid tanks, controller blocks, and custom storage behavior.",
        technologies: ["Java", "Forge", "Minecraft"],
        githubUrl: "https://github.com/DaRealTurtyWurty/DynamicFluidTanks",
    },
    {
        id: "turty-is-sinking",
        name: "Turty Is Sinking",
        logo: "/images/turty-is-sinking.png",
        description: "A kitchen-sink Minecraft mod experiment with machines, utility items, food, entities, and a wide mix of gameplay ideas.",
        technologies: ["Java", "Forge", "Minecraft"],
        githubUrl: "https://github.com/DaRealTurtyWurty/TurtyIsSinking",
    },
    {
        id: "soundboard-mod",
        name: "Soundboard Mod",
        logo: "/images/soundboard-mod.png",
        description: "A Minecraft mod experiment that adds an in-game soundboard for loading custom sounds and broadcasting them into the world.",
        technologies: ["Java", "Forge", "Minecraft"],
        githubUrl: "https://github.com/DaRealTurtyWurty/SoundboardMod",
    },
    {
        id: "turty-chemistry",
        name: "Turty Chemistry",
        logo: "/images/turty-chemistry.png",
        description: "A Minecraft chemistry mod experiment that spans both an older 1.15 codebase and a later 1.19 rewrite.",
        technologies: ["Java", "Forge", "Minecraft", "Chemistry"],
        githubUrl: "https://github.com/DaRealTurtyWurty/Turty-s-Chemistry-1.15",
        repositoryLinks: [
            {
                label: "1.19 Repo",
                url: "https://github.com/DaRealTurtyWurty/TurtyChemistry",
            },
        ],
    },
];

const PROJECT_STATS = [{
    label: "Total Projects",
    value: PROJECTS.length,
    helperText: "Across tools, services, websites, and mods",
}, {
    label: "Current Focus",
    value: PROJECTS.filter((project) => project.isWip || !project.isOutdated).length,
    helperText: "Actively evolving work and current priorities",
}, {
    label: "Minecraft Projects",
    value: PROJECTS.filter(isMinecraftProject).length,
    helperText: "Mods and game-focused tooling",
}, {
    label: "Unreleased",
    value: PROJECTS.filter((project) => project.unreleased).length,
    helperText: "Ideas and builds still in progress",
}];

type ProjectSectionProps = {
    eyebrow: string;
    title: string;
    description: string;
    projects: Project[];
    emptyMessage?: string;
};

function EmptySectionState({message}: { message: string }) {
    return (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white/70 p-6 text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-300">
            {message}
        </div>
    );
}

function ProjectSection({eyebrow, title, description, projects, emptyMessage}: ProjectSectionProps) {
    return (
        <section className="bg-section-background rounded-lg shadow-lg p-8">
            <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {eyebrow}
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                    {title}
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                    {description}
                </p>
            </div>

            {projects.length === 0 ? (
                <EmptySectionState message={emptyMessage ?? `No ${title.toLowerCase()} have been added yet.`}/>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {projects.map((project) => <ProjectCard project={project} key={project.id}/>)}
                </div>
            )}
        </section>
    );
}

function CourseworkSection() {
    return (
        <section className="bg-section-background rounded-lg shadow-lg p-8">
            <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Coursework
                </p>
                <h2 className="mt-2 text-3xl font-bold">
                    University and College Coursework
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                    Coursework projects that sit outside the main project list, covering academic software, web work, and earlier game-development builds.
                </p>
            </div>

            {COURSEWORK.length === 0 ? (
                <EmptySectionState message="No coursework projects have been added yet."/>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {COURSEWORK.map((entry) => (
                        <Link
                            key={entry.slug}
                            href={`/coursework/${entry.slug}`}
                            className="block overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800"
                        >
                            <div className="relative aspect-[16/9] w-full bg-gray-100 dark:bg-gray-900">
                                <Image
                                    src={entry.image}
                                    alt={`${entry.title} preview`}
                                    fill
                                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex h-full flex-col p-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                    {entry.title}
                                </h3>
                                <p className="mt-3 flex-grow text-gray-600 dark:text-gray-300">
                                    {entry.description}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {entry.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-5">
                                    <div className={buttonVariants({variant: "outline", className: "w-full"})}>
                                        Open Coursework
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}

export default function ProjectsPage() {
    return (
        <main className="mx-4 md:mx-8 lg:mx-16 space-y-8 py-12">
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="bg-section-background rounded-lg shadow-lg p-8">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Projects
                        </p>
                        <h1 className="mt-2 text-4xl font-bold">
                            Software, tools, and Minecraft mods
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                            A full index of the projects on the site, including current work, older mod releases,
                            experiments, and tools that do not have their own detail pages yet.
                        </p>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {PROJECT_STATS.map((stat) => (
                        <article
                            key={stat.label}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5"
                        >
                            <p className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                {stat.label}
                            </p>
                            <p className="mt-3 text-4xl font-bold text-gray-900 dark:text-gray-100">
                                {stat.value}
                            </p>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                {stat.helperText}
                            </p>
                        </article>
                    ))}
                </section>

                <ProjectSection
                    eyebrow="Applications"
                    title="Software and Web Projects"
                    description="A broader collection of tools, services, experiments, and web work outside the Minecraft mod list."
                    projects={APP_AND_TOOL_PROJECTS}
                />

                <ProjectSection
                    eyebrow="Minecraft"
                    title="Minecraft Mods"
                    description="Minecraft mods that I've worked on/maintained."
                    projects={MINECRAFT_PROJECTS}
                />

                <CourseworkSection />

                <ProjectSection
                    eyebrow="Experiments"
                    title="Experiments"
                    description="Smaller prototypes, technical explorations, and short-lived builds that may turn into larger projects later."
                    projects={EXPERIMENTS}
                    emptyMessage="No experiments have been added yet."
                />
            </div>
        </main>
    );
}
