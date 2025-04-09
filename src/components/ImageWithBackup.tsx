"use client";

import Image, {ImageProps} from "next/image";
import {useState} from "react";

interface ImageWithBackupProps extends ImageProps {
    backupsrc: string;
}

export default function ImageWithBackup(props: ImageWithBackupProps) {
    const [imgSrc, setImgSrc] = useState(props.src);

    return (
        <Image
            {...props}
            src={imgSrc}
            alt={props.alt}
            onError={() => setImgSrc(props.backupsrc)}
        />
    );
}