import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/profile/stats
 * Returns aggregated game stats for the current user (from GameRun and GameScore).
 */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Sign in to view your stats" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  const [runAgg, lastRun, scoreAgg] = await Promise.all([
    prisma.gameRun.aggregate({
      where: { userId },
      _count: { id: true },
      _max: { levelReached: true, totalScore: true },
      _avg: { totalTimeSpentSeconds: true },
    }),
    prisma.gameRun.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { levelReached: true, totalScore: true },
    }),
    prisma.gameScore.aggregate({
      where: { userId },
      _count: { id: true },
      _max: { score: true, level: true },
    }),
  ]);

  const gamesPlayed = runAgg._count.id ?? 0;
  const bestLevel = runAgg._max.levelReached ?? 0;
  const highScoreRun = runAgg._max.totalScore ?? 0;
  const highScoreLevel = scoreAgg._max.score ?? 0;
  const highScore = Math.max(highScoreRun, highScoreLevel);
  const avgTimeSeconds = runAgg._avg.totalTimeSpentSeconds ?? 0;
  const levelsCompleted = scoreAgg._count.id ?? 0;

  return NextResponse.json({
    gamesPlayed,
    bestLevel,
    highScore,
    avgTimeSeconds: Math.round(avgTimeSeconds),
    levelsCompleted,
    lastGame: lastRun
      ? {
          level: lastRun.levelReached,
          score: lastRun.totalScore,
        }
      : null,
  });
}
