type ContactFormEmailProps = {
    submittedAt: string;
    name: string;
    email: string;
    subject: string;
    message: string;
};

const cardStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "24px",
};

const labelStyle = {
    color: "#6b7280",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.08em",
    margin: "0 0 6px",
    textTransform: "uppercase" as const,
};

const valueStyle = {
    color: "#111827",
    fontSize: "16px",
    lineHeight: 1.6,
    margin: 0,
};

export default function ContactFormEmail({
    submittedAt,
    name,
    email,
    subject,
    message,
}: ContactFormEmailProps) {
    return (
        <div
            style={{
                backgroundColor: "#f3f4f6",
                color: "#111827",
                fontFamily: "Arial, sans-serif",
                margin: 0,
                padding: "32px 16px",
            }}
        >
            <div style={{margin: "0 auto", maxWidth: "680px"}}>
                <div style={{...cardStyle, marginBottom: "16px"}}>
                    <p style={{color: "#6b7280", fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", margin: 0, textTransform: "uppercase"}}>
                        turtywurty.dev
                    </p>
                    <h1 style={{fontSize: "28px", lineHeight: 1.2, margin: "12px 0 8px"}}>
                        New contact form message
                    </h1>
                    <p style={{color: "#4b5563", fontSize: "15px", lineHeight: 1.6, margin: 0}}>
                        Someone submitted the contact form on your website.
                    </p>
                </div>

                <div style={{...cardStyle, marginBottom: "16px"}}>
                    <div style={{marginBottom: "18px"}}>
                        <p style={labelStyle}>Name</p>
                        <p style={valueStyle}>{name}</p>
                    </div>
                    <div style={{marginBottom: "18px"}}>
                        <p style={labelStyle}>Reply To</p>
                        <p style={valueStyle}>
                            <a href={`mailto:${email}`} style={{color: "#2563eb", textDecoration: "none"}}>
                                {email}
                            </a>
                        </p>
                    </div>
                    <div style={{marginBottom: "18px"}}>
                        <p style={labelStyle}>Subject</p>
                        <p style={valueStyle}>{subject}</p>
                    </div>
                    <div>
                        <p style={labelStyle}>Submitted</p>
                        <p style={valueStyle}>{submittedAt}</p>
                    </div>
                </div>

                <div style={cardStyle}>
                    <p style={labelStyle}>Message</p>
                    <div
                        style={{
                            backgroundColor: "#f9fafb",
                            borderRadius: "10px",
                            color: "#111827",
                            fontSize: "16px",
                            lineHeight: 1.7,
                            padding: "18px",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {message}
                    </div>
                </div>
            </div>
        </div>
    );
}
