"use client";

import {useState} from "react";
import ToggleButton from "@/components/ToggleButton";

export default function CreateTutorialContentItem({ item, onTypeChange, onContentChange, onStyleChange, onOtherDataChange }) {
    function handleContentChange(e) {
        onContentChange(e.target.value);
    }

    function handleStyleChange(e) {
        onStyleChange(e.target.value);
    }

    function handleOtherDataChange(e, what) {
        onOtherDataChange(e.target.value, what);
    }

    const [dataFields, setDataFields] = useState(
        <>
            <div className="tutorial-content-item-data-container">
                <h4>Content</h4>
                <textarea
                    onInput={handleContentChange}
                    defaultValue={item.content.toString()}></textarea>
            </div>
            <div className="tutorial-content-item-data-container">
                <h4>Style</h4>
                <textarea
                    className="tutorial-content-item-style"
                    onInput={handleStyleChange}
                    defaultValue={item.style ? item.style.toString() : ""}></textarea>
            </div>
        </>
    );
    const [extraData, setExtraData] = useState(null);

    function handleTypeChange(e) {
        onTypeChange(e.target.value);

        switch (e.target.value) {
            case "paragraph":
            case "image":
            case "heading2":
            case "heading3":
            case "quote":
            case "link":
            case "warning":
            case "information":
                case "success":
                case "error":
                case "spoiler":
                case "embed":
                case "math":
                case "video":
                case "audio":
                setDataFields(
                    <>
                        <div className="tutorial-content-item-data-container">
                            <h4>Content</h4>
                            <textarea
                                onInput={handleContentChange}
                                defaultValue={item.content.toString()}></textarea>
                        </div>
                        <div className="tutorial-content-item-data-container">
                            <h4>Style</h4>
                            <textarea
                                className="tutorial-content-item-style"
                                onInput={handleStyleChange}
                                defaultValue={item.style ? item.style.toString() : ""}></textarea>
                        </div>
                    </>
                );
                break;
            case "code":
                setDataFields(
                    <>
                        <div className="tutorial-content-item-data-container">
                            <h4>Content</h4>
                            <textarea
                                onInput={handleContentChange}
                                defaultValue={item.content.toString()}></textarea>
                        </div>
                        <div className="tutorial-content-item-data-container">
                            <h4>Language</h4>
                            <input
                                type="text"
                                onInput={e => handleOtherDataChange(e, "language")}
                                defaultValue={item.style ? item.style.toString() : ""}></input>
                        </div>
                        <div className="tutorial-content-item-data-container">
                            <h4>Style</h4>
                            <textarea
                                className="tutorial-content-item-style"
                                onInput={handleStyleChange}
                                defaultValue={item.style ? item.style.toString() : ""}></textarea>
                        </div>
                    </>
                );
                break;
                case "line-break":
                    case "line-separator":
                    setDataFields(<> </>);
                    break;
            case "download":
                setDataFields(
                    <>
                        <div className="tutorial-content-item-data-container">
                            <h4>Content</h4>
                            <textarea
                                onInput={handleContentChange}
                                defaultValue={item.content.toString()}></textarea>
                        </div>
                        <ToggleButton value={extraData} onChange={setExtraData} options={["file", "url"]} />
                        {
                            extraData === "file" ? (
                                <div className="tutorial-content-item-data-container">
                                    <h4>File</h4>
                                    <input
                                        type="file"
                                        onInput={e => handleOtherDataChange(e, "file")}
                                        defaultValue={item.style ? item.style.toString() : ""}></input>
                                </div>
                            ) : (
                                <div className="tutorial-content-item-data-container">
                                    <h4>URL</h4>
                                    <input
                                        type="text"
                                        onInput={e => handleOtherDataChange(e, "url")}
                                        defaultValue={item.style ? item.style.toString() : ""}></input>
                                </div>
                            )
                        }
                        <div className="tutorial-content-item-data-container">
                            <h4>Style</h4>
                            <textarea
                                className="tutorial-content-item-style"
                                onInput={handleStyleChange}
                                defaultValue={item.style ? item.style.toString() : ""}></textarea>
                        </div>
                    </>
                );
                break;
        }
    }

    return (
        <div className="tutorial-content-item">
            <div className="tutorial-content-item-header">
                <div className="tutorial-content-item-data-container tutorial-content-item-type">
                    <h4>Type</h4>
                    <select onChange={handleTypeChange}>
                        <option value="paragraph">Paragraph</option>
                        <option value="code">Code</option>
                        <option value="image">Image</option>
                        <option value="heading2">Heading 2</option>
                        <option value="heading3">Heading 3</option>
                        <option value="line-break">Line Break</option>
                        <option value="list">List</option>
                        <option value="quote">Quote</option>
                        <option value="link">Link</option>
                        <option value="table">Table</option>
                        <option value="warning">Warning</option>
                        <option value="information">Information</option>
                        <option value="success">Success</option>
                        <option value="error">Error</option>
                        <option value="spoiler">Spoiler</option>
                        <option value="embed">Embed</option>
                        <option value="math">Math</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                        <option value="download">Download</option>
                        <option value="line-separator">Line Separator</option>
                    </select>
                </div>
                {dataFields}
            </div>
        </div>
    )
}