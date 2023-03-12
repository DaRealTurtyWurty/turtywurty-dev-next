"use client";

import {useEffect, useRef, useState} from "react";
import Picker from "@/scripts/Picker";

export default function Page() {
    require("./ColorPicker.css");

    const [color, setColor] = useState({r: 0, g: 0, b: 0});
    const canvasRef = useRef(null);

    useEffect(() => {
        let picker = new Picker(canvasRef.current, 500, 440);
        picker.onChange((color) => {
            setColor(color);
            document.querySelector(".color-picker-info-color").style.setProperty("--selected-color", `rgb(${color.r}, ${color.g}, ${color.b})`);
        });

        setInterval(() => {
            picker.draw();
        }, 1);
    }, []);

    function redChange(e) {
        setColor({r: e.target.value, g: color.g, b: color.b});
        document.querySelector(".color-picker-info-color").style.setProperty("--selected-color", `rgb(${color.r}, ${color.g}, ${color.b})`);
    }

    function greenChange(e) {
        setColor({r: color.r, g: e.target.value, b: color.b});
        document.querySelector(".color-picker-info-color").style.setProperty("--selected-color", `rgb(${color.r}, ${color.g}, ${color.b})`);
    }

    function blueChange(e) {
        setColor({r: color.r, g: color.g, b: e.target.value});
        document.querySelector(".color-picker-info-color").style.setProperty("--selected-color", `rgb(${color.r}, ${color.g}, ${color.b})`);
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
    }

    function hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        console.log(result)
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function hexChange(e) {
        let color = hexToRgb(e.target.value);
        if(!color) return;

        setColor({ r: color.r, g: color.g, b: color.b });
        document.querySelector(".color-picker-info-color").style.setProperty("--selected-color", `rgb(${color.r}, ${color.g}, ${color.b})`);
    }

    function rgbToHsl(r, g, b){
        r /= 255;
        g /= 255;
        b /= 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if(max === min){
            h = s = 0; // achromatic
        }else{
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            if (max === r) {
                h = (g - b) / d + (g < b ? 6 : 0);
            } else if (max === g) {
                h = (b - r) / d + 2;
            } else if (max === b) {
                h = (r - g) / d + 4;
            }

            h /= 6;
        }

        return [h, s, l];
    }


    function hslToRgb(h, s, l){
        let r, g, b;

        if(s === 0){
            r = g = b = l; // achromatic
        } else{
            let hue2rgb = function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return {
            r: r * 255,
            g: g * 255,
            b: b * 255
        };
    }

    function hueChange(e) {
        let hsl = rgbToHsl(color.r, color.g, color.b);
        let rgb = hslToRgb(e.target.value, hsl[1], hsl[2]);
        setColor({ r: rgb.r, g: rgb.g, b: rgb.b });
        document.querySelector(".color-picker-info-color").style.setProperty("--selected-color", `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    }

    function saturationChange(e) {
        let hsl = rgbToHsl(color.r, color.g, color.b);
        let rgb = hslToRgb(hsl[0], e.target.value, hsl[2]);
        setColor({ r: rgb.r, g: rgb.g, b: rgb.b });
        document.querySelector(".color-picker-info-color").style.setProperty("--selected-color", `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    }

    function lightnessChange(e) {
        let hsl = rgbToHsl(color.r, color.g, color.b);
        let rgb = hslToRgb(hsl[0], hsl[1], e.target.value);
        setColor({ r: rgb.r, g: rgb.g, b: rgb.b });
        document.querySelector(".color-picker-info-color").style.setProperty("--selected-color", `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
    }

    return (<main>
        <div className="color-picker-container">
            <canvas ref={canvasRef} id="color-picker"></canvas>
            <div className="color-picker-info">
                <div className="color-picker-info-selected">
                    <h3 className="color-picker-info-text">Selected Color</h3>
                    <div className="color-picker-info-color"></div>
                </div>
                <div className="color-picker-info-rgb">
                    <div className="color-picker-info-rgb-entry">
                        <h4 className="color-picker-info-rgb-text">R</h4>
                        <input type="number" className="color-picker-info-rgb-input" value={color.r}
                               onChange={redChange} min={0} max={255}/>
                    </div>

                    <div className="color-picker-info-rgb-entry">
                        <h4 className="color-picker-info-rgb-text">G</h4>
                        <input type="number" className="color-picker-info-rgb-input" value={color.g}
                               onChange={greenChange} min={0} max={255}/>
                    </div>

                    <div className="color-picker-info-rgb-entry">
                        <h4 className="color-picker-info-rgb-text">B</h4>
                        <input type="number" className="color-picker-info-rgb-input" value={color.b}
                               onChange={blueChange} min={0} max={255}/>
                    </div>
                </div>

                <div className="color-picker-info-hex">
                    <h3 className="color-picker-info-text">Hex</h3>
                    <input type="text" className="color-picker-info-hex-input" value={`${rgbToHex(color.r, color.g, color.b)}`} onChange={hexChange}/>
                </div>

                <div className="color-picker-info-hsl">
                    <div className="color-picker-info-hsl-entry">
                        <h4 className="color-picker-info-hsl-text">H</h4>
                        <input type="number" className="color-picker-info-hsl-input" value={Math.round(rgbToHsl(color.r, color.g, color.b)[0] * 360)} min={0} max={360} onChange={hueChange}/>
                    </div>
                    <div className="color-picker-info-hsl-entry">
                        <h4 className="color-picker-info-hsl-text">S</h4>
                        <input type="number" className="color-picker-info-hsl-input" value={Math.round(rgbToHsl(color.r, color.g, color.b)[1] * 100)} min={0} max={100} onChange={saturationChange}/>
                    </div>
                    <div className="color-picker-info-hsl-entry">
                        <h4 className="color-picker-info-hsl-text">L</h4>
                        <input type="number" className="color-picker-info-hsl-input" value={Math.round(rgbToHsl(color.r, color.g, color.b)[2] * 100)} min={0} max={100} onChange={lightnessChange}/>
                    </div>
                </div>
            </div>
        </div>
    </main>);
}