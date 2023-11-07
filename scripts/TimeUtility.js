export function dateDifference(date0, date1) {
    return date0.getFullYear() - date1.getFullYear();
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