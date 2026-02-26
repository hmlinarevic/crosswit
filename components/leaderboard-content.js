"use client";

const FAKE_LEADERBOARD = [
  { rank: 1, name: "WordMaster", level: 10, score: 2150 },
  { rank: 2, name: "PuzzlePro", level: 10, score: 1980 },
  { rank: 3, name: "BrainTeaser", level: 9, score: 1720 },
  { rank: 4, name: "Lexi", level: 9, score: 1650 },
  { rank: 5, name: "CrosswitFan", level: 8, score: 1420 },
  { rank: 6, name: "QuickFind", level: 8, score: 1380 },
  { rank: 7, name: "You", level: 7, score: 890 },
  { rank: 8, name: "NewPlayer", level: 6, score: 720 },
  { rank: 9, name: "Starter", level: 5, score: 540 },
  { rank: 10, name: "Beginner", level: 4, score: 380 },
];

export default function LeaderboardContent() {
  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-auto pt-4 font-titilliumWeb sm:pt-6 text-subtle/90">
      <h2 className="mb-3 text-base font-semibold text-white/90 sm:mb-4 sm:text-lg">
        Leaderboard
      </h2>
      <p className="mb-4 text-xs text-subtle/70 sm:mb-5 sm:text-sm">
        Top scores. Sign in and play to save yours!
      </p>
      <ul className="space-y-2 sm:space-y-2.5">
        {FAKE_LEADERBOARD.map((entry) => (
          <li
            key={entry.rank}
            className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 sm:px-4 sm:py-3 ${
              entry.name === "You"
                ? "border-pine/50 bg-pine/10"
                : "border-overlay/50 bg-overlay/30"
            }`}
          >
            <span className="w-6 shrink-0 text-xs font-medium text-subtle/80">
              #{entry.rank}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-white">
              {entry.name}
            </span>
            <span className="shrink-0 text-xs text-pine/90">
              Lv.{entry.level}
            </span>
            <span className="shrink-0 text-xs font-medium text-rose">
              {entry.score.toLocaleString()} pts
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
