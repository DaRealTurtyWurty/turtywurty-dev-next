import LanguageItem from "./LanguageItem";

import java from "@/assets/java.svg";
import csharp from "@/assets/c-sharp.svg";
import javascript from "@/assets/javascript.svg";
import python from "@/assets/python.svg";
import lua from "@/assets/lua.svg";

const languages = [
    {
        name: "Java",
        url: "https://www.java.com/",
        image: java,
        startDate: new Date(),
        description: ""
    },
    {
        name: "C#",
        url: "https://docs.microsoft.com/en-us/dotnet/csharp/",
        image: csharp,
        startDate: new Date(),
        description: ""
    },
    {
        name: "JavaScript",
        url: "https://www.javascript.com/",
        image: javascript,
        startDate: new Date(),
        description: ""
    },
    {
        name: "Python",
        url: "https://www.python.org/",
        image: python,
        startDate: new Date(),
        description: ""
    },
    {
        name: "Lua",
        url: "https://www.lua.org/",
        image: lua,
        startDate: new Date(),
        description: ""
    }
]

export default function LanguagesSection() {
    require("../../styles/languages.css");

    return (
        <section className="languages" id="language-section">
            <h1 className="languages-title">Languages</h1>
            <div className="language-grid">
                {languages.map(language => (
                    <LanguageItem
                        key={language.name} name={language.name}
                        url={language.url} image={language.image}
                        startDate={language.startDate}
                        description={language.description}
                    />
                ))}
            </div>
        </section>
    );
}