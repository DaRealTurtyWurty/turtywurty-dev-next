export interface Project {
    id: string;
    name: string;
    logo: string;
    description: string;
    technologies: string[];
    hasDetailPage?: boolean;
    isWip?: boolean;
    isOutdated?: boolean;
    unreleased?: boolean;
    githubUrl: string;
    customUrl?: string;
}
