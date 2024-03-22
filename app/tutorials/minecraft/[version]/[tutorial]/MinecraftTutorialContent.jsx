"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {deserializeItem} from "@/app/tutorials/minecraft/[version]/[tutorial]/DeserializeItem";

const dateOptions = {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric"
}

export default function MinecraftTutorialContent({content, version}) {
    require("./MinecraftTutorial.css");

    const [userAvatar, setUserAvatar] = useState("");
    useEffect(() => {
        getUserAvatar(content.author).then(setUserAvatar);
    }, []);

    if(content.content.length === 0) {
        content.content = [{
            type: "paragraph",
            content: "No content"
        }].map(deserializeItem);
    }

    return (<div className="minecraft-tutorial">
        <main>
            <header>
                <h1>{content.title}</h1>
                <p>{content.description}</p>
                <p>Created at: {new Date(content.createdAt).toLocaleDateString("en-GB", dateOptions)}</p>
                <div className="tag-container">
                    <p>Tags:</p>
                    <ul className="tags">
                        {content.tags.map(tag => tag.toString()).map(tag => <li key={tag}>{tag}</li>)}
                    </ul>
                </div>
                <div className="author-container">
                    <p>Author:</p>
                    <Image
                        className="author-profile"
                        src={userAvatar}
                        alt=""
                        width={32}
                        height={32}/>
                    <p>{content.author}</p>
                </div>
            </header>
            <p className="version-label">{version}</p>
            <div className="content">
                {content.content}
            </div>
        </main>
    </div>);
}

export async function getUserAvatar(name) {
    if (!name)
        return "https://crafatar.com/avatars/8667ba71b85a4004af54457a9734eed7?size=32&overlay=true";

    const data = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`).then(res => res.json());
    const uuid = data?.id || "8667ba71b85a4004af54457a9734eed7"; // Steve's UUID

    return `https://crafatar.com/avatars/${uuid}?size=32&overlay=true`;
}