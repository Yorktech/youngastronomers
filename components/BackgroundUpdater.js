"use client";

import { useEffect } from "react";
import { useBackground } from "./BackgroundContext";

export default function BackgroundUpdater({ config }) {
    const { setBackgroundConfig } = useBackground();

    useEffect(() => {
        if (config) {
            setBackgroundConfig(config);
        } else {
            // Reset or default?
            setBackgroundConfig({ sun: { visible: false }, planets: [], ships: [] })
        }
    }, [config, setBackgroundConfig]);

    return null;
}
