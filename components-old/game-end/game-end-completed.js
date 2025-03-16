import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";

import ScoreRow from "./score-row";
import Button from "../ui/button";
import Fade from "../fade";
import { CheckCircle } from "react-feather";

export default function GameEndCompleted({
    level,
    result,
    levelScore,
    totalScore,
    wordsFoundNum,
    timeLeft,
    onNextClick,
    onQuitClick,
}) {
    const [showResults, setShowResults] = useState();

    const handleNextClick = () => {
        setShowResults(false);

        setTimeout(() => {
            onNextClick();
        }, 500);
    };

    useEffect(() => {
        setTimeout(() => {
            setShowResults(true);
        }, 500);
    }, []);

    // e.i. "level 01 completed"
    const status = `level ${level} ${result}!`;

    return (
        <Fade toggler={showResults} duration={500} className="relative">
            {/* icon */}
            <CheckCircle size={26} className="mx-auto mb-3 block text-foam absolute top-[-2.25rem] left-2 right-2" />
            {/* status */}
            <h2 className="mb-4 text-center font-caveat text-4xl text-rose">
                {status}
            </h2>

            {/* score card */}
            <div className="mx-auto mt-4 w-[210px] border-t border-b border-rose border-opacity-50 py-4 px-3">
                <ScoreRow>
                    <span className="text-rose">words found</span>
                    <span className="text-right text-foam">
                        {wordsFoundNum}
                    </span>
                </ScoreRow>
                <ScoreRow>
                    <span className="text-rose">time left</span>
                    <span className="text-right text-foam">+ {timeLeft}</span>
                </ScoreRow>
                <ScoreRow className="">
                    <span className="text-rose">score</span>
                    <span className="text-foam">{levelScore}</span>
                </ScoreRow>
            </div>

            {/* total score */}
            <div className="mx-auto mb-10 w-[210px] border-b border-rose border-opacity-50 px-3 py-4 text-center">
                <span className="flex justify-between font-bold text-rose">
                    TOTAL SCORE{" "}
                    <span className="text-foam opacity-100">{totalScore}</span>
                </span>
            </div>

            {/* buttons */}
            <Button className="mx-auto mb-3" onClick={handleNextClick}>
                next
            </Button>
            <Button className="mx-auto" onClick={onQuitClick}>
                quit
            </Button>
        </Fade>
    );
}
