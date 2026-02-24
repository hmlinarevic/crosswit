import RandomWords from "../random-words/index.js"
import Placement from "./Placement.js"
import InsertWord from "./InsertWord.js"

class WordInserter {
    constructor(board, numOfWordsToInsert) {
        this.board = board
        this.numOfWordsToInsert = numOfWordsToInsert

        this.insertedWords = {
            count: 0,
            data: [],
        }
    }

    insertWords() {
        while (this.insertedWords.count < this.numOfWordsToInsert) {
            this.#attemptInsert()
        }
    }

    #attemptInsert() {
        const startSquareIndex = this.board.getRandomSquareIndex()
        const startSquareValue = this.board.readSquare(startSquareIndex)

        if (startSquareValue === null) {
            const placement = new Placement(startSquareIndex, this.board)
            const insertWord = new InsertWord(
                RandomWords.getWord(placement.maxSize)
            )

            placement.setRandomDirection(insertWord.word)

            const collisions = placement.getCollisionsData()

            if (collisions.length) {
                insertWord.tryToModify(collisions)
            }

            if (collisions.length && !insertWord.modified) {
                return this.#attemptInsert()
            }

            const wordToInsert = insertWord.modified || insertWord.word

            this.board.place(wordToInsert, placement.randomDir)

            this.#addToInsertedList({
                word: wordToInsert,
                indexes: placement.randomDir,
            })
        }
    }

    #addToInsertedList(data) {
        this.insertedWords.count++
        this.insertedWords.data.push(data)
    }
}

export default WordInserter
