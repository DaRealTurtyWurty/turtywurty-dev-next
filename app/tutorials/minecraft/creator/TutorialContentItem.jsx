import {CodeBlock} from "@/app/tutorials/ReactCodeBlocks";

export default function TutorialContentItem({ item }) {
    return (
        <div className="tutorial-content-item">
            <div className="tutorial-content-item-header">
                <h3 className="tutorial-content-item-type">{item.type.toString()}</h3>
                <textarea className="tutorial-content-item-data" readOnly aria-readonly>{item.content.toString()}</textarea>
                {
                    item.style && (
                        <CodeBlock
                            language="css"
                            text={item.style.toString()}
                            showLineNumbers={false}
                            />
                    )
                }
            </div>
        </div>
    )
}