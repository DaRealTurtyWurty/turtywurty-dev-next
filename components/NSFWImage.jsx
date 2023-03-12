import Image from "next/image";

export default function NSFWImage(props) {
    const {url, alt, classes} = props;

    let clses = "nsfw-image";
    if (classes) {
        classes.forEach(cls => clses += " " + cls);
    }

    function handleClick() {
        let nsfwImage = document.querySelector(".nsfw-image");
        let nsfwClickText = document.querySelector(".nsfw-click-text");
        if (!nsfwImage.classList.contains("no-blur")) {
            nsfwImage.classList.add("no-blur");
            nsfwClickText.classList.add("hidden");
        } else {
            nsfwImage.classList.remove("no-blur");
            nsfwClickText.classList.remove("hidden");
        }
    }

    return (
        <div className="nsfw-container">
            <Image src={url} alt={alt || ""} className={clses} onClick={event => {
                handleClick();
                event.stopPropagation();
            }}/>
            <p className="nsfw-click-text" onClick={event => {
                handleClick();
                event.stopPropagation();
            }}>NSFW<br/>Click to view</p>
        </div>
    );
}