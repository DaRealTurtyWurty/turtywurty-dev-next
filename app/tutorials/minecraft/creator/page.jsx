import {useRef} from "react";

export default function Page() {
    const tagInput = useRef();

    return (
        <form className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" />

            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" />

            <label htmlFor="description">Description</label>
            <textarea className="form-control" id="description" rows="3"></textarea>

            <div className="tag-area">
                <label htmlFor="tags">Tags</label>
                <input type="text" className="form-control" id="tags" ref={tagInput} />
                <ul className="tag-list">
                    {
                        tagInput.current && tagInput.current.value.split(",").map((tag, index) => {
                            return <li key={index} className="tag">{tag}</li>;
                        })
                    }
                </ul>
            </div>

            <
        </form>
    );
}