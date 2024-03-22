import {deserializeItem} from "@/app/tutorials/minecraft/[version]/[tutorial]/DeserializeItem";

export const dynamicParams = true;

import {redirect} from "next/navigation";
import MinecraftTutorialContent from "@/app/tutorials/minecraft/[version]/[tutorial]/MinecraftTutorialContent";

const getTutorial = async (version, tutorial) => {
    const url = `https://raw.githubusercontent.com/DaRealTurtyWurty/Minecraft-Tutorials/main/${version}/${tutorial}.json`;
    const response = await fetch(
        url,
        {
            next: { revalidate: 10 }
        }
    );

    // if '404: Not Found' then redirect to tutorial list
    if(response.status === 404)
        return redirect("/tutorials/minecraft/");

   return await response.json();
}

export default async function Page({ params }) {
    const {version, tutorial} = params;
    let tutorialData = await getTutorial(version, tutorial);
    let content = deserialize(tutorialData);

    return <MinecraftTutorialContent content={content} version={version}/>;
}

function deserialize(json) {
    return {
        title: json.title,
        description: json.description,
        createdAt: json.createdAt,
        tags: json.tags.map(tag => tag.toString()),
        author: json.author,
        content: json.content.map(deserializeItem)
    };
}