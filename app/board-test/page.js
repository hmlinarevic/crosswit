"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiBase } from "../../utils";
import Board from "../../components/crossword/board";

const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function BoardTestPage() {
  const [level, setLevel] = useState(1);
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoverHighlightIndexes, setHoverHighlightIndexes] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setHoverHighlightIndexes(null);
    fetch(`${apiBase()}/api/wordsearch/level/${level}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
          setPuzzle(null);
        } else {
          setPuzzle(data);
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to load puzzle");
        setPuzzle(null);
      })
      .finally(() => setLoading(false));
  }, [level]);

  return (
    <main className="min-h-screen bg-ink font-outfit text-text">
      <header className="sticky top-0 z-10 border-b border-overlay/60 bg-ink/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
          <Link
            href="/"
            className="text-sm text-iris hover:text-iris/80"
          >
            ← Home
          </Link>
          <h1 className="text-lg font-medium text-foam">
            Phase 2 board test
          </h1>
          <nav
            className="flex flex-wrap items-center justify-end gap-1"
            aria-label="Level"
          >
            {LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                className={`min-w-[2rem] rounded px-2 py-1 text-sm font-medium transition-colors ${
                  level === l
                    ? "bg-iris text-ink"
                    : "bg-overlay/30 text-subtle hover:bg-overlay/50 hover:text-text"
                }`}
              >
                {l}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {puzzle?.insertedWords?.length > 0 && (
        <div className="border-b border-overlay/40 bg-ink/80 py-2">
          <ul className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-4 gap-y-1 px-4 text-sm text-subtle">
            {puzzle.insertedWords.map((entry, i) => (
              <li
                key={i}
                className="cursor-pointer hover:text-foam"
                onMouseEnter={() => setHoverHighlightIndexes(entry.indexes)}
                onMouseLeave={() => setHoverHighlightIndexes(null)}
              >
                {entry.word}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mx-auto flex min-h-[calc(100vh-56px)] max-w-4xl flex-col items-center justify-center gap-6 px-4 py-8">
        {loading && (
          <p className="text-subtle">Loading level {level}…</p>
        )}
        {error && (
          <p className="text-love">{error}</p>
        )}
        {!loading && puzzle && (
          <Board
            crossword={puzzle}
            onFoundWord={() => setLevel((prev) => Math.min(10, prev + 1))}
            hoverHighlightIndexes={hoverHighlightIndexes}
          />
        )}
      </div>
    </main>
  );
}
