import Image from "next/image";

export default function FrameworkItem(props) {
    const { name, url, image, startDate, description } = props;

    function handleClick() {
        window.open(url, "_blank");
    }

    return (
        <div className="language-item" onClick={handleClick}>
            <h2 className="language-name">{name}</h2>
            <Image className="language-icon" src={image} alt={name}/>
        </div>
    );
}