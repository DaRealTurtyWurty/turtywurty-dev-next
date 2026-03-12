import {NextResponse} from "next/server";
import {Resend} from "resend";
import ContactFormEmail from "@/emails/ContactFormEmail";
import {CONTACT_EMAIL_ADDRESS} from "@/lib/contact";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

type ContactPayload = {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    company?: string;
};

function getTrimmedString(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
    if (!process.env.RESEND_API_KEY) {
        return NextResponse.json(
            {error: "Server email is not configured."},
            {status: 500},
        );
    }

    if (!CONTACT_FROM_EMAIL) {
        return NextResponse.json(
            {error: "RESEND_FROM_EMAIL is not configured."},
            {status: 500},
        );
    }

    const body = await request.json().catch(() => null) as ContactPayload | null;

    if (!body) {
        return NextResponse.json({error: "Invalid request body."}, {status: 400});
    }

    const name = getTrimmedString(body.name);
    const email = getTrimmedString(body.email);
    const subject = getTrimmedString(body.subject);
    const message = getTrimmedString(body.message);
    const company = getTrimmedString(body.company);

    if (company) {
        return NextResponse.json({ok: true});
    }

    if (!name || !email || !subject || !message) {
        return NextResponse.json({error: "All fields are required."}, {status: 400});
    }

    if (!isValidEmail(email)) {
        return NextResponse.json({error: "Please enter a valid email address."}, {status: 400});
    }

    if (name.length > 120 || email.length > 160 || subject.length > 160 || message.length > 5000) {
        return NextResponse.json({error: "One or more fields are too long."}, {status: 400});
    }

    const submittedAt = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Europe/London",
    }).format(new Date());

    const text = [
        "New contact form message",
        "",
        `Name: ${name}`,
        `Reply To: ${email}`,
        `Subject: ${subject}`,
        `Submitted: ${submittedAt}`,
        "",
        "Message:",
        message,
    ].join("\n");

    try {
        const {data, error} = await resend.emails.send({
            from: CONTACT_FROM_EMAIL,
            to: [CONTACT_EMAIL_ADDRESS],
            replyTo: email,
            subject: `[Contact] ${subject}`,
            react: ContactFormEmail({
                submittedAt,
                name,
                email,
                subject,
                message,
            }),
            text,
        }, {
            idempotencyKey: `contact-form/${email.toLowerCase()}/${subject.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 80)}-${Date.now()}`,
        });

        if (error) {
            console.error("Resend error while sending contact email:", error);
            return NextResponse.json({error: "Unable to send your message right now."}, {status: 502});
        }

        return NextResponse.json({id: data?.id ?? null});
    } catch (error) {
        console.error("Network-level error while sending contact email:", error);
        return NextResponse.json({error: "Unable to send your message right now."}, {status: 502});
    }
}
