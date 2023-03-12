import Image from "next/image";

export default function SoftwareItem(props) {
    const { name, url, image } = props;

    function handleClick() {
        window.open(url, "_blank");
    }

    return (
        <div className="software-item" onClick={handleClick}>
            <h2 className="software-name">{name}</h2>
            <Image className="software-icon" src={image} alt={name}/>
        </div>
    );
}