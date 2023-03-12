import {log} from "next/dist/server/typescript/utils";

export function dateDifference(date0, date1) {
    let timeDiff = date0.valueOf() - date1.valueOf();
    let milliInDay = 24 * 60 * 60 * 1000;
    let noOfDays = timeDiff / milliInDay;
    let daysInYear = 365.242;
    return Math.round(noOfDays / daysInYear);
}

export function secondsToMillis(seconds) {
    return seconds * 1000;
}

export function minutesToMillis(minutes) {
    return secondsToMillis(minutes * 60);
}

export function hoursToMillis(hours) {
    return minutesToMillis(hours * 60);
}

export function millisToSeconds(millis) {
    return millis / 1000;
}

export function millisToMinutes(millis) {
    return millisToSeconds(millis * 60);
}

export function millisToHours(millis) {
    return millisToMinutes(millis * 60);
}