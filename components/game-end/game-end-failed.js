import { useState, useEffect } from "react";

import Button from "../ui/button";
import Fade from "../fade";
import { XCircle } from "react-feather";

export default function GameEndFailed({
    level,
    result,
    levelScore,
    totalScore,
    onQuitClick,
    onRetryClick,
}) {
    const [showResults, setShowResults] = useState();

    const handleRetryClick = () => {
        setShowResults(false);
        setTimeout(() => onRetryClick(), 500);
    };

    useEffect(() => {
        const t = setTimeout(() => setShowResults(true), 500);
        return () => clearTimeout(t);
    }, []);

    return (
        <Fade toggler={showResults} duration={500} className="relative w-full max-w-sm font-outfit px-4">
            {/* Failed icon with glow - red */}
            <div className="relative mx-auto mb-2 flex w-16 h-16 items-center justify-center">
                <div
                    className="absolute inset-0 rounded-full opacity-40"
                    style={{
                        background: "radial-gradient(circle, rgba(235, 111, 146, 0.5) 0%, transparent 70%)",
                    }}
                />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-love/50 bg-love/10">
                    <XCircle size={28} className="text-love" strokeWidth={2.5} />
                </div>
            </div>

            {/* Headline - same layout as completed, status text red */}
            <p className="mb-1 text-center font-outfit text-xs uppercase tracking-widest text-iris">
                Level {level}
            </p>
            <h2 className="mb-2 text-center font-outfit text-2xl font-semibold tracking-wide text-love sm:text-3xl">
                Failed
            </h2>
            <p className="mb-2 text-center font-outfit text-sm text-subtle">
                Time ran out. Your score so far.
            </p>

            {/* Score card - same style as completed, single total row */}
            <div className="mx-auto mb-8 overflow-hidden rounded-2xl border border-iris/30 bg-surface/60 shadow-lg shadow-black/20 backdrop-blur-sm">
                <div className="px-5 py-5">
                    <div className="flex items-center justify-between gap-4 font-outfit text-xs font-medium">
                        <span className="uppercase tracking-wider text-iris">
                            Total score
                        </span>
                        <span className="text-2xl font-bold text-white tabular-nums">
                            {totalScore}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions - quit left, retry right (same order as completed) */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Button
                    type="button"
                    variant="muted"
                    className="w-full min-w-[140px] sm:w-auto"
                    onClick={onQuitClick}
                >
                    quit
                </Button>
                <Button
                    type="button"
                    variant="muted"
                    className="w-full min-w-[140px] sm:w-auto"
                    onClick={handleRetryClick}
                >
                    retry
                </Button>
            </div>
        </Fade>
    );
}
