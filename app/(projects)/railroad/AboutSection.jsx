import logo from "@/assets/railroad-ide.png";
import image from "@/assets/railroad-image.png";
import Image from "next/image";

export default function AboutSection() {
    require("./About.css");

    return (<section className="railroad-section">
            <div className="railroad-header">
                <h1 className="railroad-title">Railroad IDE</h1>
                <Image className="railroad-logo" src={logo} alt=""/>
                <p className="railroad-description">A Minecraft Modding IDE made by modders!</p>
                <div className="button-container">
                    <button className="railroad-button">Get Started</button>
                    <button className="railroad-button">Official Website</button>
                </div>
                <Image className="railroad-image" src={image} alt=""/>
            </div>
        </section>);
}