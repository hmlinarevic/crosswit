import { useState, useEffect } from "react";

import Fade from "./Fade";
import Button from "./Button";

function ResultsFailed({
    level,
    result,
    levelScore,
    totalScore,
    onQuitClick,
    onRetryClick,
}) {
    const [showResults, setShowResults] = useState();

    const status = `level ${level} ${result}`;

    const handleRetryClick = () => {
        setShowResults(false);

        setTimeout(() => {
            onRetryClick();
        }, 500);
    };

    useEffect(() => {
        setTimeout(() => {
            setShowResults(true);
        }, 500);
    }, []);

    return (
        <Fade toggler={showResults} duration={500} className="relative">
            <span
                className="absolute top-[-2.25rem] w-[26px] h-[26px] bg-amber-400 left-2 right-2 mx-auto mb-1 block text-4xl text-love"
            />

            {/* status */}
            <h2 className="mb-6 font-caveat text-4xl text-love">{status}</h2>

            {/* buttons */}
            <Button className="mx-auto mb-3" onClick={handleRetryClick}>
                retry
            </Button>
            <Button className="mx-auto" onClick={onQuitClick}>
                quit
            </Button>
            {/* total score */}
            <div className="mt-12 text-center">
                <span className="font-bold text-rose">
                    TOTAL SCORE{" "}
                    <span className="font-bold text-love">{totalScore}</span>
                </span>
            </div>
        </Fade>
    );
}

export default ResultsFailed