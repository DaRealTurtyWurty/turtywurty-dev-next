"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNavbarLinks from "@/components/navbar/MobileNavbarLinks";
import DesktopNavbarLinks from "@/components/navbar/DesktopNavbarLinks";
import HamburgerButton from "@/components/navbar/HamburgerButton";
import {ThemeToggle} from "@/components/navbar/ThemeToggle";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="bg-nav-background border-b border-foreground/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={48}
                                height={48}
                                className="mr-3"/>
                            <span className="text-2xl md:text-3xl font-bold">turtywurty.dev</span>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <DesktopNavbarLinks/>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <HamburgerButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}/>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <MobileNavbarLinks/>
            </div>
        </nav>
    );
}