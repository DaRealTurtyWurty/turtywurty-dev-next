import React from "react";

export default function Typewriter(props) {
    const { phrases } = props;
    const [currentPhrase, setCurrentPhrase] = React.useState(phrases[0]);
    const [typedPhrase, setTypedPhrase] = React.useState("");
    const [typingIndex, setTypingIndex] = React.useState(0);
    const [isReverse, setReversed] = React.useState(false);

    React.useEffect(() => {
        var shouldReverse = false;
        const anim = setInterval(() => {
            setTypingIndex(typingIndex => {
                if (shouldReverse && typingIndex > 0) {
                    return typingIndex - 1;
                } else if (shouldReverse && typingIndex <= 0) {
                    shouldReverse = false;
                    return typingIndex;
                } else if (!shouldReverse && typingIndex >= currentPhrase.length - 1) {
                    shouldReverse = true;
                    return currentPhrase.length - 1;
                } else if (!shouldReverse && typingIndex < currentPhrase.length - 1) {
                    return typingIndex + 1;
                }
            });

            if (shouldReverse === true && typingIndex <= 0) {
                setTypedPhrase("");
                let phrase = phrases[Math.floor(Math.random() * phrases.length)];
                console.log(phrase);
                setCurrentPhrase(phrase);
                setReversed(shouldReverse = false);
            } else {
                setReversed(shouldReverse);
            }
        }, 1000);
    });

    React.useEffect(() => {
        if (!isReverse) {
            setTypedPhrase(oldPhrase => oldPhrase + currentPhrase[typingIndex]);
        } else {
            setTypedPhrase(oldPhrase => oldPhrase.slice(0, typingIndex + 1));
        }
    });

    return <strong className="typed-content">{typedPhrase}</strong>
}