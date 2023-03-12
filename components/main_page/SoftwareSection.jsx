import SoftwareItem from "./SoftwareItem";

import eclipse from "@/assets/eclipse.svg";
import vscode from "@/assets/vscode.svg";
import visualStudio from "@/assets/visual_studio.svg";
import intelliJ from "@/assets/intellij.svg";
import rider from "@/assets/rider.svg";
import webstorm from "@/assets/webstorm.svg";
import atom from "@/assets/atom.svg";
import unity from "@/assets/unity.svg";
import robloxStudio from "@/assets/roblox_studio.svg";
import githubDesktop from "@/assets/github_desktop.svg";
import blender from "@/assets/blender.svg";
import photoshop from "@/assets/photoshop.svg";

const softwares = [
    {
        name: "Eclipse",
        url: "https://eclipse.org/",
        image: eclipse
    },
    {
        name: "VS Code",
        url: "https://code.visualstudio.com/",
        image: vscode
    },
    {
        name: "Visual Studio",
        url: "https://visualstudio.microsoft.com/",
        image: visualStudio
    },
    {
        name: "IntelliJ",
        url: "https://jetbrains.com/idea/",
        image: intelliJ
    },
    {
        name: "Rider",
        url: "https://jetbrains.com/rider/",
        image: rider
    },
    {
        name: "Webstorm",
        url: "https://jetbrains.com/webstorm/",
        image: webstorm
    },
    {
        name: "Atom",
        url: "https://atom.io/",
        image: atom
    },
    {
        name: "Unity Editor",
        url: "https://unity.com/",
        image: unity
    },
    {
        name: "Roblox Studio",
        url: "https://roblox.com/create/",
        image: robloxStudio
    },
    {
        name: "GitHub Desktop",
        url: "https://desktop.github.com/",
        image: githubDesktop
    },
    {
        name: "Blender",
        url: "https://blender.org/",
        image: blender
    },
    {
        name: "Photoshop",
        url: "https://adobe.com/products/photoshop.html",
        image: photoshop
    }
]

export default function SoftwareSection() {
    require("../../styles/software.css");

    return (
        <section className="software">
            <h1 className="software-title">Software</h1>
            <div className="software-grid">
                {softwares.map(software => (
                    <SoftwareItem
                        key={software.name}
                        name={software.name}
                        url={software.url}
                        image={software.image}
                    />
                ))}
            </div>
        </section>
    );
}