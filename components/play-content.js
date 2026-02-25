"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { calcGameScore, apiBase } from "../utils";
import Memorize from "./memorize";
import Game from "./game";
import GameEnd from "./game-end/";

const DELAYS_MS = {
  memorize: { firstPart: 4000 },
  fade: 1000,
  short: 250,
  normal: 500,
  long: 1000,
};

const DEFAULT_BG = "bg-baseDark";

export default function PlayContent({ onExit, backgroundClassName = DEFAULT_BG }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [puzzle, setPuzzle] = useState(null);
  const [showUi, setShowUi] = useState({
    isMemorizeNext: true,
    isGameNext: false,
    isGameDone: false,
  });
  const [userStats, setUserStats] = useState({
    scores: { level: 0, total: 0 },
  });
  const [gameStats, setGameStats] = useState({
    level: 1,
    result: null,
    timeLeft: null,
    wordsFoundNum: null,
    isRetry: false,
  });

  const handleExit = useCallback(() => {
    if (onExit) onExit();
    else router.push("/");
  }, [onExit, router]);

  useEffect(() => {
    const handleQuitButton = (e) => {
      if (e.key === "Escape" || e.keyCode === 27) handleExit();
    };
    document.addEventListener("keydown", handleQuitButton);
    return () => document.removeEventListener("keydown", handleQuitButton);
  }, [handleExit]);

  useEffect(() => {
    fetch(`${apiBase()}/api/wordsearch/level/${gameStats.level}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) return;
        setPuzzle(data);
      });
  }, [gameStats.level]);

  useEffect(() => {
    if (!gameStats.isRetry) return;
    fetch(`${apiBase()}/api/wordsearch/level/${gameStats.level}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) return;
        setPuzzle(data);
      });
    setGameStats((prev) => ({ ...prev, isRetry: false }));
  }, [gameStats.isRetry, gameStats.level]);

  const handleMemorizeEnd = () => {
    setShowUi((ui) => ({ ...ui, isMemorizeNext: false, isGameNext: true }));
  };

  const handleGameEnd = useCallback(
    (data) => {
      setGameStats((prev) => ({
        ...prev,
        result: data.result,
        timeLeft: data.timeLeft,
        wordsFoundNum: data.wordsFoundNum,
      }));

      if (data.result === "completed") {
        const score = calcGameScore(data.wordsFoundNum, data.timeLeft);
        setUserStats((userStats) => ({
          ...userStats,
          scores: {
            level: score,
            total: userStats.scores.total + score,
          },
        }));
        if (session?.user?.id) {
          fetch(`${apiBase()}/api/scores`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              level: gameStats.level,
              score,
              timeLeft: data.timeLeft,
              wordsFound: data.wordsFoundNum,
            }),
          }).catch(() => {});
        }
      }

      setShowUi((ui) => ({ ...ui, isGameDone: true, isGameNext: false }));
    },
    [session?.user?.id, gameStats.level]
  );

  const handleNextClick = () => {
    setGameStats((prev) => ({ ...prev, level: prev.level + 1 }));
    setShowUi((ui) => ({ ...ui, isMemorizeNext: true, isGameDone: false }));
  };

  const handleRetryGame = () => {
    setGameStats((prev) => ({ ...prev, isRetry: true }));
    setShowUi({
      isMemorizeNext: true,
      isGameNext: false,
      isGameDone: false,
    });
  };

  if (!puzzle) return null;

  return (
    <>
      {showUi.isMemorizeNext && (
        <Memorize
          level={gameStats.level}
          wordsToMemorize={puzzle.insertedWords.map((d) => d.word)}
          timeToMemorize={puzzle.timeAllocation.memorize}
          onEnd={handleMemorizeEnd}
          delays={DELAYS_MS}
          backgroundClassName={backgroundClassName}
        />
      )}
      {showUi.isGameNext && (
        <Game
          crossword={puzzle}
          timeToPlay={puzzle.timeAllocation.game}
          delays={DELAYS_MS}
          onGameEnd={handleGameEnd}
          backgroundClassName={backgroundClassName}
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
          onQuitClick={handleExit}
          backgroundClassName={backgroundClassName}
        />
      )}
    </>
  );
}
