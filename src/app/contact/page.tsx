import type {Metadata} from "next";
import Link from "next/link";
import {Button} from "@/shadcn/components/ui/button";
import SimpleBrandIcon from "@/components/SimpleBrandIcon";
import ContactForm from "@/components/contact/ContactForm";
import {CONTACT_DISCORD_URL, CONTACT_EMAIL_ADDRESS, CONTACT_GITHUB_URL, CONTACT_YOUTUBE_URL,} from "@/lib/contact";

export const metadata: Metadata = {
    title: "Contact | turtywurty.dev",
    description: "Ways to get in touch about projects, collaboration, questions, and bug reports.",
};

export default function ContactPage() {
    return (
        <main className="mx-4 md:mx-8 lg:mx-16 space-y-8 py-12">
            <section className="bg-section-background rounded-lg shadow-lg p-8">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Contact
                    </p>
                    <h1 className="mt-2 text-4xl font-bold">
                        Get in touch
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        The easiest ways to reach me are below. If you want to send an email directly from here,
                        use the form.
                    </p>
                </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold">Links</h2>
                    <div className="mt-4 flex flex-col gap-3">
                        <Button asChild variant="outline">
                            <Link href={`mailto:${CONTACT_EMAIL_ADDRESS}`}>
                                <SimpleBrandIcon brand="gmail" colored/>
                                {CONTACT_EMAIL_ADDRESS}
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={CONTACT_DISCORD_URL} target="_blank" rel="noopener noreferrer">
                                <SimpleBrandIcon brand="discord" colored/>
                                Discord
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={CONTACT_YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                                <SimpleBrandIcon brand="youtube" colored/>
                                YouTube
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={CONTACT_GITHUB_URL} target="_blank" rel="noopener noreferrer">
                                <SimpleBrandIcon brand="github"/>
                                GitHub
                            </Link>
                        </Button>
                    </div>
                </div>
                <ContactForm/>
            </section>
        </main>
    );
}
