import Image from "next/image";

export default function FrameworkItem(props) {
    const { name, url, image, languages } = props;

    function handleClick() {
        window.open(url, "_blank");
    }

    return (
        <div className="framework-item" onClick={handleClick}>
            <h2 className="framework-name">{name}</h2>
            <Image className="framework-icon" src={image} alt={name} />
        </div>
    );
}