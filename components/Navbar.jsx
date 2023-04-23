"use client";

import React from 'react';

import icon from '../assets/icon.png';
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    require("@/styles/navbar.css");

    function handleHamburger() {
        let popout = document.querySelector(".navbar-popout");
        if (popout.classList.contains("open")) {
            popout.classList.remove("open");
        } else {
            popout.classList.add("open");
        }
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Image src={icon} alt="" className="navbar-icon"/>
                <h1 className="navbar-title">turtywurty.dev</h1>
            </div>

            <div className="navbar-right">
                <ul className="navbar-links">
                    <li className="current"><Link href="/" activestyle={{textDecoration: "underline"}}>Home</Link></li>
                    <li><Link href="/about" activestyle={{textDecoration: "underline"}}>About</Link></li>
                    <li><Link href="/contact" activestyle={{textDecoration: "underline"}}>Contact</Link></li>
                </ul>
                <div className="navbar-hamburger" onClick={handleHamburger}>
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>
                <div className="navbar-popout">
                    <ul>
                        <li className="current">Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}