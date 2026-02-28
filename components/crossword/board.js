import { useState, useEffect, useCallback, useRef } from "react";

import Square from "../square";

/**
 * Get indices on a straight line (H, V, or diagonal) from start toward current.
 * Snaps to one of 8 directions. Used for easier cross-line selection on mobile.
 */
function getLineIndicesFromStartToCurrent(startIdx, currentIdx, gridSize) {
    if (startIdx === currentIdx) return [startIdx];

    const r0 = Math.floor(startIdx / gridSize);
    const c0 = startIdx % gridSize;
    const r1 = Math.floor(currentIdx / gridSize);
    const c1 = currentIdx % gridSize;

    const dR = r1 - r0;
    const dC = c1 - c0;
    const stepR = dR === 0 ? 0 : dR > 0 ? 1 : -1;
    const stepC = dC === 0 ? 0 : dC > 0 ? 1 : -1;
    const step = stepC + stepR * gridSize;

    const indices = [];
    let i = startIdx;

    while (true) {
        indices.push(i);
        if (i === currentIdx) break;

        const next = i + step;
        const nr = Math.floor(next / gridSize);
        const nc = next % gridSize;

        if (nr < 0 || nr >= gridSize || nc < 0 || nc >= gridSize) break;
        if (stepR !== 0 && (stepR > 0 ? nr > r1 : nr < r1)) break;
        if (stepC !== 0 && (stepC > 0 ? nc > c1 : nc < c1)) break;

        i = next;
    }

    return indices;
}

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

    const addToCollectedData = useCallback((e, index) => {
        const size = crossword.size;
        if (collectedData.indexes.length === 0) {
            collectedData.squares.push(e.target.innerText);
            collectedData.indexes.push(index);
            setCurrentSelectionIndexes(collectedData.indexes.slice());
            return;
        }
        const startIdx = collectedData.indexes[0];
        const line = getLineIndicesFromStartToCurrent(startIdx, index, size);
        collectedData.indexes = line;
        collectedData.squares = line.map((i) => crossword.squares[i] ?? "");
        setCurrentSelectionIndexes(line);
    }, [crossword.size, crossword.squares]);

    const addToCollectedDataByIndex = useCallback((index) => {
        const size = crossword.size;
        const letter = crossword.squares[index];
        if (letter == null) return;
        if (collectedData.indexes.length === 0) {
            collectedData.squares.push(letter);
            collectedData.indexes.push(index);
            setCurrentSelectionIndexes(collectedData.indexes.slice());
            return;
        }
        const startIdx = collectedData.indexes[0];
        const line = getLineIndicesFromStartToCurrent(startIdx, index, size);
        collectedData.indexes = line;
        collectedData.squares = line.map((i) => crossword.squares[i] ?? "");
        setCurrentSelectionIndexes(line);
    }, [crossword.size, crossword.squares]);

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
