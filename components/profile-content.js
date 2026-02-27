"use client";

import { useSession } from "next-auth/react";

const FAKE_STATS = [
    { label: "Games played", value: "42" },
    { label: "Best level", value: "8" },
    { label: "High score", value: "1,240 pts" },
    { label: "Avg. time", value: "2m 15s" },
];

export default function ProfileContent() {
  const { data: session } = useSession();
  const displayName = session?.user?.name ?? session?.user?.email ?? "User";
  const initial = (displayName && displayName.charAt(0).toUpperCase()) || "?";

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-auto pt-4 font-titilliumWeb sm:pt-6 text-subtle/90">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5">
          <div className="h-16 w-16 shrink-0 rounded-full bg-overlay/60 flex items-center justify-center text-2xl font-righteous text-white">
            {initial}
          </div>
          <div>
            <h1 className="text-base font-semibold text-white sm:text-lg">
              {displayName}
            </h1>
            {session?.user?.email && (
              <p className="mt-0.5 text-xs text-subtle/80 sm:text-sm">
                {session.user.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-white/90 sm:mb-4">
            Stats
          </h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {FAKE_STATS.map(({ label, value }) => (
              <li
                key={label}
                className="rounded-lg border border-overlay/50 bg-overlay/30 px-3 py-2.5 sm:px-4 sm:py-3"
              >
                <p className="text-[11px] text-subtle/70 sm:text-xs">{label}</p>
                <p className="mt-0.5 text-sm font-medium text-white sm:text-base">
                  {value}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-semibold text-white/90 sm:mb-3">
            Recent activity
          </h2>
          <p className="text-xs leading-relaxed text-subtle/80 sm:text-sm">
            Your last game: <span className="text-pine">Level 7</span> — 890 pts.
            Keep playing to climb the leaderboard!
          </p>
        </div>
      </div>
    </div>
  );
}
