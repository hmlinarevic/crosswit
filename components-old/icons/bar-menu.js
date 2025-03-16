import { useState } from "react";

import classNames from "classnames";

export default function BarMenu({ onToggleMenu, className: propClasses }) {
    const [animateBars, setAnimateBars] = useState(false);

    const animateBarsHandler = () => {
        setAnimateBars((prevState) => !prevState);
        onToggleMenu();
    };

    const barTransitionStyles = {
        1: {
            transform: "rotate(-45deg) translate(-4px, 5px)",
        },
        2: {
            opacity: 0,
        },
        3: {
            transform: "rotate(45deg) translate(-8px, -8px)",
        },
    };

    const containerClasses = classNames("cursor-pointer z-50", propClasses);

    const barClasses = classNames(
        "w-[23px] h-[2px] bg-neutral-400 my-[7px] transition-transform"
    );

    return (
        <div onClick={animateBarsHandler} className={containerClasses}>
            <div
                className={barClasses}
                style={animateBars ? barTransitionStyles[1] : null}
            />
            <div
                className={barClasses}
                style={animateBars ? barTransitionStyles[2] : null}
            />
            <div
                className={barClasses}
                style={animateBars ? barTransitionStyles[3] : null}
            />
        </div>
    );
}
