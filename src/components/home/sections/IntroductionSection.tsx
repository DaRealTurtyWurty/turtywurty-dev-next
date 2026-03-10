"use client";

import useYearsSince from "@/hooks/YearsSince";
import Image from "next/image";
import Wave from "@/components/home/Wave";
import Typewriter from "@/components/Typewriter";
import PlayerViewer from "@/components/home/MinecraftSkinRenderer";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/shadcn/components/ui/tooltip";

function aOrAn(number: number): string {
    const vowelSounds = new Set([
        "8", "11", "18", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89"
    ]);

    const numberStr = number.toString();

    if (vowelSounds.has(numberStr) || numberStr.startsWith("8") || numberStr.startsWith("11")) {
        return `an ${number}`;
    }
    return `a ${number}`;
}

function formatDateWithSuffix(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'short'});
    const year = date.getFullYear();

    const suffix = (day: number) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };

    return `${day}${suffix(day)} ${month} ${year}`;
}

function formatYearsAgo(years: number): string {
    return `${years} year${years === 1 ? "" : "s"} ago`;
}

export default function IntroductionSection() {
    const [age] = useYearsSince(new Date(2004, 1, 7));
    const [startedProgramming] = useYearsSince(new Date(2018, 6, 1));

    const birthDate = formatDateWithSuffix(new Date(2004, 1, 7));
    const programmingStartDate = formatDateWithSuffix(new Date(2018, 6, 1));

    return <>
        <section
            className="relative flex flex-col items-center justify-center space-y-4 md:space-y-8 dark:bg-section-background p-8 shadow-lg pb-[218px]">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                <PlayerViewer uuid="6af8072798b84b3a8dda29bf30a837b5"/>
                <div className="flex flex-col justify-center space-y-2 text-center md:text-left">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Hi, I&#39;m TurtyWurty! 👋</h1>
                    <Typewriter options={{
                        strings: [
                            "Programmer",
                            "Web Developer",
                            "Minecraft Modder",
                            "Tutorial Maker",
                            "Streamer",
                            "YouTuber",
                            "Student",
                            "Game Developer",
                            "Discord Bot Developer",
                            "Java Developer",
                            "Software Engineer",
                            "Tech Enthusiast",
                            "Full Stack Developer",
                            "Open Source Contributor",
                            "JavaFX Developer"
                        ],
                        typeSpeed: 100,
                        loop: true,
                        cursor: "_",
                        cursorSpeed: 500,
                        deleteSpeed: 100,
                        pauseTime: 2000
                    }}/>
                    <p className="text-lg md:text-xl lg:text-2xl">
                        I am
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <span className="font-bold">&nbsp;{aOrAn(age)} year old&nbsp;</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-sm">{birthDate}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        from the UK <Image src="/images/uk_flag.svg" alt="" width={35} height={18}
                                           className="inline mr-1"/>,
                        who started programming
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <span className="font-bold">&nbsp;{formatYearsAgo(startedProgramming)}&nbsp;</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-sm">Approximately ~{programmingStartDate}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </p>
                </div>
            </div>

            <Wave/>
        </section>
    </>;
}
