import Board from "./Board.js"
import WordInserter from "./WordInserter.js"
import { loadLevelConfig } from "./config.js"

class WordSearch {
    constructor(levelNum) {
        const config = loadLevelConfig(levelNum)

        this.board = new Board(config)
        this.wordInserter = new WordInserter(this.board, config.numOfWords)

        this.insertWords()
        this.fillEmptySquares()
    }

    insertWords() {
        this.wordInserter.insertWords()
    }

    fillEmptySquares() {
        this.board.fillEmptySquares()
    }

    getSize() {
        return this.board.size
    }

    getSquares() {
        return this.board.squares
    }

    getInsertedWords() {
        return this.wordInserter.insertedWords.data
    }
}

export default WordSearch
