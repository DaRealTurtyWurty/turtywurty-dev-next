"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function MobileNavbarLinks() {
    const pathname = usePathname();

    return <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
                href="/public"
                className={`text-foreground/90 hover:text-foreground block px-3 py-2 ${pathname === "/" ? "font-bold border-b-2 border-foreground" : ""}`}>
                Home
            </Link>
            <Link
                href="/projects"
                className={`text-foreground/90 hover:text-foreground block px-3 py-2 ${pathname === "/projects" ? "font-bold border-b-2 border-foreground" : ""}`}>
                Projects
            </Link>
            <Link
                href="/about"
                className={`text-foreground/90 hover:text-foreground block px-3 py-2 ${pathname === "/about" ? "font-bold border-b-2 border-foreground" : ""}`}>
                About
            </Link>
            <Link
                href="/contact"
                className={`text-foreground/90 hover:text-foreground block px-3 py-2 ${pathname === "/contact" ? "font-bold border-b-2 border-foreground" : ""}`}>
                Contact
            </Link>
        </div>
    </div>;
}