import ProjectItem from "./ProjectItem";

import turtywurtyDev from "@/assets/me.png";
import turtybot from "@/assets/turtybot.png";
import railroadIDE from "@/assets/railroad-ide.png";
import slipperyMod from "@/assets/slippery-mod.png";
import peasMod from "@/assets/peas-mod.png";
import betterSponges from "@/assets/better-sponges.png";
import todoList from "@/assets/todo-list.png";
import nvidiaHighlightMover from "@/assets/nvidia.svg";
import ancientology from "@/assets/ancientology.png";
import brass from "@/assets/brass.png";
import industria from "@/assets/industria.png";

const projects = [
    {
        name: "turtywurty.dev",
        description: "This website - built with NextJS.",
        url: "/",
        image: turtywurtyDev
    },
    {
        name: "TurtyBot",
        description: "A multipurpose Discord bot using JDA.",
        url: "/turtybot",
        image: turtybot
    },
    {
        name: "Railroad IDE",
        description: "An IDE built for Minecraft Modding.",
        url: "/railroad",
        image: railroadIDE
    },
    {
        name: "Slippery Mod",
        description: "A Minecraft mod that makes every block slippery.",
        url: "/slippery-mod",
        image: slipperyMod
    },
    {
        name: "Peas Mod",
        description: "A Minecraft mod that adds pea related things.",
        url: "/peas-mod",
        image: peasMod
    },
    {
        name: "Better Sponges",
        description: "A Minecraft mod that improves vanilla sponges.",
        url: "/better-sponges",
        image: betterSponges
    },
    {
        name: "Todo Application",
        description: "An application that allows you to make to-do lists.",
        url: "/todo-application",
        image: todoList
    },
    {
        name: "Nvidia Highlight Mover",
        description: "An application that automatically moves nvidia highlights.",
        url: "/nvidia-highlight-mover",
        image: nvidiaHighlightMover
    },
    {
        name: "Ancientology",
        description: "A community Minecraft mod that is based on Ancientology.",
        url: "/ancientology",
        image: ancientology
    },
    {
        name: "Brass",
        description: "A Mod Loader and API for Minecraft.",
        url: "/brass",
        image: brass
    },
    {
        name: "Industria",
        description: "A Minecraft tech-chem mod that adds a bunch of machines related to chemical processing.",
        url: "/industria",
        image: industria
    }
]

export default function ProjectsSection() {
    require("../../styles/projects.css");

    return (
        <section className="projects">
            <h1 className="projects-title">Projects</h1>
            <div className="project-grid">
                {projects.map(project => (
                    <ProjectItem
                        key={project.name}
                        name={project.name}
                        description={project.description}
                        url={project.url}
                        image={project.image}
                        languages={project.languages}
                        nsfw={project.nsfw}
                    />
                ))}
            </div>
        </section>
    );
}