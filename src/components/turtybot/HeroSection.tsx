import Image from "next/image";
import Link from "next/link";
import {Button} from "@/shadcn/components/ui/button";

export default function HeroSection() {
    return <div
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 mb-12 text-white shadow-lg flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/3 flex justify-center">
            <Image
                src="/images/turtybot.png"
                alt="TurtyBot Logo"
                width={200}
                height={200}
                className="rounded-full bg-white p-2 shadow-xl dark:bg-transparent dark:shadow-none"
            />
        </div>
        <div className="md:w-[2/3] flex flex-col justify-center">
            <div className="flex items-center mb-4">
                <h1 className="text-4xl font-bold">TurtyBot</h1>
                <span
                    className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full text-blue-800 bg-blue-100 dark:text-blue-200 dark:bg-blue-700">
                        Unreleased
                    </span>
            </div>
            <p className="text-xl mb-6">
                A powerful Discord bot providing various utilities, moderation tools, and fun commands for your
                server.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
                    <span
                        className="px-2 py-1 text-xs rounded-full bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200">
                        Java
                    </span>
                <span
                    className="px-2 py-1 text-xs rounded-full bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200">
                        Gradle
                    </span>
                <span
                    className="px-2 py-1 text-xs rounded-full bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200">
                        JDA
                    </span>
            </div>
            <div className="flex gap-4">
                <Link href="https://discord.com" passHref>
                    <Button
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-md dark:bg-blue-700 dark:hover:bg-blue-800 cursor-pointer">
                        <Image src="/images/discord_icon.svg" alt="Discord Logo" width={20} height={20}
                               className="dark:invert"/>
                        Invite Bot
                    </Button>
                </Link>
                <Link href="https://github.com/DaRealTurtyWurty/SuperTurtyBot" passHref>
                    <Button
                        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-md dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer">
                        <Image src="/images/github_icon.svg" alt="GitHub Logo" width={20} height={20}
                               className="dark:invert"/>
                        View Source
                    </Button>
                </Link>
            </div>
        </div>
    </div>;
}