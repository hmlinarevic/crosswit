/**
 * App-wide utilities (game score, etc.).
 * Puzzle data comes from our API: GET /api/wordsearch/level/[level]
 */
export const calcGameScore = (wordsFound, timeLeft) => +wordsFound + timeLeft;
