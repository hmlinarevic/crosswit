import { NextResponse } from "next/server";
import createWordSearchLevel from "@/lib/game/word-search/index.js";
import { TIME_ALLOCATION } from "@/lib/game/word-search/config.js";

export async function GET(request, context) {
  const params = await context.params;
  const level = parseInt(params?.level, 10);

  if (!level || level < 1 || level > 10) {
    return NextResponse.json(
      { message: "Invalid level (use 1–10)" },
      { status: 400 }
    );
  }

  try {
    const { size, squares, insertedWords } = createWordSearchLevel(level);
    const timeAllocation = TIME_ALLOCATION[level];
    return NextResponse.json({
      size,
      squares,
      insertedWords,
      timeAllocation,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to generate puzzle" },
      { status: 500 }
    );
  }
}
