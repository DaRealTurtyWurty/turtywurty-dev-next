"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {ThemeToggle} from "@/components/navbar/ThemeToggle";

export default function DesktopNavbarLinks() {
    const pathname = usePathname();

    return <div className="hidden md:block">
        <div className="ml-10 flex items-baseline space-x-4">
            <Link
                href="/"
                className={`text-foreground/90 hover:text-foreground px-3 py-2 ${pathname === "/" ? "font-bold border-b-2 border-foreground" : ""}`}>
                Home
            </Link>
            <Link
                href="/projects"
                className={`text-foreground/90 hover:text-foreground px-3 py-2 ${pathname === "/projects" ? "font-bold border-b-2 border-foreground" : ""}`}>
                Projects
            </Link>
            <Link
                href="/about"
                className={`text-foreground/90 hover:text-foreground px-3 py-2 ${pathname === "/about" ? "font-bold border-b-2 border-foreground" : ""}`}>
                About
            </Link>
            <Link
                href="/contact"
                className={`text-foreground/90 hover:text-foreground px-3 py-2 ${pathname === "/contact" ? "font-bold border-b-2 border-foreground" : ""}`}>
                Contact
            </Link>
            <ThemeToggle />
        </div>
    </div>;
}