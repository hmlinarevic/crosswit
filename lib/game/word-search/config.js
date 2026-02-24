export const LEVELS = Object.freeze({
    1: { size: 8, numOfSquares: 64, numOfWords: 1, maxWordLength: 8 },
    2: { size: 8, numOfSquares: 64, numOfWords: 2, maxWordLength: 8 },
    3: { size: 8, numOfSquares: 64, numOfWords: 3, maxWordLength: 8 },

    4: { size: 10, numOfSquares: 100, numOfWords: 4, maxWordLength: 10 },
    5: { size: 10, numOfSquares: 100, numOfWords: 5, maxWordLength: 10 },
    6: { size: 10, numOfSquares: 100, numOfWords: 6, maxWordLength: 10 },

    7: { size: 12, numOfSquares: 144, numOfWords: 7, maxWordLength: 12 },
    8: { size: 12, numOfSquares: 144, numOfWords: 8, maxWordLength: 12 },
    9: { size: 12, numOfSquares: 144, numOfWords: 9, maxWordLength: 12 },

    10: { size: 14, numOfSquares: 156, numOfWords: 10, maxWordLength: 14 },
})

export const TIME_ALLOCATION = Object.freeze({
    // time allocation per game phase in seconds

    // memorize phase (when user memorizes words)
    // game phase (when user looks for words in the crossword)

    1: { memorize: 1, game: 30 },
    2: { memorize: 4, game: 40 },
    3: { memorize: 5, game: 50 },

    4: { memorize: 10, game: 60 },
    5: { memorize: 15, game: 80 },
    6: { memorize: 20, game: 100 },

    7: { memorize: 30, game: 130 },
    8: { memorize: 40, game: 150 },
    9: { memorize: 50, game: 170 },

    10: { memorize: 60, game: 200 },
})

export const DIRECTIONS = Object.freeze([
    "N",
    "NE",
    "E",
    "SE",
    "S",
    "SW",
    "W",
    "NW",
])

export const loadLevelConfig = (level) => LEVELS[level]
