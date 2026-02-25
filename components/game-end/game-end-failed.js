// react
import { useState, useEffect } from "react";
// icons
import { XCircle } from "react-feather";
// components
import Fade from "../fade";
import Button from "../ui/button";

export default function GameEndFailed({
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
            <XCircle
                size={26}
                className="absolute top-[-2.25rem] left-2 right-2 mx-auto mb-1 block text-love"
            />

            {/* status */}
            <h2 className="mb-4 text-center font-caveat text-4xl text-love">{status}</h2>

            {/* total score */}
            <div className="mx-auto mb-10 w-[210px] border-b border-rose border-opacity-50 px-3 py-4 text-center">
                <span className="flex justify-between font-bold text-rose">
                    TOTAL SCORE{" "}
                    <span className="text-foam opacity-100">{totalScore}</span>
                </span>
            </div>

            {/* buttons */}
            <Button
                type="button"
                variant="muted"
                className="mx-auto mb-3 block"
                onClick={handleRetryClick}
            >
                retry
            </Button>
            <Button
                type="button"
                variant="muted"
                className="mx-auto block"
                onClick={onQuitClick}
            >
                give up
            </Button>
        </Fade>
    );
}
