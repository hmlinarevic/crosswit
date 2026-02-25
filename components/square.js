import { useEffect, useState } from "react";

const IRIS = "#c4a7e7";
const FOAM = "#9ccfd8";
const DEFAULT_BG = "#000000";
const BORDER_SUBTLE = "rgba(196, 167, 231, 0.18)"; // iris, very low opacity

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
            setStyles((prev) => ({
                ...prev,
                borderColor: BORDER_SUBTLE,
                backgroundColor: searchResult.isOk && searchResult.indexes.includes(index) ? FOAM : DEFAULT_BG,
                color: searchResult.isOk && searchResult.indexes.includes(index) ? "#000000" : "#ffffff",
            }));
        }
    }, [isSelectMode, searchResult, index, searchColor]);

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
