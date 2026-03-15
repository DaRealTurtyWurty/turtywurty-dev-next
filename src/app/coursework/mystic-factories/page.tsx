import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Mystic Factories | turtywurty.dev",
    description: "A Unity coursework project build for Mystic Factories.",
};

export default function MysticFactoriesPage() {
    return (
        <main className="mx-4 space-y-8 py-12 md:mx-8 lg:mx-16">
            <section className="rounded-lg bg-section-background p-8 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Coursework Highlight
                </p>
                <h1 className="mt-2 text-4xl font-bold">Mystic Factories</h1>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    A Fantasy Factory Automation Game built in Unity with C#, where you have to build a factory to produce goods while managing resources and optimizing your layout.
                </p>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    The embedded build comes from the existing Unity WebGL export. Mobile is not supported by this build.
                </p>
            </section>

            <section className="rounded-lg bg-section-background p-4 shadow-lg md:p-6">
                <div className="overflow-hidden rounded-lg bg-black shadow-md">
                    <iframe
                        src="/mystic-factories/index.html"
                        title="Mystic Factories"
                        className="h-[720px] w-full border-0"
                        allowFullScreen
                    />
                </div>
            </section>
        </main>
    );
}
