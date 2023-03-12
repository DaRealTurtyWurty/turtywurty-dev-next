import brass from "@/assets/brass.png";
import Image from "next/image";

export default function AboutSection() {
    require("./About.css");

    return (
        <section className="brass-section">
            <h1 className="brass-title">Brass</h1>
            <Image src={brass} className="brass-logo" alt="Brass Logo"/>
            <p className="brass-description">
                Brass is a Minecraft Modding toolchain built for aspiring programmers to work with a garden-fresh API.
            </p>
        </section>
    );
}