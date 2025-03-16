import { useRouter } from "next/router";

import GameEndCompleted from "./game-end-completed";
import GameEndFailed from "./game-end-failed";

export default function GameEnd({
    level,
    result,
    levelScore,
    totalScore,
    timeLeft,
    wordsFoundNum,
    onNextClick,
    onRetryClick,
}) {
    const router = useRouter();

    const handleQuitClick = () => {
        router.push("/");
    };

    return (
        <div className="relative grid h-screen place-content-center justify-items-center font-ubuntuMono">
            {result === "completed" && (
                <GameEndCompleted
                    level={level}
                    result={result}
                    levelScore={levelScore}
                    totalScore={totalScore}
                    timeLeft={timeLeft}
                    wordsFoundNum={wordsFoundNum}
                    onNextClick={onNextClick}
                    onQuitClick={handleQuitClick}
                />
            )}

            {result === "failed" && (
                <GameEndFailed
                    level={level}
                    result={result}
                    levelScore={levelScore}
                    totalScore={totalScore}
                    onQuitClick={handleQuitClick}
                    onRetryClick={onRetryClick}
                />
            )}
        </div>
    );
}
