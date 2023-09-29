import frameworks from "@/assets/railroad-supported-frameworks.png";
import enhancedErrors from "@/assets/wip.png";
import modelEditor from "@/assets/wip.png";
import textureEditor from "@/assets/wip.png";
import jsons from "@/assets/wip.png";
import mixins from "@/assets/wip.png";
import guiBuilder from "@/assets/wip.png";
import gitIntegration from "@/assets/wip.png";
import tips from "@/assets/wip.png";
import wikiTutorials from "@/assets/wip.png";
import customizable from "@/assets/wip.png";

import AboutSection from "./AboutSection";
import DefaultRailroadSection from "./DefaultRailroadSection";
import ContributorsSection from "./ContributorsSection";
import Carousel from "@/components/Carousel";

export default function Page() {
    const data = [
        {
            title: "Supports all your favourite modding frameworks",
            image: frameworks,
            description: "(Forge, Fabric, Quilt, Architectury, Spigot, Bukkit, Paper, BungeeCord, Velocity)"
        },
        {
            title: "Enhanced warning and error messages",
            image: enhancedErrors,
            description: `Railroad will show errors, warnings and info that are specific to Minecraft Modding,
                    which can help to make the development workflow much nicer to work with.`
        },
        {
            title: "3D Model Editor built into the IDE",
            image: modelEditor,
            description: `Railroad will allow you to create all of your models (including blocks and entities)
                    within the IDE using the built-in model editor meaning there is no need for an external program anymore.`
        },
        {
            title: "Integrated Texture Editor",
            image: textureEditor,
            description: `Railroad contains a built-in texture editor so you can easily create or edit any of your textures
                    within the IDE.`
        },
        {
            title: "Easily create JSON files using the visual editor",
            image: jsons,
            description: `Railroad will allow you to create JSON files such as loot tables,
                    biomes, dimensions, item models and much more using the visual editor.`
        },
        {
            title: "Built-in support for easing the process of mixin development",
            image: mixins,
            description: `Railroad will show injected mixins in the code and also allow developers
                    to easily find a mixin target for a location.`
        },
        {
            title: "Basic GUI Builder",
            image: guiBuilder,
            description: `Railroad contains a basic GUI builder so that you can create a basic GUI within the IDE which will
                    automatically generate the code for the slots and any widgets you add.`
        },
        {
            title: "Git Integration",
            image: gitIntegration,
            description: `Railroad will allow you to easily integrate with Git and GitHub,
                    so that you can easily push your code to the repository.`
        },
        {
            title: "Daily Modding and Java Tips",
            image: tips,
            description: "Railroad will show you daily Modding and Java tips, to teach you something new every day."
        },
        {
            title: "Embedded Wiki and Tutorials",
            image: wikiTutorials,
            description: `Railroad will embed the Community Wiki and TurtyWurty's tutorials right into the IDE
                    through it's own tab, that way you don't have to navigate out of the IDE so often.`
        },
        {
            title: "Fully Customizable Experience",
            image: customizable,
            description: "Railroad's visuals are fully customizable using Cascading Style Sheets (CSS)."
        }
    ];

    return (
        <>
            <AboutSection/>
            <Carousel content=
                          {data.map(item => (
                              <DefaultRailroadSection key={item.title}
                                  {...item}
                              />
                          ))}
            />
            <ContributorsSection/>
        </>
    );
}