/**
 * App-wide utilities (game score, etc.).
 * Puzzle data comes from our API: GET /api/wordsearch/level/[level]
 */

/** Base path for API requests (e.g. /projects/crosswit in prod); use so fetch() hits same app under basePath. */
export const apiBase = () => process.env.NEXT_PUBLIC_BASE_PATH || "";

export const calcGameScore = (wordsFound, timeLeft) => +wordsFound + timeLeft;
