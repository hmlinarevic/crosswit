import { useEffect, useState } from "react";

export default function Square({
    value,
    isSelectMode,
    index,
    onSquareEnter,
    searchResult,
    searchColor,
}) {
    // state

    const [styles, setStyles] = useState({
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
        backgroundColor: "transparent",
    });

    // effects

    useEffect(() => {
        if (searchResult.isOk && searchResult.indexes.includes(index)) {
            changeBgColor(searchColor);
        }
    }, [searchResult, index, searchColor]);

    useEffect(() => {
        if (!isSelectMode) {
            changeBorder("transparent");
        }
    }, [isSelectMode]);

    // functions

    const changeBorder = (color) => {
        setStyles((prevStyles) => {
            return { ...prevStyles, borderColor: color };
        });
    };

    const changeBgColor = (color) => {
        setStyles((prevStyles) => {
            return { ...prevStyles, backgroundColor: color, color: "white" };
        });
    };

    const selectSquareOnMouseEnter = (e) => {
        if (!isSelectMode) return;

        changeBorder(searchColor);
        onSquareEnter(e, index);
    };

    // fix isSelectMode being false when mouse down on square
    const selectSquareOnMouseDown = (e) => {
        changeBorder(searchColor);
        onSquareEnter(e, index);
    };

    return (
        <li style={styles} className="rounded flex select-none w-[42px] h-[42px] items-center justify-center">
            <span
                onMouseDown={selectSquareOnMouseDown}
                onMouseEnter={selectSquareOnMouseEnter}
                className="rounded transition-colors w-[28px] h-[28px] flex items-center justify-center"
                
            >
                {(value && value.toUpperCase()) || "."}
            </span>
        </li>
    );
}
