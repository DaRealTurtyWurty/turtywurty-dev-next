"use client";

import Link from "next/link";
import {Project} from "@/types/projects";
import ImageWithBackup from "@/components/ImageWithBackup";
import React from "react";
import {Button} from "@/shadcn/components/ui/button";
import Image from "next/image";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({project}: ProjectCardProps) {
    return (
        <Link
            href={project.customUrl ?? `/projects/${project.id}`}
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
                    <div className="flex flex-wrap items-center">
                        <h3 className="text-xl font-semibold">{project.name}</h3>
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

                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {project.description}
                </p>

                <Button
                    variant="outline"
                    className="mt-auto w-full flex items-center justify-center gap-2"
                    asChild
                >
                    <span
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.githubUrl, "_blank", "noopener,noreferrer");
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(project.githubUrl, "_blank", "noopener,noreferrer");
                            }
                        }}
                    >
                        <Image src="/images/github_icon.svg" alt="GitHub" width={20} height={20}/>
                        GitHub
                    </span>
                </Button>

                <div className="flex flex-wrap gap-2 mt-4">
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
            className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${textColor} dark:${darkTextColor} ${backgroundColor} dark:${darkBackgroundColor}`}
        >
            {children}
        </span>
    );
}
