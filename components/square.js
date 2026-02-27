import { useEffect, useState } from "react";

const IRIS = "#c4a7e7";
const FOAM = "#9ccfd8";
const DEFAULT_BG = "#000000";
const BORDER_SUBTLE = "rgba(196, 167, 231, 0.18)"; // iris, very low opacity

const PINE_HIGHLIGHT = "#31748f";

export default function Square({
    value,
    isSelectMode,
    index,
    onSquareEnter,
    searchResult,
    searchColor,
    isInCurrentSelection,
    isHoverHighlight,
}) {
    // state

    const [styles, setStyles] = useState({
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: BORDER_SUBTLE,
        backgroundColor: DEFAULT_BG,
        color: "#ffffff",
    });

    // effects

    useEffect(() => {
        if (searchResult.isOk && searchResult.indexes.includes(index)) {
            setStyles((prev) => ({
                ...prev,
                backgroundColor: FOAM,
                color: "#000000",
            }));
        }
    }, [searchResult, index]);

    useEffect(() => {
        if (!isSelectMode) {
            const found = searchResult.isOk && searchResult.indexes.includes(index);
            const bg = found ? FOAM : (isHoverHighlight ? PINE_HIGHLIGHT : DEFAULT_BG);
            const fg = found ? "#000000" : "#ffffff";
            setStyles((prev) => ({
                ...prev,
                borderColor: BORDER_SUBTLE,
                backgroundColor: bg,
                color: fg,
            }));
        }
    }, [isSelectMode, searchResult, index, searchColor, isHoverHighlight]);

    // When parent reports this square is in the current drag path (e.g. touch), show selecting style
    useEffect(() => {
        if (isSelectMode && isInCurrentSelection) {
            setStyles((prev) => ({
                ...prev,
                backgroundColor: IRIS,
                color: "#000000",
            }));
        }
    }, [isSelectMode, isInCurrentSelection]);

    // Hover highlight from word list (e.g. board-test page)
    useEffect(() => {
        const alreadyFound = searchResult.isOk && searchResult.indexes.includes(index);
        const selecting = isSelectMode && isInCurrentSelection;
        if (isHoverHighlight && !alreadyFound && !selecting) {
            setStyles((prev) => ({
                ...prev,
                backgroundColor: PINE_HIGHLIGHT,
                color: "#ffffff",
            }));
        } else if (!isHoverHighlight && !alreadyFound && !selecting) {
            setStyles((prev) => ({
                ...prev,
                borderColor: BORDER_SUBTLE,
                backgroundColor: DEFAULT_BG,
                color: "#ffffff",
            }));
        }
    }, [isHoverHighlight, searchResult, index, isSelectMode, isInCurrentSelection]);

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

    const setSelectingStyle = () => {
        setStyles((prev) => ({
            ...prev,
            backgroundColor: IRIS,
            color: "#000000",
        }));
    };

    const selectSquareOnMouseEnter = (e) => {
        if (!isSelectMode) return;

        setSelectingStyle();
        onSquareEnter(e, index);
    };

    // fix isSelectMode being false when mouse down on square
    const selectSquareOnMouseDown = (e) => {
        setSelectingStyle();
        onSquareEnter(e, index);
    };

    const handleTouchStart = (e) => {
        e.preventDefault();
        setSelectingStyle();
        onSquareEnter(e, index);
    };

    return (
        <li
            style={styles}
            className="square-cell rounded flex select-none w-[var(--board-square-size,42px)] h-[var(--board-square-size,42px)] items-center justify-center touch-none shrink-0"
            data-square-index={index}
        >
            <span
                onMouseDown={selectSquareOnMouseDown}
                onMouseEnter={selectSquareOnMouseEnter}
                onTouchStart={handleTouchStart}
                className="rounded transition-colors w-2/3 h-2/3 min-w-0 min-h-0 flex items-center justify-center"
            style={{ fontSize: "calc(var(--board-square-size, 42px) * 0.6)" }}
            >
                {(value && value.toUpperCase()) || "."}
            </span>
        </li>
    );
}
