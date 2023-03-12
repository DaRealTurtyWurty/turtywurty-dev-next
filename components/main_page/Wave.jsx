export default function Wave() {
    require("../../styles/wave.css");

    return (
        <div className="wave-holder">
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
            <div className="cover">
                <div className="wave-cover"></div>
                <div className="wave-cover"></div>
                <div className="wave-cover"></div>
            </div>
        </div>
    );
}