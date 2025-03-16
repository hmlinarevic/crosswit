// next
import { useRouter } from "next/router";
import Head from "next/head";
// react
import { useState, useEffect, useCallback } from "react";
// utils
import { calcGameScore } from "../utils";
// components
import Memorize from "../components/memorize";
import Game from "../components/game";
import GameEnd from "../components/game-end/";

// fade delays
const DELAYS_MS = {
    memorize: {
        firstPart: 4000,
        // firstPart: 400000, // testing
    },
    fade: 1000,
    short: 250,
    normal: 500,
    long: 1000,
};

export default function Play() {
    const router = useRouter();

    const [puzzle, setPuzzle] = useState(null);

    const [showUi, setShowUi] = useState({
        isMemorizeNext: true,
        isGameNext: false,
        isGameDone: false,
    });

    const [userStats, setUserStats] = useState({
        scores: {
            level: 0,
            total: 0,
        },
    });

    const [gameStats, setGameStats] = useState({
        level: 1,
        result: null,
        timeLeft: null,
        wordsFoundNum: null,
        isRetry: false,
    });

    useEffect(() => {
        const handleQuitButton = (e) => {
            if (e.key === "Escape" || e.keye == 27) {
                router.push("/");
            }
        };

        document.addEventListener("keydown", handleQuitButton);

        return () => {
            document.removeEventListener("keydown", handleQuitButton);
        };
    }, []);

    /**
     * Get puzzle level.
     */
    useEffect(() => {
        fetch(
            `https://wordsearchpuzzles.xyz/api/puzzle/level/${gameStats.level}`
        )
            .then((res) => res.json())
            .then((level) => setPuzzle(level));
    }, [gameStats.level]);

    /**
     * Get puzzle level (retry).
     */
    useEffect(() => {
        if (!gameStats.isRetry) return;

        fetch(
            `https://wordsearchpuzzles.xyz/api/puzzle/level/${gameStats.level}`
        )
            .then((res) => res.json())
            .then((level) => setPuzzle(level));

        setGameStats((prevState) => ({ ...prevState, isRetry: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameStats.isRetry]);

    const handleMemorizeEnd = () => {
        setShowUi((ui) => {
            return {
                ...ui,
                isMemorizeNext: false,
                isGameNext: true,
            };
        });
    };

    const handleGameEnd = useCallback((data) => {
        setGameStats((gameStats) => {
            return {
                ...gameStats,
                result: data.result,
                timeLeft: data.timeLeft,
                wordsFoundNum: data.wordsFoundNum,
            };
        });

        if (data.result === "completed") {
            const score = calcGameScore(data.wordsFoundNum, data.timeLeft);

            setUserStats((userStats) => {
                return {
                    ...userStats,
                    scores: {
                        level: score,
                        total: userStats.scores.total + score,
                    },
                };
            });
        }

        setShowUi((ui) => {
            return {
                ...ui,
                isGameDone: true,
                isGameNext: false,
            };
        });
    }, []);

    const handleNextClick = () => {
        // update level
        setGameStats((gameStats) => {
            return {
                ...gameStats,
                level: gameStats.level + 1,
            };
        });

        // mount components
        setShowUi((ui) => {
            return {
                ...ui,
                isMemorizeNext: true,
                isGameDone: false,
            };
        });
    };

    const handleRetryGame = () => {
        setGameStats((prevState) => ({
            ...prevState,
            isRetry: true,
        }));

        setShowUi((ui) => {
            return {
                ...ui,
                isMemorizeNext: true,
                isGameNext: false,
                isGameDone: false,
            };
        });
    };

    if (!puzzle) return null;

    return (
        <>
            <Head>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <title>Crosswit - Let's Play!</title>
            </Head>

            {showUi.isMemorizeNext && (
                <Memorize
                    level={gameStats.level}
                    wordsToMemorize={puzzle.insertedWords.map(
                        (data) => data.word
                    )}
                    timeToMemorize={puzzle.timeAllocation.memorize}
                    onEnd={handleMemorizeEnd}
                    delays={DELAYS_MS}
                />
            )}

            {showUi.isGameNext && (
                <Game
                    crossword={puzzle}
                    timeToPlay={puzzle.timeAllocation.game}
                    delays={DELAYS_MS}
                    onGameEnd={handleGameEnd}
                />
            )}

            {showUi.isGameDone && (
                <GameEnd
                    level={gameStats.level}
                    result={gameStats.result}
                    timeLeft={gameStats.timeLeft}
                    wordsFoundNum={gameStats.wordsFoundNum}
                    levelScore={userStats.scores.level}
                    totalScore={userStats.scores.total}
                    onNextClick={handleNextClick}
                    onRetryClick={handleRetryGame}
                />
            )}
        </>
    );
}
