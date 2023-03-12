"use client";

import {useReducer, useState} from "react";

const ACTIONS = {
    ADD_NUMBER: 'ADD_NUMBER',
    CHOOSE_OPERATION: 'CHOOSE_OPERATION',
    CLEAR: 'CLEAR',
    DELETE: 'DELETE',
    EVALUATE: 'EVALUATE'
}

function evaluate({previousOperand, currentOperand, operation}) {
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(previous) || isNaN(current)) return;

    let result = 0;
    switch (operation) {
        case "+":
            result = previous + current;
            break;
        case "-":
            result = previous - current;
            break;
        case "*":
            result = previous * current;
            break;
        case "÷":
            result = previous / current;
            break;
        case "log(x)":
            result = previous + Math.log(current);
            break;
        case "x²":
            result = previous + current * current;
            break;
        case "x³":
            result = previous + current * current * current;
            break;
        case "√x":
            result = previous + Math.sqrt(current);
            break;
        default:
            return;
    }

    return result;
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
});

function formatOperand(operand) {
    if (operand == null) return;

    const [integer, decimal] = operand.toString().split(".");
    if (decimal == null) return INTEGER_FORMATTER.format(parseFloat(integer));

    return `${INTEGER_FORMATTER.format(parseInt(integer))}.${decimal}`;
}

function reducer(state, {type, payload}) {
    switch (type) {
        case ACTIONS.ADD_NUMBER:
            if (state.overwrite) {
                return {
                    ...state, overwrite: false, currentOperand: payload.number
                }
            }

            if (payload.number === "0" && state.currentOperand === "0") return state;
            if (payload.number === "." && state.currentOperand != null && state.currentOperand.toString().includes(".")) return state;

            return {
                ...state, currentOperand: `${state.currentOperand || ""}${payload.number}`
            }
        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null) return state;

            if (state.currentOperand == null) {
                return {
                    ...state, operation: payload.operation
                }
            }

            if (state.previousOperand == null) {
                return {
                    ...state, operation: payload.operation, previousOperand: state.currentOperand, currentOperand: null
                }
            }

            return {
                ...state, previousOperand: evaluate(state), currentOperand: null, operation: payload.operation
            }
        case ACTIONS.EVALUATE:
            if (state.currentOperand == null || state.previousOperand == null || state.operation == null) return state;

            return {
                ...state, overwrite: true, previousOperand: null, currentOperand: evaluate(state), operation: null
            }
        case ACTIONS.DELETE:
            if (state.overwrite) return {
                ...state, overwrite: false, currentOperand: null
            }

            if (state.currentOperand == null) return state;

            if (state.currentOperand.length === 1) return {
                ...state, currentOperand: null
            }

            return {
                ...state, currentOperand: state.currentOperand.slice(0, -1)
            }
        default:
            return state;
    }
}

export default function Page() {
    require("./Calculator.css");

    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});
    const [programmerMode, setProgrammerMode] = useState(false);

    const DEFAULT_BUTTONS = (<>
        <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <button onClick={() => dispatch({type: ACTIONS.DELETE})}>DEL</button>
        <OperationButton operation="÷" dispatch={dispatch}/>
        <DigitButton number={1} dispatch={dispatch}/>
        <DigitButton number={2} dispatch={dispatch}/>
        <DigitButton number={3} dispatch={dispatch}/>
        <OperationButton operation="*" dispatch={dispatch}/>
        <DigitButton number={4} dispatch={dispatch}/>
        <DigitButton number={5} dispatch={dispatch}/>
        <DigitButton number={6} dispatch={dispatch}/>
        <OperationButton operation="+" dispatch={dispatch}/>
        <DigitButton number={7} dispatch={dispatch}/>
        <DigitButton number={8} dispatch={dispatch}/>
        <DigitButton number={9} dispatch={dispatch}/>
        <OperationButton operation="-" dispatch={dispatch}/>
        <DigitButton number="." dispatch={dispatch}/>
        <DigitButton number={0} dispatch={dispatch}/>
        <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </>);

    const PROGRAMMER_BUTTONS = (<>
        <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
        <button onClick={() => dispatch({type: ACTIONS.DELETE})}>DEL</button>
        <OperationButton operation="log(x)" dispatch={dispatch}/>
        <DigitButton number={1} dispatch={dispatch}/>
        <DigitButton number={2} dispatch={dispatch}/>
        <DigitButton number={3} dispatch={dispatch}/>
        <OperationButton operation="x²" dispatch={dispatch}/>
        <DigitButton number={4} dispatch={dispatch}/>
        <DigitButton number={5} dispatch={dispatch}/>
        <DigitButton number={6} dispatch={dispatch}/>
        <OperationButton operation="x³" dispatch={dispatch}/>
        <DigitButton number={7} dispatch={dispatch}/>
        <DigitButton number={8} dispatch={dispatch}/>
        <DigitButton number={9} dispatch={dispatch}/>
        <OperationButton operation="√x" dispatch={dispatch}/>
        <DigitButton number="." dispatch={dispatch}/>
        <DigitButton number={0} dispatch={dispatch}/>
        <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </>);

    const [buttons, setButtons] = useState(DEFAULT_BUTTONS);

    return <main>
        <div className="calculator">
            <div className="calculator-display">
                <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
                <div className="current-operand">{formatOperand(currentOperand)}</div>
            </div>
            {buttons}
        </div>
        <button onClick={() => {
            setProgrammerMode(!programmerMode);
            setButtons(programmerMode ? PROGRAMMER_BUTTONS : DEFAULT_BUTTONS);
        }} className="programmer-mode">🔣
        </button>
    </main>;
}

export function DigitButton({dispatch, number}) {
    return <button onClick={() => dispatch({type: ACTIONS.ADD_NUMBER, payload: {number}})}>{number}</button>
}

export function OperationButton({dispatch, operation}) {
    return <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>{operation}</button>
}