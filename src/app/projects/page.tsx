import type {Metadata} from "next";
import ProjectCard from "@/components/ProjectCard";
import {PROJECTS, isMinecraftProject} from "@/lib/projects";
import {Project} from "@/types/projects";

export const metadata: Metadata = {
    title: "Projects | turtywurty.dev",
    description: "Browse software projects, Minecraft mods, tools, and experiments by TurtyWurty.",
};

const APP_AND_TOOL_PROJECTS = PROJECTS.filter((project) => !isMinecraftProject(project));
const MINECRAFT_PROJECTS = PROJECTS.filter(isMinecraftProject);

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
};

function ProjectSection({eyebrow, title, description, projects}: ProjectSectionProps) {
    if (projects.length === 0) {
        return null;
    }

    return (
        <section className="bg-section-background rounded-lg shadow-lg p-8">
            <div className="mb-6 max-w-3xl">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project) => <ProjectCard project={project} key={project.id}/>)}
            </div>
        </section>
    );
}

export default function ProjectsPage() {
    return (
        <main className="mx-4 md:mx-8 lg:mx-16 space-y-8 py-12">
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="bg-section-background rounded-lg shadow-lg p-8">
                    <div className="max-w-4xl">
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
            </div>
        </main>
    );
}
