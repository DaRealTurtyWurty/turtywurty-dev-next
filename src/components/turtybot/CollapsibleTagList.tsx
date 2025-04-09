"use client";

import {useState} from "react";

interface CollapsibleTagListProps {
    tags: string[];
    visibleTagsNumber?: number;
    nameOfList?: string;
    listPluralSuffix?: string;
}

export default function CollapsibleTagList({
                                               tags,
                                               visibleTagsNumber = 4,
                                               nameOfList = "tag",
                                               listPluralSuffix = "s"
                                           }: CollapsibleTagListProps) {
    const [expanded, setExpanded] = useState(false);
    const sortedTags = [...tags].sort((a, b) => a.localeCompare(b));
    const visibleTags = expanded ? sortedTags : sortedTags.slice(0, visibleTagsNumber);
    const hiddenTagCount = sortedTags.length - visibleTags.length;

    return <div className="flex flex-wrap gap-2 mb-2">
        {visibleTags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                {tag}
            </span>
        ))}

        {!expanded && hiddenTagCount > 0 && (
            <button
                onClick={() => setExpanded(true)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-sm text-blue-600 dark:text-blue-400 cursor-pointer"
            >
                +{hiddenTagCount} more {nameOfList}{hiddenTagCount > 1 ? listPluralSuffix : ""}
            </button>
        )}

        {expanded && sortedTags.length > 4 && (
            <button
                onClick={() => setExpanded(false)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-sm text-red-600 dark:text-red-400 cursor-pointer"
            >
                Show less
            </button>
        )}
    </div>;
}