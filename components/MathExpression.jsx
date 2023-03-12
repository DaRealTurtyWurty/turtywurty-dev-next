import {useEffect, useState} from "react";

export function MathExpression(props) {
    const {expression} = props;

    const [result, setResult] = useState(null);

    useEffect(() => {

    }, [expression]);

    return <span>{result}</span>;
}
