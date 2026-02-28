"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiBase } from "../utils";

export default function LeaderboardContent() {
  const { data: session } = useSession();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`${apiBase()}/api/runs?limit=20`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load leaderboard");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setScores(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="main-content-scroll min-h-0 min-w-0 flex-1 overflow-auto pt-4 font-titilliumWeb sm:pt-6 text-subtle/90">
        <h2 className="mb-3 text-base font-semibold text-white/90 sm:mb-4 sm:text-lg">
          Leaderboard
        </h2>
        <p className="text-sm text-subtle/70">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-content-scroll min-h-0 min-w-0 flex-1 overflow-auto pt-4 font-titilliumWeb sm:pt-6 text-subtle/90">
        <h2 className="mb-3 text-base font-semibold text-white/90 sm:mb-4 sm:text-lg">
          Leaderboard
        </h2>
        <p className="text-sm text-subtle/70">{error}</p>
      </div>
    );
  }

  return (
    <div className="main-content-scroll min-h-0 min-w-0 flex-1 overflow-auto pt-4 font-titilliumWeb sm:pt-6 text-subtle/90">
      <h2 className="mb-3 text-base font-semibold text-white/90 sm:mb-4 sm:text-lg">
        Leaderboard
      </h2>
      <p className="mb-4 text-xs text-subtle/70 sm:mb-5 sm:text-sm">
        Best runs (by level reached, then fastest time). Sign in and play to save yours!
      </p>
      {scores.length === 0 ? (
        <p className="text-sm text-subtle/70">No runs yet. Be the first!</p>
      ) : (
        <ul className="space-y-2 sm:space-y-2.5">
          {scores.map((entry, index) => {
            const rank = index + 1;
            const name = entry.user?.name || "Anonymous";
            const isCurrentUser = session?.user?.id && entry.user?.id === session.user.id;
            const timeStr =
              entry.totalTimeSpentSeconds >= 60
                ? `${Math.floor(entry.totalTimeSpentSeconds / 60)}m ${entry.totalTimeSpentSeconds % 60}s`
                : `${entry.totalTimeSpentSeconds}s`;
            return (
              <li
                key={entry.id}
                className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 sm:px-4 sm:py-3 ${
                  isCurrentUser
                    ? "border-pine/50 bg-pine/10"
                    : "border-overlay/50 bg-overlay/30"
                }`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="w-6 shrink-0 text-xs font-medium text-subtle/80">
                    #{rank}
                  </span>
                  <span className="min-w-0 truncate text-sm font-medium text-white">
                    {name}
                  </span>
                </div>
                <div className="grid shrink-0 grid-cols-[4rem_5.5rem_5.5rem] items-center gap-0.5 sm:grid-cols-[4.5rem_6rem_6rem] sm:gap-1">
                  <span className="text-right text-xs text-pine/90">
                    Lv.{entry.levelReached}
                  </span>
                  <span className="text-right text-xs text-subtle/80">
                    {timeStr}
                  </span>
                  <span className="text-right text-xs font-medium text-rose">
                    {Number(entry.totalScore).toLocaleString()} pts
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
