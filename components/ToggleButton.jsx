"use client";

export default function ToggleButton({value, onChange, options, rounded, ...props}) {
    return <label className="toggle-button">
        <input type="checkbox" defaultChecked={value === undefined ? false : value} onChange={onChange} {...props}/>
        <span className={`toggle-button-slider ${rounded ? "rounded" : ""}`}></span>
    </label>
}