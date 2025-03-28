"use client";

import React, { useEffect } from "react";
import {SkinViewer, WalkingAnimation} from "skinview3d";

export default function PlayerViewer({ uuid, cape }: { uuid: string, cape?: string }) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (window === undefined || !canvasRef.current) return;

        const viewer = new SkinViewer({
            canvas: canvasRef.current,
            width: 192,
            height: 192,
            skin: `https://skinmc.net/api/v1/renders/skins/${uuid}/skin`,
            cape,
            enableControls: false,
            animation: new WalkingAnimation(),
            zoom: 1
        });

        viewer.zoom = 1.5;
        viewer.autoRotate = true;
        viewer.playerObject.translateY(-10);
        
    }, [canvasRef, cape, uuid])

    return <canvas ref={canvasRef} className="rounded-full border-6 md:border-8 border-[#325660] dark:border-[#65b1c4]"/>
}