import { useState, useEffect } from "react";

export default function Fade({
    toggler,
    duration = 1000,
    children,
    className,
    onEnd,
}) {
    const [entering, setEntering] = useState(false);
    const [entered, setEntered] = useState(false);

    // fade in when toggler is true
    useEffect(() => {
        const ids = [];

        if (toggler) {
            ids[0] = setTimeout(() => {
                setEntering(true);
            });

            ids[1] = setTimeout(() => {
                setEntered(true);
            }, duration);
        }

        return () => {
            if (toggler) {
                ids.forEach((id) => clearInterval(id));
            }
        };
    }, [toggler, duration]);

    // fade out when toggler is false while component is on the dom
    useEffect(() => {
        if (entered) {
            setEntering(false);

            onEnd && setTimeout(() => onEnd(), duration);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggler]);

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
    };

    const addedStyle = {
        opacity: entering ? 1 : 0,
    };

    return (
        <div className={className} style={{ ...defaultStyle, ...addedStyle }}>
            {children}
        </div>
    );
}
