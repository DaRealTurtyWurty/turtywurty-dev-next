import Link from "next/link";
import {Button} from "@/shadcn/components/ui/button";
import SimpleBrandIcon from "@/components/SimpleBrandIcon";

export default function FooterCTA() {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg text-center mb-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Ready to add TurtyBot to your server?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
                TurtyBot is currently in development. Follow the project on GitHub to stay updated on its progress
                and release.
            </p>
            <Link href="https://github.com/DaRealTurtyWurty/SuperTurtyBot" passHref>
                <Button
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                    <SimpleBrandIcon brand="github" title="GitHub" className="h-5 w-5"/>
                    Follow Development
                </Button>
            </Link>
        </div>
    );
}
