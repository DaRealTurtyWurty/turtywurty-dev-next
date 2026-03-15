import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "2D Maze Game | turtywurty.dev",
    description: "A Unity coursework project exploring a 2D maze game built with C#.",
};

export default function TwoDMazeGamePage() {
    return (
        <main className="mx-4 space-y-8 py-12 md:mx-8 lg:mx-16">
            <section className="rounded-lg bg-section-background p-8 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Coursework Highlight
                </p>
                <h1 className="mt-2 text-4xl font-bold">2D-Maze-Game</h1>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    A 2D maze game built in Unity with C#, where you have to navigate to steal the hostage while avoiding the enemies and taking power-ups.
                    This was my first Unity project, and I built it as part of my coursework for my Computer Games Development course.
                    I wanted to explore the basics of game development and learn how to use Unity, and this project was a great way to do that.
                </p>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    The embedded build comes from the original Unity WebGL export. Mobile is not supported by this build.
                </p>
            </section>

            <section className="rounded-lg bg-section-background p-4 shadow-lg md:p-6">
                <div className="overflow-hidden rounded-lg bg-black shadow-md">
                    <iframe
                        src="/2d-maze-game/index.html"
                        title="2D Maze Game"
                        className="h-[720px] w-full border-0"
                        allowFullScreen
                    />
                </div>
            </section>
        </main>
    );
}
