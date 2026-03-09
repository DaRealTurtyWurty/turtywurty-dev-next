"use client";

import React, { useEffect } from "react";
import {SkinViewer, WalkingAnimation} from "skinview3d";

export default function PlayerViewer({ uuid }: { uuid: string }) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (window === undefined || !canvasRef.current) return;

        const viewer = new SkinViewer({
            canvas: canvasRef.current,
            width: 256,
            height: 256,
            skin: `https://skinmc.net/api/v1/skins/uuid/${uuid}`,
            cape: `https://skinmc.net/api/v1/cape/${uuid}`,
            enableControls: false,
            animation: new WalkingAnimation(),
            zoom: 1
        });

        viewer.zoom = 1.5;
        viewer.autoRotate = true;
        viewer.playerObject.translateY(-10);
        
    }, [canvasRef, uuid])

    return <canvas ref={canvasRef} className="rounded-full border-6 md:border-8 border-[#325660] dark:border-[#65b1c4]"/>
}