import NSFWImage from "../NSFWImage";
import Image from "next/image";
import Link from "next/link";

export default function ProjectItem(props) {
    const {name, url, image, description, nsfw} = props;

    return (
        <Link href={url}>
            <div className="project-item">
                <h2 className="project-name">{name}</h2>
                <h3 className="project-description">{description}</h3>
                {nsfw === true ? <NSFWImage url={image} alt={name} classes={["project-image"]} id="nsfw-img"/> :
                    <Image className="project-image" src={image} alt={name}/>}
            </div>
        </Link>
    );
}