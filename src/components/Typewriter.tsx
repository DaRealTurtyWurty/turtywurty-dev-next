"use client";

import {useEffect, useState} from "react";

type ShuffleAlgorithm = 'fisher-yates' | 'naive' | 'sattolo' | 'none';

interface TypewriterOptions {
    strings: string[];
    typeSpeed: number;
    loop: boolean;
    cursor: string;
    cursorSpeed: number;
    deleteSpeed: number;
    pauseTime: number;
    shuffleAlgorithm?: ShuffleAlgorithm;
}

interface TypewriterProps {
    options: TypewriterOptions;
}

const fisherYatesShuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const naiveShuffle = (array: number[]) => {
    const swapCount = array.length * 2; // Arbitrary number of swaps
    for (let i = 0; i < swapCount; i++) {
        const j = Math.floor(Math.random() * array.length);
        const k = Math.floor(Math.random() * array.length);
        [array[j], array[k]] = [array[k], array[j]];
    }
};

const sattoloShuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        [array[i], array[j]] = [array[j], array[i]];
    }
};

function shuffleArray(array: number[], algorithm: ShuffleAlgorithm = 'fisher-yates') {
    switch (algorithm) {
        case 'fisher-yates':
            fisherYatesShuffle(array);
            break;
        case 'naive':
            naiveShuffle(array);
            break;
        case 'sattolo':
            sattoloShuffle(array);
            break;
        case 'none':
            return;
    }
}

export default function Typewriter(props: TypewriterProps) {
    const [text, setText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const [indices, setIndices] = useState<number[]>([]);

    // Initialize and shuffle indices
    useEffect(() => {
        const initialIndices = props.options.strings.map((_, i) => i);
        shuffleArray(initialIndices, props.options.shuffleAlgorithm);
        setIndices(initialIndices);
    }, [props.options.shuffleAlgorithm, props.options.strings]);

    // Blinking Cursor
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, props.options.cursorSpeed);

        return () => clearInterval(interval);
    }, [props.options.cursorSpeed]);

    // Typing and Deleting
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (indices.length === 0) return;

        const stringIndex = indices[currentIndex];

        if (!deleting) {
            if (text.length < props.options.strings[stringIndex].length) {
                timeout = setTimeout(() => {
                    setText((prev) => prev + props.options.strings[stringIndex][text.length]);
                }, props.options.typeSpeed);
            } else {
                timeout = setTimeout(() => {
                    setDeleting(true);
                }, props.options.pauseTime);
            }
        } else {
            if (text.length > 0) {
                timeout = setTimeout(() => {
                    setText((prev) => prev.slice(0, -1));
                }, props.options.deleteSpeed);
            } else {
                timeout = setTimeout(() => {
                    setDeleting(false);
                    let nextIndex = currentIndex + 1;
                    if (nextIndex >= indices.length) {
                        if (props.options.loop) {
                            const newIndices = props.options.strings.map((_, i) => i);
                            shuffleArray(newIndices, props.options.shuffleAlgorithm);
                            setIndices(newIndices);
                            nextIndex = 0;
                        } else {
                            return; // This is to stop if not looping
                        }
                    }

                    setCurrentIndex(nextIndex);
                }, props.options.pauseTime);
            }
        }

        return () => clearTimeout(timeout);
    }, [text, currentIndex, deleting, props.options, indices]);

    return <span className="inline-block font-mono text-lg md:text-2xl lg:text-3xl">
        {text}
        {props.options.cursor && (
            <span className={showCursor ? "opacity-100" : "opacity-0"}>
                {props.options.cursor}
            </span>
        )}
    </span>;
}