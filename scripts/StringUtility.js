export function replaceAllLinks(text) {
    let start = text.indexOf("[");

    while (start !== -1) {
        let end = text.indexOf("]", start + 1);

        if (end === -1) {
            break;
        }

        if(end === start + 1) {
            start = text.indexOf("[", start + 2);
            continue;
        }

        let next = text.indexOf("[", end + 1);
        let link = text.substring(start + 1, end);
        let href = link.substring(link.indexOf("(") + 1, link.indexOf(")"));
        let alt = link.substring(0, link.indexOf("("));
        text = text.replace(text.substring(start, end + 1), `<a href="${href}">${alt}</a>`);
        start = next;
    }

    return text;
}

export function replaceAll(text, toFind, replaceFirst, replaceSecond) {
    let start = text.indexOf(toFind);

    while (start !== -1) {
        let end = text.indexOf(toFind, start + toFind.length);

        if (end === -1) {
            break;
        }

        if(end === start + toFind.length) {
            start = text.indexOf(toFind, start + toFind.length + 1);
            continue;
        }

        let next = text.indexOf(toFind, end + toFind.length);
        text = text.replace(text.substring(start, end + toFind.length), replaceFirst + text.substring(start + toFind.length, end) + replaceSecond);
        start = next;
    }

    return text;
}

export function replaceMarkdown(text) {
    text = replaceAll(text, "**", "<strong>", "</strong>");
    text = replaceAll(text, "*", "<i>", "</i>");
    text = replaceAll(text, "__", "<span style='text-decoration: underline;'>", "</span>");
    text = replaceAll(text, "~~", "<s>", "</s>");
    text = replaceAll(text, "```", "<pre><code>", "</code></pre>");
    text = replaceAll(text, "`", "<code>", "</code>");
    text = replaceAllLinks(text);
    return text;
}