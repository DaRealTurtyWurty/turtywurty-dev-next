"use client";

import {useState} from "react";
import TutorialContentItem from "@/app/tutorials/minecraft/creator/TutorialContentItem";

export default function Page() {
    require("./TutorialCreator.css");

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const created = new Date();
    const [ tags, setTags ] = useState([]);
    const [ author, setAuthor ] = useState("");
    const [ content, setContent ] = useState([]);

    function onTagInput(event) {
        const input = event.target.value;

        // Split the input by commas, but ignore commas that are escaped with a backslash
        let strTags = input.split(/(?<!\\),/).map(tag => tag.trim().replace("\\,", ",")).filter(tag => tag.length > 0);

        if (strTags.length > 0) {
            setTags(strTags);
        }
    }

    return (
        <main>
            <form className="form-group">
                <fieldset>
                    <legend>Metadata</legend>

                    <div className="title-area">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" onChange={e => setTitle(e.target.value)} />
                    </div>

                    <div className="description-area">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" rows="3" onChange={e => setDescription(e.target.value)} maxLength={256}></textarea>
                    </div>

                    <div className="tag-area">
                        <label htmlFor="tags">Tags</label>
                        <input type="text" className="form-control" id="tags" onInput={onTagInput} onLoad={() => setTags([])} />
                        <ul className="tag-list">
                            {
                                tags.map(tag => <li key={tag} className="tag">{tag}</li>)
                            }
                        </ul>
                    </div>

                    <div className="author-area">
                        <label htmlFor="author">Author Name</label>
                        <input type="text" className="form-control" id="author-name" onChange={e => setAuthor(prev => JSON.stringify({...prev, name: e.target.value}))} />
                        <label htmlFor="author">Author UUID</label>
                        <input type="text" className="form-control" id="author-uuid" onChange={e => setAuthor(prev => JSON.stringify({...prev, uuid: e.target.value}))} />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Content</legend>

                    <ul className="content-list">
                        {
                            content.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <TutorialContentItem item={item} />
                                    </li>
                                )
                            })
                        }

                        <li>
                            <button type="button" className="add-content-button" onClick={() => {
                                setContent(prev => [...prev, { type: "text", content: "Hello, world!" }]);
                            }}>Add Content Item</button>
                        </li>
                    </ul>
                </fieldset>
            </form>
        </main>
    );
}