import Image from "next/image";

export default function ContributorsSection() {
    require("./Contributors.css");

    const users = [
        {
            name: "DaRealTurtyWurty",
            github: "https://github.com/DaRealTurtyWurty",
            avatar: "https://avatars.githubusercontent.com/u/43997792"
        },
        {
            name: "Matyrobbrt",
            github: "https://github.com/Matyrobbrt",
            avatar: "https://avatars.githubusercontent.com/u/65940752"
        },
        {
            name: "SerialSniper",
            github: "https://github.com/SerialSniper",
            avatar: "https://avatars.githubusercontent.com/u/51060730"
        },
        {
            name: "KingRealzYT",
            github: "https://github.com/KingRealzYT",
            avatar: "https://avatars.githubusercontent.com/u/41351144"
        },
        {
            name: "xf8b",
            github: "https://github.com/xf8b",
            avatar: "https://avatars.githubusercontent.com/u/59344510"
        },
        {
            name: "adex720",
            github: "https://github.com/adex720",
            avatar: "https://avatars.githubusercontent.com/u/25402611"
        },
        {
            name: "jens1433",
            github: "https://github.com/jens1433",
            avatar: "https://avatars.githubusercontent.com/u/55440348"
        }
    ];

    return (
        <section className="contributors-section">
            <h1>Contributors</h1>
            <div className="test-grid">
                {
                    users.map((user, index) => (
                        <div key={index}>
                            <p className="contributor-name">{user.name}</p>
                            <Image src={user.avatar} className="contributor-avatar" alt="" width={200} height={200}/>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}