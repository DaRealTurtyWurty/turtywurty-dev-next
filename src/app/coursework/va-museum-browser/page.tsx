import type {Metadata} from "next";
import Link from "next/link";
import {Button} from "@/shadcn/components/ui/button";

export const metadata: Metadata = {
    title: "V&A Museum Browser | turtywurty.dev",
    description: "A coursework web app for browsing the Victoria and Albert Museum collection.",
};

const FEATURES = [
    "Search the V&A collection by object title.",
    "Filter results to entries that include preview images.",
    "Open a focused detail view for each object and jump to the official collection page.",
];

export default function VAMuseumBrowserPage() {
    return (
        <main className="mx-4 space-y-8 py-12 md:mx-8 lg:mx-16">
            <section className="rounded-lg bg-section-background p-8 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Coursework Highlight
                </p>
                <h1 className="mt-2 text-4xl font-bold">Victoria and Albert Museum Browser</h1>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    A browser-based coursework project built with HTML, CSS, and JavaScript to explore the Victoria and Albert Museum collection through the public API.
                    It supports title-based searching, optional image-only results, and quick detail views for individual collection items.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild>
                        <Link href="/va-museum-browser/index.html" target="_blank" rel="noreferrer">
                            Open Full Page
                        </Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="https://api.vam.ac.uk/" target="_blank" rel="noreferrer">
                            V&amp;A API
                        </Link>
                    </Button>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                {FEATURES.map((feature) => (
                    <article
                        key={feature}
                        className="rounded-lg bg-section-background p-6 shadow-lg"
                    >
                        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Feature
                        </p>
                        <p className="mt-3 text-gray-600 dark:text-gray-300">{feature}</p>
                    </article>
                ))}
            </section>

            <section className="rounded-lg bg-section-background p-4 shadow-lg md:p-6">
                <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-md dark:border-white/10">
                    <iframe
                        src="/va-museum-browser/index.html"
                        title="Victoria and Albert Museum Browser"
                        className="h-[900px] w-full border-0"
                    />
                </div>
            </section>
        </main>
    );
}
