import Link from "next/link";
import {ReactNode} from "react";
import {Button} from "@/shadcn/components/ui/button";
import SimpleBrandIcon from "@/components/SimpleBrandIcon";

type SharedButtonProps = {
    href: string;
    className?: string;
    label?: string;
    variant?: "default" | "secondary" | "outline" | "ghost" | "link";
};

type GitHubIssuesButtonProps = SharedButtonProps & {
    icon?: ReactNode;
};

export function GitHubRepositoryButton({
    href,
    className,
    label = "View Repository",
    variant = "default",
}: SharedButtonProps) {
    return (
        <Button asChild variant={variant} className={className}>
            <Link href={href} target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center gap-2">
                    <SimpleBrandIcon brand="github"/>
                    {label}
                </span>
            </Link>
        </Button>
    );
}

export function GitHubIssuesButton({
    href,
    className,
    label = "Open Issues",
    variant = "secondary",
    icon,
}: GitHubIssuesButtonProps) {
    return (
        <Button asChild variant={variant} className={className}>
            <Link href={href} target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center gap-2">
                    {icon}
                    {label}
                </span>
            </Link>
        </Button>
    );
}
