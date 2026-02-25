import { useState, useEffect } from "react";

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
        setTimeout(() => onNextClick(), 500);
    };

    useEffect(() => {
        const t = setTimeout(() => setShowResults(true), 500);
        return () => clearTimeout(t);
    }, []);

    return (
        <Fade toggler={showResults} duration={500} className="relative w-full max-w-sm px-4">
            {/* Success icon with glow */}
            <div className="relative mx-auto mb-2 flex w-16 h-16 items-center justify-center">
                <div
                    className="absolute inset-0 rounded-full opacity-40"
                    style={{
                        background: "radial-gradient(circle, rgba(156, 207, 216, 0.4) 0%, transparent 70%)",
                    }}
                />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-foam/50 bg-foam/10">
                    <CheckCircle size={28} className="text-foam" strokeWidth={2.5} />
                </div>
            </div>

            {/* Headline */}
            <h2 className="mb-2 text-center font-hand text-4xl font-medium tracking-wide text-foam sm:text-5xl">
                Level {level} completed!
            </h2>
            <p className="mb-2 text-center font-titilliumWeb text-sm text-subtle">
                Nice one. Here’s your score.
            </p>

            {/* Score card */}
            <div className="mx-auto mb-8 overflow-hidden rounded-2xl border border-iris/30 bg-surface/60 shadow-lg shadow-black/20 backdrop-blur-sm">
                <div className="border-b border-iris/20 px-5 py-4">
                    <div className="flex justify-between font-roboto text-xs font-medium">
                        <span className="text-subtle">Words found</span>
                        <span className="text-foam">{wordsFoundNum}</span>
                    </div>
                </div>
                <div className="border-b border-iris/20 px-5 py-4">
                    <div className="flex justify-between font-roboto text-xs font-medium">
                        <span className="text-subtle">Time left</span>
                        <span className="text-foam">+{timeLeft}</span>
                    </div>
                </div>
                <div className="border-b border-iris/20 px-5 py-4">
                    <div className="flex justify-between font-roboto text-xs font-medium">
                        <span className="text-subtle">Level score</span>
                        <span className="font-semibold text-gold">{levelScore}</span>
                    </div>
                </div>
                <div className="px-5 py-5">
                    <div className="flex items-center justify-between gap-4 font-roboto text-xs font-medium">
                        <span className="uppercase tracking-wider text-iris">
                            Total score
                        </span>
                        <span className="text-2xl font-bold text-foam tabular-nums">
                            {totalScore}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Button
                    type="button"
                    variant="muted"
                    className="w-full min-w-[140px] sm:w-auto"
                    onClick={handleNextClick}
                >
                    keep going
                </Button>
                <Button
                    type="button"
                    variant="muted"
                    className="w-full min-w-[140px] sm:w-auto"
                    onClick={onQuitClick}
                >
                    give up
                </Button>
            </div>
        </Fade>
    );
}
