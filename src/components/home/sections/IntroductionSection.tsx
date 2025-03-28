"use client";

import useYearsSince from "@/hooks/YearsSince";
import Image from "next/image";
import Wave from "@/components/home/Wave";
import Typewriter from "@/components/Typewriter";
import MinecraftSkinRenderer from "@/components/home/MinecraftSkinRenderer";
import PlayerViewer from "@/components/home/MinecraftSkinRenderer";

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

export default function IntroductionSection() {
    const [age] = useYearsSince(new Date(2004, 1, 7));
    const [startedProgramming] = useYearsSince(new Date(2018, 1, 7));

    const birthDate = new Date(2004, 1, 7).toLocaleDateString();
    const programmingStartDate = new Date(2018, 1, 7).toLocaleDateString();

    return <>
        <section
            className="relative flex flex-col items-center justify-center space-y-4 md:space-y-8 dark:bg-section-background p-8 shadow-lg pb-[218px]">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                <PlayerViewer uuid="7cc8f27e-072d-4c87-bfb6-ab547c5b9ca0" cape="/images/cape.png" />
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
                        I am <span className="font-bold" title={birthDate}>{aOrAn(age)} year old</span> from the UK <Image
                        src="/images/uk_flag.svg" alt="" width={35} height={18} className="inline"/>,
                        who started programming <span className="font-bold"
                                                      title={programmingStartDate}>{startedProgramming} years ago</span>.
                    </p>
                </div>
            </div>

            <Wave/>
        </section>
    </>;
}