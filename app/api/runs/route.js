import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(
    parseInt(searchParams.get("limit"), 10) || 20,
    100
  );
  const levelParam = searchParams.get("level");
  const level =
    levelParam !== null && levelParam !== ""
      ? parseInt(levelParam, 10)
      : null;

  const where =
    level !== null && level >= 1 ? { levelReached: { gte: level } } : {};

  const runs = await prisma.gameRun.findMany({
    where,
    orderBy: [
      { levelReached: "desc" },
      { totalTimeSpentSeconds: "asc" },
    ],
    take: limit,
    include: {
      user: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  const leaderboard = runs.map((r) => ({
    id: r.id,
    levelReached: r.levelReached,
    totalScore: r.totalScore,
    totalTimeSpentSeconds: r.totalTimeSpentSeconds,
    endedBy: r.endedBy,
    createdAt: r.createdAt.toISOString(),
    user: r.user
      ? {
          id: r.user.id,
          name: r.user.name || "Anonymous",
          image: r.user.image,
        }
      : null,
  }));

  return NextResponse.json(leaderboard);
}

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Sign in to save your run" },
      { status: 401 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON" },
      { status: 400 }
    );
  }

  const { levelReached, totalScore, totalTimeSpentSeconds, endedBy } = body ?? {};
  if (
    typeof levelReached !== "number" ||
    levelReached < 0 ||
    typeof totalScore !== "number" ||
    totalScore < 0 ||
    typeof totalTimeSpentSeconds !== "number" ||
    totalTimeSpentSeconds < 0 ||
    (endedBy !== "failed" && endedBy !== "quit")
  ) {
    return NextResponse.json(
      { message: "Invalid run data" },
      { status: 400 }
    );
  }

  const created = await prisma.gameRun.create({
    data: {
      userId: session.user.id,
      levelReached,
      totalScore,
      totalTimeSpentSeconds,
      endedBy,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
