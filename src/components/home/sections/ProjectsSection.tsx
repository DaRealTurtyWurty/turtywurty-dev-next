import {Project} from "@/types/projects";
import ProjectCard from "@/components/ProjectCard";

const PROJECTS: Project[] = [{
    id: "turtybot",
    name: "TurtyBot",
    logo: "/images/turtybot.png",
    description: "A Discord bot that provides various utilities and fun commands.",
    technologies: ["Java", "Gradle", "JDA"],
    unreleased: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/SuperTurtyBot"
}, {
    id: "railroad",
    name: "Railroad",
    logo: "/images/railroad.png",
    description: "An IDE made specifically for Minecraft Modding, made by the community, for the community.",
    technologies: ["Java", "Gradle", "JavaFX"],
    isWip: true,
    unreleased: true,
    githubUrl: "https://github.com/Railroad-Team/Railroad"
}, {
    id: "industria",
    name: "Industria",
    logo: "/images/industria.png",
    description: "A Minecraft tech mod that adds various machines, automation lines and more.",
    technologies: ["Java", "Fabric", "Gradle", "Minecraft"],
    isWip: true,
    unreleased: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/Industria"
}, {
    id: "personal-website",
    name: "Portfolio Website",
    logo: "/images/website.png",
    description: "This website! Built with modern web technologies.",
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    isWip: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/turtywurty-dev-next",
    customUrl: "https://turtywurty.dev/"
}, {
    id: "pepolang",
    name: "PepoLang",
    logo: "/images/pepolang.png",
    description: "A programming language that I made for my final year project at university.",
    technologies: ["Java", "Gradle", "LLVM"],
    isWip: true,
    unreleased: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/PepoLang"
}, {
    id: "turtyapi",
    name: "TurtyAPI",
    logo: "/images/turtyapi.png",
    description: "A REST API that I use for TurtyBot, which provides various utilities and cool functions.",
    technologies: ["Java", "Gradle", "Javalin"],
    githubUrl: "https://github.com/DaRealTurtyWurty/TurtyAPI"
}, {
    id: "slippery-mod",
    name: "Slippery Mod",
    logo: "/images/slippery-mod.png",
    description: "A Minecraft mod that makes every mod slippery (comes with no-friction variant too).",
    technologies: ["Java", "Forge", "Gradle", "Minecraft"],
    isOutdated: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/SlipperyMod-normal"
}, {
    id: "copper-boats",
    name: "Copper Boats",
    logo: "/images/copper-boats.png",
    description: "A Minecraft mod that adds copper boats to the game.",
    technologies: ["Java", "Forge", "Fabric", "Gradle", "Minecraft"],
    isOutdated: true,
    unreleased: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/Copper-Boats"
}, {
    id: "creamed-blocks",
    name: "Creamed Blocks",
    logo: "/images/creamed-blocks.png",
    description: "A Minecraft mod that allows you to apply magma cream to blocks in order to prevent snow layers from forming.",
    technologies: ["Java", "Forge", "Fabric", "Gradle", "Minecraft"],
    isOutdated: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/Creamed-Blocks"
}, {
    id: "mob-brawlers",
    name: "Mob Brawlers",
    logo: "/images/mob-brawlers.png",
    description: "A Minecraft mod that sets mobs to have a configurable range of sight all the way up to infinite and also makes mobs aggressive to all other mobs.",
    technologies: ["Java", "Forge", "Gradle", "Minecraft"],
    isOutdated: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/MobBrawlers"
}, {
    id: "pathforged",
    name: "Pathforged",
    logo: "/images/pathforged.png",
    description: "A Minecraft mod that introduces an innovative system of dynamic block transformations. These blocks possess adjustable properties, providing the option to either modify their state or retain their original composition.",
    technologies: ["Java", "Forge", "Gradle", "Minecraft"],
    isOutdated: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/Pathforged"
}, {
    id: "shulker-entity-colours",
    name: "Shulker Entity Colours",
    logo: "/images/shulker-entity-colours.png",
    description: "A Minecraft mod that adds dyable shulker entities.",
    technologies: ["Java", "Forge", "Gradle", "Minecraft"],
    isOutdated: true,
    unreleased: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/ShulkerEntityColours"
}, {
    id: "better-sponges",
    name: "Better Sponges",
    logo: "/images/better-sponges.png",
    description: "A Minecraft mod that adds lava sponges, potion sponges, and modifies the functionality of sponges.",
    technologies: ["Java", "Forge", "Gradle", "Minecraft"],
    isOutdated: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/BetterSponges"
}];

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
