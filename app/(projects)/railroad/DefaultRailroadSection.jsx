import Image from "next/image";

export default function DefaultRailroadSection(props) {
    require("./RailroadSection.css");

    const {title, image, description} = props;
    return (
        <section className="railroad-section">
            <h1 className="section-title">{title}</h1>
            <Image className="section-image" src={image} alt="" width="auto" height="auto"/>
            <h3 className="section-description">{description}</h3>
        </section>
    );
}