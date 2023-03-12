"use client";

import AboutSection from "./AboutSection";
import DefaultTurtyBotSection from "./DefaultTurtyBotSection";

import moderation from "@/assets/turtybot-moderation.png";
import levelling from "@/assets/turtybot-levelling.png";
import images from "@/assets/turtybot-images.png";
import music from "@/assets/turtybot-music.png";
import fun from "@/assets/turtybot-fun.png";
import suggestions from "@/assets/turtybot-suggestions.png";
import polls from "@/assets/turtybot-polls.png";
import utility from "@/assets/turtybot-utility.png";
import nsfw from "@/assets/nsfw/turtybot-nsfw.png";

export default function Page() {
    return (
        <>
            <AboutSection/>
            <DefaultTurtyBotSection
                title="Moderation"
                description="Moderation is a fundamental part of TurtyBot as it helps server owners have much
                    greater control over their community than the default moderation options such as being able to log
                    all moderative actions."
                image={moderation}
            />
            <DefaultTurtyBotSection
                title="Levelling"
                description="Levelling is a feature that allows users to gain experience points which can be used to level up
                    to a certain level and receive rewards at certain levels. Users can compete against other users on a server to get the highest level on the leaderboard!"
                image={levelling}
                isLeft={true}
            />
            <DefaultTurtyBotSection
                title="Images"
                description="Image Commands take up a large chunk of TurtyBot's commands with generation for
                    cats, dogs, horses, birds and much much more. Additionally, there are image manipulation
                    commands and fun image generation commands."
                image={images}
            />
            <DefaultTurtyBotSection
                title="Music"
                description="The Music Module is a feature that allows users to play music from all of your
                    favourite music platforms."
                image={music}
                isLeft={true}
            />
            <DefaultTurtyBotSection
                title="Fun"
                description="The Fun Module is a feature that allows users to do fun commands such as memes,
                    advice, coin-flip, etc."
                image={fun}
            />
            <DefaultTurtyBotSection
                title="Suggestions"
                description="Suggestions allow members of your server to suggest something to a suggestion channel,
                    which will can be approved, denied or considered by a moderator."
                image={suggestions}
                isLeft={true}
            />
            <DefaultTurtyBotSection
                title="Polls"
                description="The Polls Module is a feature that allows users to create polls that the server can vote on."
                image={polls}
            />
            <DefaultTurtyBotSection
                title="Utility"
                description="The Utility Module is a feature that allows users to do utility commands such as
                    User Info, Github Repository Stats, Highlighters, etc."
                image={utility}
                isLeft={true}
            />
            <DefaultTurtyBotSection
                title="NSFW"
                description="The NSFW Module is a feature that allows users to view NSFW content such as
                    Hentai, Rule34, Porn, etc."
                image={nsfw}
                isNSFW={true}
            />
        </>
    );
}