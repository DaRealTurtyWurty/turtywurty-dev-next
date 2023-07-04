"use client";

import {CodeBlock} from "@/app/tutorials/ReactCodeBlocks";
import Codepen from "react-code-blocks/src/themes/codepen";

export default function TutorialContentItem({ item }) {
    return (
        <div className="tutorial-content-item">
            <div className="tutorial-content-item-header">
                <h3 className="tutorial-content-item-type">{item.type}</h3>
                <textarea className="tutorial-content-item-data" readOnly aria-readonly value={item.content.toString()}></textarea>
                <CodeBlock language="css" showLineNumbers={false} text={
                    item.style ? item.style.toString() : ""
                } theme={Codepen}/>
            </div>
        </div>
    )
}