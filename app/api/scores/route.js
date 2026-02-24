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
    level !== null && level >= 1 && level <= 10 ? { level } : {};

  const scores = await prisma.gameScore.findMany({
    where,
    orderBy: { score: "desc" },
    take: limit,
    include: {
      user: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  const leaderboard = scores.map((s) => ({
    id: s.id,
    score: s.score,
    level: s.level,
    timeLeft: s.timeLeft,
    wordsFound: s.wordsFound,
    createdAt: s.createdAt.toISOString(),
    user: s.user
      ? {
          id: s.user.id,
          name: s.user.name || "Anonymous",
          image: s.user.image,
        }
      : null,
  }));

  return NextResponse.json(leaderboard);
}

export async function POST(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Sign in to save your score" },
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

  const { level, score, timeLeft, wordsFound } = body ?? {};
  if (
    typeof level !== "number" ||
    level < 1 ||
    level > 10 ||
    typeof score !== "number" ||
    typeof timeLeft !== "number" ||
    typeof wordsFound !== "number"
  ) {
    return NextResponse.json(
      { message: "Invalid score data" },
      { status: 400 }
    );
  }

  const created = await prisma.gameScore.create({
    data: {
      userId: session.user.id,
      level,
      score,
      timeLeft,
      wordsFound,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
