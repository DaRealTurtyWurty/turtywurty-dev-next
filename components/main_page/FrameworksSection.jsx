import FrameworkItem from "./FrameworkItem";

import minecraftForge from "@/assets/minecraft_forge.svg";
import gson from "@/assets/gson.svg";
import javafx from "@/assets/javafx.svg";
import lwjgl from "@/assets/lwjgl.svg";
import jda from "@/assets/jda.png";
import gradle from "@/assets/gradle.svg";
import apacheCommons from "@/assets/apache_commons.svg";
import mongodb from "@/assets/mongodb.svg";
import reactjs from "@/assets/reactjs.svg";
import nodejs from "@/assets/nodejs.svg";
import discordjs from "@/assets/discordjs.png";
import unity from "@/assets/unity.svg";
import pythonTurtle from "@/assets/python_turtle.png";
import tkinter from "@/assets/tkinter.png";
import robloxStudio from "@/assets/roblox_studio.svg";

const frameworks = [
    {
        name: "Forge",
        url: "https://minecraftforge.net/",
        image: minecraftForge,
        languages: ["Java"]
    },
    {
        name: "Gson",
        url: "https://github.com/google/gson",
        image: gson,
        languages: ["Java"]
    },
    {
        name: "JavaFX",
        url: "https://openjfx.io/",
        image: javafx,
        languages: ["Java"]
    },
    {
        name: "LWJGL",
        url: "https://lwjgl.org/",
        image: lwjgl,
        languages: ["Java"]
    },
    {
        name: "JDA",
        url: "https://github.com/DV8FromTheWorld/JDA",
        image: jda,
        languages: ["Java"]
    },
    {
        name: "Gradle",
        url: "https://gradle.org/",
        image: gradle,
        languages: ["Java"]
    },
    {
        name: "Apache",
        url: "https://commons.apache.org/",
        image: apacheCommons,
        languages: ["Java"]
    },
    {
        name: "MongoDB",
        url: "https://mongodb.com/",
        image: mongodb,
        languages: ["Java", "JavaScript"]
    },
    {
        name: "ReactJS",
        url: "https://reactjs.org/",
        image: reactjs,
        languages: ["JavaScript"]
    },
    {
        name: "NodeJS",
        url: "https://nodejs.org/",
        image: nodejs,
        languages: ["JavaScript"]
    },
    {
        name: "discord.js",
        url: "https://discord.js.org/",
        image: discordjs,
        languages: ["JavaScript"]
    },
    {
        name: "Unity",
        url: "https://unity3d.com/",
        image: unity,
        languages: ["C#"]
    },
    {
        name: "Turtle",
        url: "https://pythonturtle.org/",
        image: pythonTurtle,
        languages: ["Python"]
    },
    {
        name: "Tkinter",
        url: "https://docs.python.org/3/library/tkinter.html",
        image: tkinter,
        languages: ["Python"]
    },
    {
        name: "Roblox",
        url: "https://roblox.com/create",
        image: robloxStudio,
        languages: ["Lua"]
    }
]

export default function FrameworksSection() {
    require("../../styles/frameworks.css");

    return (
        <section className="frameworks">
            <h1 className="frameworks-title">Frameworks</h1>
            <div className="framework-grid">
                {frameworks.map(framework => (
                    <FrameworkItem
                        key={framework.name}
                        name={framework.name}
                        url={framework.url}
                        image={framework.image}
                        languages={framework.languages}
                    />
                ))}
            </div>
        </section>
    );
}