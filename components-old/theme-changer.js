import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeChanger() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // when mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const handleLightClick = () => {
        setTheme("light");
    };
    const handleDarkClick = () => {
        setTheme("dark");
    };

    return (
        <>
            <div className="relative flex w-[200px] justify-between overflow-hidden rounded-lg border border-neutral-700">
                <button
                    onClick={handleLightClick}
                    className="w-full py-1 transition-colors"
                    style={
                        theme === "light"
                            ? { background: "#57489D", color: "white" }
                            : null
                    }
                >
                    light
                </button>
                <span className="left-[25%] top-0 w-[1px] bg-neutral-700" />
                <button
                    onClick={handleDarkClick}
                    className="w-full py-1 transition-colors"
                    style={theme === "dark" ? { background: "#57489D" } : null}
                >
                    dark
                </button>
            </div>
        </>
    );
}
