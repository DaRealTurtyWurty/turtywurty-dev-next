"use client";

import React, {useEffect, useState} from "react";
import {dateDifference, hoursToMillis} from "@/scripts/TimeUtility";

import meImage from "../../assets/me.png";
import ukFlag from "../../assets/uk_flag.svg";
import {Cursor, useTypewriter} from "react-simple-typewriter";
import Wave from "./Wave";
import Image from "next/image";

const {toWords} = require('number-to-words');
const aOrAn = require('indefinite');

const myBirthday = new Date(2004, 2, 7);
const programmingStartDate = new Date(2016, 10, 25);

export default function AboutSection() {
    require("../../styles/about.css");

    function handleAge() {
        let years = dateDifference(new Date(), myBirthday);
        let toWord = toWords(years);
        return `${aOrAn(toWord).replace(toWord, "")} ${years}`;
    }

    function handleProgrammingStart() {
        return dateDifference(new Date(), programmingStartDate).toString();
    }

    const [age, setAge] = useState("");
    const [programmingStart, setProgrammingStart] = useState("");

    useEffect(() => {
        let time = new Date();
        let timeRemaining = (60 - time.getSeconds()) * 1000;

        setAge(handleAge());
        setProgrammingStart(handleProgrammingStart());

        setTimeout(function () {
            setInterval(function () {
                setAge(handleAge());
                setProgrammingStart(handleProgrammingStart());
            }, hoursToMillis(1));
        }, timeRemaining);
    }, []);

    const [text] = useTypewriter({
        words: ["Programmer", "Software Developer", "Games Developer", "JavaFX Developer", "Minecraft Modder", "Discord Bot Developer", "Web Developer", "Java Developer", "Full-stack Developer", "Game Engine Developer"],
        loop: 0,
        typeSpeed: 75,
        deleteSpeed: 75,
        delaySpeed: 5000
    });

    return (
        <section className="about">
            <div className="top">
                <Image src={meImage} className="me-image" alt="" />
                <div className="about-description">
                    <h1 className="about-title">Hi, I&apos;m TurtyWurty!👋</h1>
                    <p className="about-intro"><strong className="typewritten">{text}</strong><Cursor cursorStyle="_"/>
                    </p>
                    <p>I am <strong>{age} year old</strong> from the UK <Image src={ukFlag} width={35} alt=""/>, who started
                        programming <strong>{programmingStart} years ago</strong>!</p>
                </div>
                <Wave/>
            </div>
        </section>
    );
}