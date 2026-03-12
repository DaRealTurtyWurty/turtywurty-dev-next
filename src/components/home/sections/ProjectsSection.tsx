import ProjectCard from "@/components/ProjectCard";
import {PROJECTS} from "@/lib/projects";

export default function ProjectsSection() {
    return (
        <section
            className="relative flex flex-col items-center justify-center space-y-4 md:space-y-8 dark:bg-section-background p-8 shadow-lg">
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl lg:max-w-full">
                {PROJECTS.map((project) => <ProjectCard project={project} key={project.id}/>)}
            </div>
        </section>
    );
}
