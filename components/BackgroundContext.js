"use client";

import { createContext, useContext, useState } from "react";

const BackgroundContext = createContext({
    config: {
        sun: { visible: false },
        planets: [],
        ships: [],
    },
    setBackgroundConfig: () => { },
});

export function BackgroundProvider({ children }) {
    const [config, setConfig] = useState({
        sun: { visible: false },
        planets: [],
        ships: [],
    });

    return (
        <BackgroundContext.Provider value={{ config, setBackgroundConfig: setConfig }}>
            {children}
        </BackgroundContext.Provider>
    );
}

export const useBackground = () => useContext(BackgroundContext);
