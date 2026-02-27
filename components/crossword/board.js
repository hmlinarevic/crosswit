import { useState, useEffect, useCallback, useRef } from "react";

import Square from "../square";

const collectedData = {
    squares: [],
    indexes: [],

    clear() {
        this.squares = [];
        this.indexes = [];
    },
};

const colors = [
    "#3f3574",
    "#453a80",
    "#4c408d",
    "#54469b",
    "#774a97",
    "#994e92",
    "#bb528e",
    "#cc548c",
    "#dd5589",
    "#524f67",
];

export default function Board({ crossword, onFoundWord, hoverHighlightIndexes }) {
    const [selectMode, setSelectMode] = useState({ isActive: false });
    const [selectedData, setSelectedData] = useState({
        squares: [],
        indexes: [],
    });
    const [searchResult, setSearchResult] = useState({ isOk: false });
    const [colorIndex, setColorIndex] = useState(0); // turn of for testing
    // const [searchColor, setSearchColor] = useState(colors[colorIndex]); // turn off for testing
    const [searchColor, setSearchColor] = useState("#403d52"); // testing
    const [currentSelectionIndexes, setCurrentSelectionIndexes] = useState([]);
    const selectModeRef = useRef(selectMode);

    useEffect(() => {
        selectModeRef.current = selectMode;
    }, [selectMode]);

    const toggleSelectMode = () => {
        setSelectMode((selectMode) => {
            return { isActive: !selectMode.isActive };
        });
    };

    const addToCollectedData = (e, index) => {
        collectedData.squares.push(e.target.innerText);
        collectedData.indexes.push(index);
        setCurrentSelectionIndexes(collectedData.indexes.slice());
    };

    const addToCollectedDataByIndex = useCallback((index) => {
        if (collectedData.indexes.includes(index)) return;
        const letter = crossword.squares[index];
        if (letter == null) return;
        collectedData.squares.push(letter);
        collectedData.indexes.push(index);
        setCurrentSelectionIndexes(collectedData.indexes.slice());
    }, [crossword.squares]);

    useEffect(() => {
        const handleMouseDown = () => {
            toggleSelectMode();
        };

        const handleMouseUp = () => {
            toggleSelectMode();
            setCurrentSelectionIndexes([]);
            setSelectedData({
                indexes: collectedData.indexes.slice(),
                squares: collectedData.squares.slice(),
            });
            collectedData.clear();
        };

        const handleTouchStart = () => {
            toggleSelectMode();
        };

        const handleTouchEnd = () => {
            toggleSelectMode();
            setCurrentSelectionIndexes([]);
            setSelectedData({
                indexes: collectedData.indexes.slice(),
                squares: collectedData.squares.slice(),
            });
            collectedData.clear();
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("touchstart", handleTouchStart, { capture: true });
        document.addEventListener("touchend", handleTouchEnd, { capture: true });

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("touchstart", handleTouchStart, { capture: true });
            document.removeEventListener("touchend", handleTouchEnd, { capture: true });
        };
    }, []);

    const search = useCallback(() => {
        let match;

        crossword.insertedWords.find((entry) => {
            const word =
                entry.word === selectedData.squares.join("").toLowerCase();

            if (word) {
                match = entry.indexes.every((entryIndex, i) => {
                    return entryIndex === selectedData.indexes[i];
                });
            }
        });

        if (match) {
            setSearchResult({
                isOk: true,
                indexes: selectedData.indexes,
            });
            setSearchColor(prevState => prevState);
            onFoundWord();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedData, crossword, onFoundWord]);

    useEffect(() => {
        if (selectedData.squares.length) {
            search();
        }
    }, [selectedData, search]);

    useEffect(() => {
        if (searchResult.isOk) {
            setColorIndex((prevIndex) => prevIndex + 1);
        }
    }, [searchResult]);

    useEffect(() => {
        const handleTouchMove = (e) => {
            if (!selectModeRef.current.isActive || !e.changedTouches?.length) return;
            e.preventDefault();
            const touch = e.changedTouches[0];
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            const square = el?.closest?.("[data-square-index]");
            if (square) {
                const index = parseInt(square.getAttribute("data-square-index"), 10);
                if (!Number.isNaN(index)) addToCollectedDataByIndex(index);
            }
        };
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        return () => document.removeEventListener("touchmove", handleTouchMove);
    }, [addToCollectedDataByIndex]);

    const size = crossword.size;
    const gapPx = 6;
    const maxW = `calc((100dvw - 2rem - ${(size - 1) * gapPx}px) / ${size})`;
    const maxH = `calc((100dvh - 14rem - ${(size - 1) * gapPx}px) / ${size})`;
    const squareSize = `min(42px, ${maxW}, ${maxH})`;

    return (
        <div
            className="mx-auto w-fit max-w-[min(100dvw,100%)] max-h-[min(100dvh,100%)]"
            style={{ "--board-square-size": squareSize }}
        >
        <ul
            className={`grid h-fit w-fit justify-items-center gap-1.5 font-ubuntu touch-none select-none ${selectMode.isActive ? "cursor-grabbing" : "cursor-grab"}`}
            style={{
                gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
            }}
        >
            {crossword.squares.map((val, i) => (
                <Square
                    key={val + i}
                    index={i}
                    value={val}
                    isSelectMode={selectMode.isActive}
                    onSquareEnter={addToCollectedData}
                    searchResult={searchResult}
                    searchColor={searchColor}
                    isInCurrentSelection={currentSelectionIndexes.includes(i)}
                    isHoverHighlight={hoverHighlightIndexes?.includes(i)}
                />
            ))}
        </ul>
        </div>
    );
}
