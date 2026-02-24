/**
 * Module dependencies.
 */

import { DIRECTIONS } from "./config.js"
import { getRandomNumber, getRandomLetter } from "../utils.js"

/**
 * Class provides different board components like squares, columns, and
 * navigation to place words.
 */

class Board {
    constructor({ size, numOfSquares, numOfWords }) {
        this.size = size
        this.numOfSquares = numOfSquares
        this.numOfWords = numOfWords

        this.navigation = this.#makeNavigation(this.size)
        this.squares = this.#makeSquares(this.numOfSquares)
    }

    #makeNavigation(levelSize) {
        return DIRECTIONS.reduce((obj, dir) => {
            switch (dir) {
                case "N":
                    obj[dir] = -levelSize
                    break
                case "S":
                    obj[dir] = +levelSize
                    break
                case "W":
                    obj[dir] = -1
                    break
                case "E":
                    obj[dir] = +1
                    break
                case "NW":
                    obj[dir] = -(levelSize + 1)
                    break
                case "NE":
                    obj[dir] = -(levelSize - 1)
                    break
                case "SW":
                    obj[dir] = +(levelSize - 1)
                    break
                case "SE":
                    obj[dir] = +(levelSize + 1)
                    break
                default:
                    throw new Error("error while creating navigation")
            }
            return obj
        }, {})
    }

    #makeSquares(numOfSquares) {
        return new Array(numOfSquares).fill(null)
    }

    fillEmptySquares() {
        this.squares.forEach((square, i) => {
            if (square === null) {
                this.squares[i] = getRandomLetter("lowercase")
            }
        })
    }

    place(word, direction) {
        word.split("").forEach((letter, i) => {
            this.squares[direction[i]] = letter
        })
    }

    getRowNum(squareIndex) {
        squareIndex += 1

        if (squareIndex <= 0 || squareIndex > this.numOfSquares) {
            return
        }

        return Math.ceil(squareIndex / this.size)
    }

    getRandomSquareIndex() {
        return getRandomNumber(0, this.numOfSquares)
    }

    readSquare(index) {
        return this.squares[index]
    }
}

/**
 * Export.
 */

export default Board
