import {Project} from "@/types/projects";

export const PROJECTS: Project[] = [{
    id: "turtybot",
    name: "TurtyBot",
    logo: "/images/turtybot.png",
    description: "A Discord bot that provides various utilities and fun commands.",
    technologies: ["Java", "Gradle", "JDA"],
    hasDetailPage: true,
    isWip: true,
    unreleased: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/SuperTurtyBot",
}, {
    id: "railroad",
    name: "Railroad",
    logo: "/images/railroad.png",
    description: "An IDE made specifically for Minecraft modding, made by the community, for the community.",
    technologies: ["Java", "Gradle", "JavaFX"],
    hasDetailPage: true,
    isWip: true,
    unreleased: true,
    githubUrl: "https://github.com/Railroad-Team/Railroad",
}, {
    id: "industria",
    name: "Industria",
    logo: "/images/industria.png",
    description: "A Minecraft tech mod that adds various machines, automation lines and more.",
    technologies: ["Java", "Fabric", "Gradle", "Minecraft"],
    hasDetailPage: true,
    isWip: true,
    unreleased: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/Industria",
}, {
    id: "personal-website",
    name: "Portfolio Website",
    logo: "/images/website.png",
    description: "This website, built with modern web technologies and custom project pages.",
    technologies: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    isWip: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/turtywurty-dev-next",
    customUrl: "https://turtywurty.dev/",
}, {
    id: "pepolang",
    name: "PepoLang",
    logo: "/images/pepolang.png",
    description: "A programming language made as a final-year university project.",
    technologies: ["Java", "Gradle", "LLVM"],
    hasDetailPage: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/PepoLang",
}, {
    id: "turtyapi",
    name: "TurtyAPI",
    logo: "/images/turtyapi.png",
    description: "A REST API used by TurtyBot for utilities and service integrations.",
    technologies: ["Java", "Gradle", "Javalin"],
    hasDetailPage: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/TurtyAPI",
}, {
    id: "slippery-mod",
    name: "Slippery Mod",
    logo: "/images/slippery-mod.png",
    description: "A Minecraft mod that makes every block slippery, with a no-friction variant too.",
    technologies: ["Java", "Forge", "Gradle", "Minecraft"],
    hasDetailPage: true,
    isOutdated: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/SlipperyMod-normal",
}, {
    id: "copper-boats",
    name: "Copper Boats",
    logo: "/images/copper-boats.png",
    description: "A Minecraft mod that adds copper boats to the game.",
    technologies: ["Java", "Forge", "Fabric", "Gradle", "Minecraft"],
    isOutdated: true,
    unreleased: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/Copper-Boats",
}, {
    id: "creamed-blocks",
    name: "Creamed Blocks",
    logo: "/images/creamed-blocks.png",
    description: "A Minecraft mod that lets you apply magma cream to blocks to prevent snow layers from forming.",
    technologies: ["Java", "Forge", "Fabric", "Gradle", "Minecraft"],
    hasDetailPage: true,
    isOutdated: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/Creamed-Blocks",
}, {
    id: "mob-brawlers",
    name: "Mob Brawlers",
    logo: "/images/mob-brawlers.png",
    description: "A Minecraft mod that expands mob sight ranges and makes mobs aggressive to other mobs.",
    technologies: ["Java", "Forge", "Gradle", "Minecraft"],
    hasDetailPage: true,
    isOutdated: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/MobBrawlers",
}, {
    id: "pathforged",
    name: "Pathforged",
    logo: "/images/pathforged.png",
    description: "A Minecraft mod centered on dynamic block transformations and configurable block behavior.",
    technologies: ["Java", "Forge", "Gradle", "Minecraft"],
    hasDetailPage: true,
    isOutdated: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/Pathforged",
}, {
    id: "shulker-entity-colours",
    name: "Shulker Entity Colours",
    logo: "/images/shulker-entity-colours.png",
    description: "A Minecraft mod that adds dyeable shulker entities.",
    technologies: ["Java", "Forge", "Gradle", "Minecraft"],
    isOutdated: true,
    unreleased: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/ShulkerEntityColours",
}, {
    id: "better-sponges",
    name: "Better Sponges",
    logo: "/images/better-sponges.png",
    description: "A Minecraft mod that adds lava sponges, potion sponges, and enhanced sponge behavior.",
    technologies: ["Java", "Forge", "Gradle", "Minecraft"],
    hasDetailPage: true,
    isOutdated: true,
    githubUrl: "https://github.com/DaRealTurtyWurty/BetterSponges",
}];

export function hasProjectDetailPage(project: Project): boolean {
    return project.hasDetailPage === true;
}

export function getProjectHref(project: Project): string {
    if (project.customUrl) {
        return project.customUrl;
    }

    if (hasProjectDetailPage(project)) {
        return `/projects/${project.id}`;
    }

    return project.githubUrl;
}

export function isMinecraftProject(project: Project): boolean {
    return project.technologies.includes("Minecraft");
}
