"use client";

import {FormEvent, useState} from "react";
import {Button} from "@/shadcn/components/ui/button";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
    const [state, setState] = useState<FormState>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        setState("submitting");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: String(formData.get("name") ?? ""),
                    email: String(formData.get("email") ?? ""),
                    subject: String(formData.get("subject") ?? ""),
                    message: String(formData.get("message") ?? ""),
                    company: String(formData.get("company") ?? ""),
                }),
            });

            const result = await response.json().catch(() => null) as {error?: string} | null;

            if (!response.ok) {
                setState("error");
                setErrorMessage(result?.error ?? "Something went wrong while sending the email.");
                return;
            }

            form.reset();
            setState("success");
        } catch {
            setState("error");
            setErrorMessage("Something went wrong while sending the email.");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4"
        >
            <h2 className="text-2xl font-semibold">Email Form</h2>
            <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={120}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={160}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                </label>
                <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    maxLength={160}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={8}
                    required
                    maxLength={5000}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100"
                />
            </div>

            <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            {state === "success" && (
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Your message has been sent.
                </p>
            )}
            {state === "error" && (
                <p className="text-sm text-red-700 dark:text-red-300">
                    {errorMessage}
                </p>
            )}

            <Button type="submit" disabled={state === "submitting"}>
                {state === "submitting" ? "Sending..." : "Send Email"}
            </Button>
        </form>
    );
}
