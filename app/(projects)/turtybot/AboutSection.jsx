import turtybot from "@/assets/turtybot.png";
import Image from "next/image";

export default function AboutSection() {
    require("./TurtyBot.css");

    return (
        <section className="about-section">
            <h1 className="about-title">TurtyBot</h1>
            <Image className="about-profile-picture" src={turtybot} alt=""/>
            <p className="about-description">A multi-purpose discord bot with levelling, moderation and more!</p>
            <div className="button-holder">
                <button className="invite-button">Invite</button>
                <button className="dashboard-button">Dashboard</button>
            </div>
        </section>
    );
}