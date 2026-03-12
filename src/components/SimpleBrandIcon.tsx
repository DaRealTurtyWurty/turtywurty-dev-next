import {ComponentProps} from "react";
import {
    siCurseforge,
    siDiscord,
    siGithub,
    siGmail,
    siModrinth,
    siYoutube,
} from "simple-icons";

type BrandName = "curseforge" | "discord" | "github" | "gmail" | "modrinth" | "youtube";

const ICONS = {
    curseforge: siCurseforge,
    discord: siDiscord,
    github: siGithub,
    gmail: siGmail,
    modrinth: siModrinth,
    youtube: siYoutube,
} as const satisfies Record<BrandName, {title: string; path: string}>;

type SimpleBrandIconProps = Omit<ComponentProps<"svg">, "children" | "viewBox"> & {
    brand: BrandName;
    colored?: boolean;
    title?: string;
};

export default function SimpleBrandIcon({
    brand,
    colored = false,
    className = "h-4 w-4",
    style,
    title,
    ...props
}: SimpleBrandIconProps) {
    const icon = ICONS[brand];

    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden={title ? undefined : "true"}
            role={title ? "img" : undefined}
            className={className}
            fill="currentColor"
            style={colored ? {color: `#${icon.hex}`, ...style} : style}
            {...props}
        >
            {title ? <title>{title}</title> : null}
            <path d={icon.path}/>
        </svg>
    );
}
