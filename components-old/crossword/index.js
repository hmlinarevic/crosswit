import { useState, useEffect } from "react";

import Board from "./board";
import WordInput from "./word-input";

import { puzzleString } from "../../logic/crossword/model";
import { setCurrentCrossword } from "../../logic/crossword/controller";

export default function Crossword() {
    const [puzzle, setPuzzle] = useState();

    useEffect(() => {
        const puzzle = setCurrentCrossword(puzzleString);
        setPuzzle(puzzle);
    }, []);

    const focusInputHandler = () => {
        inputRef.current.focus();
    };

    return (
        <section className="m-auto grid w-fit gap-y-10">
            {puzzle && <Board puzzle={puzzle.string} size={puzzle.size} />}
            {puzzle && <WordInput />}
        </section>
    );
}
