import Link from "next/link";
import {Button} from "@/shadcn/components/ui/button";
import SimpleBrandIcon from "@/components/SimpleBrandIcon";

type MarketplacePlatform = "modrinth" | "curseforge";

type MarketplaceLinkButtonProps = {
    platform: MarketplacePlatform;
    href: string;
    className?: string;
    label?: string;
    variant?: "default" | "secondary" | "outline" | "ghost" | "link";
};

const PLATFORM_CONFIG: Record<MarketplacePlatform, { iconBrand: MarketplacePlatform; defaultLabel: string }> = {
    modrinth: {
        iconBrand: "modrinth",
        defaultLabel: "View on Modrinth",
    },
    curseforge: {
        iconBrand: "curseforge",
        defaultLabel: "View on CurseForge",
    },
};

export default function MarketplaceLinkButton({
    platform,
    href,
    className,
    label,
    variant = "secondary",
}: MarketplaceLinkButtonProps) {
    const config = PLATFORM_CONFIG[platform];

    return (
        <Button asChild variant={variant} className={className}>
            <Link href={href} target="_blank" rel="noopener noreferrer">
                <span className="inline-flex items-center gap-2">
                    <SimpleBrandIcon brand={config.iconBrand} colored/>
                    {label ?? config.defaultLabel}
                </span>
            </Link>
        </Button>
    );
}
