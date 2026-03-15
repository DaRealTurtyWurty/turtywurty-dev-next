import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Agerlocus | turtywurty.dev",
    description: "A Unity coursework project build for Agerlocus.",
};

export default function AgerlocusPage() {
    return (
        <main className="mx-4 space-y-8 py-12 md:mx-8 lg:mx-16">
            <section className="rounded-lg bg-section-background p-8 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Coursework Highlight
                </p>
                <h1 className="mt-2 text-4xl font-bold">Agerlocus</h1>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    A 2D side-scroller terraria-like game built in Unity with C#, where you&apos;re in a procedurally generated world and have to fight enemies to survive.
                </p>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    The embedded build comes from the existing Unity WebGL export. Mobile is not supported by this build.
                </p>
            </section>

            <section className="rounded-lg bg-section-background p-4 shadow-lg md:p-6">
                <div className="overflow-hidden rounded-lg bg-black shadow-md">
                    <iframe
                        src="/agerlocus/index.html"
                        title="Agerlocus"
                        className="h-[720px] w-full border-0"
                        allowFullScreen
                    />
                </div>
            </section>
        </main>
    );
}
