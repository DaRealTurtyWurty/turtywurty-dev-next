import Link from "next/link";
import {Octokit} from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const getVersions = async () => {
    let contents = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: "DaRealTurtyWurty",
        repo: "Minecraft-Tutorials"
    });

    return await contents.data.filter(content => content.type === "dir").map(content => content.name);
}

const getTutorials = async (version) => {
    console.log(version)
    let content = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: "DaRealTurtyWurty",
        repo: "Minecraft-Tutorials",
        path: version
    });

    return await content.data.filter(content => content.type !== "dir").map(content => content.name);
}

export default async function Page() {
    require("./MinecraftTutorialList.css");

    const versions = await getVersions();

    let tutorialForVersion = {};
    for (let version of await versions) {
        tutorialForVersion[version] = await getTutorials(version);
    }

    return <main>
        <header>
            <h1>Minecraft Tutorials</h1>
        </header>
        <section className="version-group">
            {
                versions.map(version => {
                    return <div key={version} className="tutorial-group">
                        <h2>{version}</h2>
                        <ul>
                            {
                                tutorialForVersion[version].map(tutorial => {
                                    return <Link href={`/tutorials/minecraft/${version}/${tutorial}`}><li key={tutorial} className="tutorial-item">
                                        {tutorial.replace(".json", "")}
                                    </li></Link>
                                })
                            }
                        </ul>
                    </div>
                })
            }
        </section>
    </main>
}