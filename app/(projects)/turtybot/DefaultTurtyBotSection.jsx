import NSFWImage from "@/components/NSFWImage";
import Image from "next/image";

export default function DefaultTurtyBotSection(props) {
    require("./TurtyBotSection.css");

    const {title, description, image, isLeft, isNSFW} = props;

    return (
        <section className="turtybot-section">
            <div className={isLeft === true ? "section-content left-aligned" : "section-content"}>
                <div className="section-text">
                    <h1 className="section-title">{title}</h1>
                    <p className="section-description">{description}</p>
                </div>
                {
                    isNSFW === true ?
                        <NSFWImage url={image} classes={["section-image"]}/> :
                        <Image className="section-image" src={image} alt=""/>
                }
            </div>
        </section>
    );
}