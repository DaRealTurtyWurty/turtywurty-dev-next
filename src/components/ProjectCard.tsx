"use client";

import Link from "next/link";
import {Project} from "@/types/projects";
import ImageWithBackup from "@/components/ImageWithBackup";
import React from "react";
import {Button} from "@/shadcn/components/ui/button";
import {getProjectHref} from "@/lib/projects";
import SimpleBrandIcon from "@/components/SimpleBrandIcon";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({project}: ProjectCardProps) {
    const githubUrl = project.githubUrl;
    const repositoryLinks = [
        ...(githubUrl ? [{label: project.repositoryLinks?.length ? "Main Repo" : "GitHub", url: githubUrl}] : []),
        ...(project.repositoryLinks ?? []),
    ];
    const hasRepositoryLinks = repositoryLinks.length > 0;

    return (
        <Link
            href={getProjectHref(project)}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 relative mr-4 flex-shrink-0">
                        <ImageWithBackup
                            src={project.logo}
                            alt={`${project.name} logo`}
                            backupsrc="https://placehold.co/256@3x.png?text=N%2FA"
                            fill
                            sizes="48px"
                            className="object-contain rounded-md transition-transform duration-300 transform hover:scale-105 shadow-md dark:shadow-lg"
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-semibold">{project.name}</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {project.isWip && (
                                <ProjectBadge textColor="text-amber-200" darkTextColor="text-amber-800"
                                              backgroundColor="bg-amber-900" darkBackgroundColor="bg-amber-100">
                                    WIP
                                </ProjectBadge>
                            )}
                            {project.unreleased && (
                                <ProjectBadge textColor="text-blue-800" darkTextColor="text-blue-200"
                                              backgroundColor="bg-blue-100" darkBackgroundColor="bg-blue-900">
                                    Unreleased
                                </ProjectBadge>
                            )}
                            {project.isOutdated && (
                                <ProjectBadge textColor="text-red-200" darkTextColor="text-red-800"
                                              backgroundColor="bg-red-900" darkBackgroundColor="bg-red-100">
                                    Outdated
                                </ProjectBadge>
                            )}
                        </div>
                    </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {project.description}
                </p>

                {hasRepositoryLinks && (
                    <div className="mt-auto grid gap-2">
                        {repositoryLinks.map((link) => (
                            <Button
                                key={link.url}
                                variant="outline"
                                className="w-full flex items-center justify-center gap-2"
                                asChild
                            >
                                <span
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.open(link.url, "_blank", "noopener,noreferrer");
                                    }}
                                    className="flex items-center gap-2 cursor-pointer"
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            window.open(link.url, "_blank", "noopener,noreferrer");
                                        }
                                    }}
                                >
                                    <SimpleBrandIcon brand="github" title="GitHub" className="h-5 w-5"/>
                                    {link.label}
                                </span>
                            </Button>
                        ))}
                    </div>
                )}

                <div className={`flex flex-wrap gap-2 ${hasRepositoryLinks ? "mt-4" : "mt-auto pt-4"}`}>
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}

interface ProjectBadgeProps {
    textColor: string;
    darkTextColor: string;
    backgroundColor: string;
    darkBackgroundColor: string;
    children: React.ReactNode;
}

function ProjectBadge({
                          textColor,
                          darkTextColor,
                          backgroundColor,
                          darkBackgroundColor,
                          children,
                      }: ProjectBadgeProps) {
    return (
        <span
            className={`px-2 py-0.5 text-xs font-medium rounded-full ${textColor} dark:${darkTextColor} ${backgroundColor} dark:${darkBackgroundColor}`}
        >
            {children}
        </span>
    );
}
