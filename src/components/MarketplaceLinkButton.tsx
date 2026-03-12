import Link from "next/link";
import Image from "next/image";
import {Button} from "@/shadcn/components/ui/button";

type MarketplacePlatform = "modrinth" | "curseforge";

type MarketplaceLinkButtonProps = {
    platform: MarketplacePlatform;
    href: string;
    className?: string;
    label?: string;
    variant?: "default" | "secondary" | "outline" | "ghost" | "link";
};

const PLATFORM_CONFIG: Record<MarketplacePlatform, { iconSrc: string; defaultLabel: string }> = {
    modrinth: {
        iconSrc: "/images/modrinth_icon.svg",
        defaultLabel: "View on Modrinth",
    },
    curseforge: {
        iconSrc: "/images/curseforge_icon.svg",
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
                    <Image src={config.iconSrc} alt="" aria-hidden="true" width={16} height={16}/>
                    {label ?? config.defaultLabel}
                </span>
            </Link>
        </Button>
    );
}
