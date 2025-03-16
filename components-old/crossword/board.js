import { useState, useEffect, useCallback } from "react";

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

export default function Board({ crossword, onFoundWord }) {
    const [selectMode, setSelectMode] = useState({ isActive: false });
    const [selectedData, setSelectedData] = useState({
        squares: [],
        indexes: [],
    });
    const [searchResult, setSearchResult] = useState({ isOk: false });
    const [colorIndex, setColorIndex] = useState(0); // turn of for testing
    // const [searchColor, setSearchColor] = useState(colors[colorIndex]); // turn off for testing
    const [searchColor, setSearchColor] = useState("#403d52"); // testing

    const toggleSelectMode = () => {
        setSelectMode((selectMode) => {
            return { isActive: !selectMode.isActive };
        });
    };

    const addToCollectedData = (e, index) => {
        collectedData.squares.push(e.target.innerText);
        collectedData.indexes.push(index);
    };

    useEffect(() => {
        const handleMouseDown = () => {
            toggleSelectMode();
        };

        const handleMouseUp = () => {
            toggleSelectMode();

            setSelectedData({
                indexes: collectedData.indexes,
                squares: collectedData.squares,
            });

            collectedData.clear();
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
        };
        //
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
            // setSearchColor(colors[colorIndex]); // turn off for testing
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

    return (
        <ul
            className="mx-auto grid h-fit w-fit justify-items-center gap-1.5 font-ubuntu"
            style={{
                gridTemplateColumns: `repeat(${crossword.size}, minmax(0, 1fr))`,
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
                />
            ))}
        </ul>
    );
}
