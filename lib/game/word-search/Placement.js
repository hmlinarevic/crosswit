import { DIRECTIONS } from "./config.js"
import { selectRandomArrayElement } from "../utils.js"

class Placement {
    constructor(startSquareIndex, board) {
        this.startSquareIndex = startSquareIndex
        this.board = board

        this.directions = this.#getDirections()
        this.maxSize = this.#getMaxSize()
    }

    #getDirections() {
        const indexes = DIRECTIONS.reduce((obj, dir) => {
            // get increment
            const directionIncrement = this.board.navigation[dir]
            // set variable
            let squareIndex = this.startSquareIndex

            // add direction with first letter index to the obj
            obj[dir] = []

            if (dir === "N") {
                while (this.board.getRowNum(squareIndex) >= 1) {
                    obj[dir].push(squareIndex)
                    squareIndex += directionIncrement
                }
            }

            if (dir === "S") {
                while (this.board.getRowNum(squareIndex) <= this.board.size) {
                    obj[dir].push(squareIndex)
                    squareIndex += directionIncrement
                }
            }

            if (dir === "W" || dir === "E") {
                const currentRow = this.board.getRowNum(squareIndex)
                while (currentRow === this.board.getRowNum(squareIndex)) {
                    obj[dir].push(squareIndex)
                    squareIndex += directionIncrement
                }
            }

            if (dir === "NE" || dir === "SE" || dir === "SW" || dir === "NW") {
                let currentRow
                let nextRow
                do {
                    currentRow = this.board.getRowNum(squareIndex)

                    obj[dir].push(squareIndex)
                    squareIndex += directionIncrement

                    nextRow = this.board.getRowNum(squareIndex)
                } while (Math.abs(currentRow - nextRow) === 1)
            }

            return obj
        }, {})

        return indexes
    }

    setRandomDirection(insertWord) {
        const possibleDirs = this.getPossibleDirections(insertWord)
        this.randomDir = selectRandomArrayElement(Object.values(possibleDirs))
    }

    #getMaxSize() {
        let max = 0

        const directions = Object.values(this.directions)
        directions.forEach((direction) => {
            max = direction.length > max ? direction.length : max
        })

        return max
    }

    /**
     * Based on the insertWord length set possible directions (direction indexes will be the same length as the insertWord)
     * @param {string} insertWord - word to be inserted into board
     */
    getPossibleDirections(insertWord) {
        const results = {}

        for (const [dir, indexes] of Object.entries(this.directions)) {
            if (insertWord.length <= indexes.length) {
                results[dir] = indexes.slice(0, insertWord.length)
            }
        }

        return results
    }

    getCollisionsData() {
        const results = []

        this.randomDir.forEach((squareIndex, i) => {
            // var i is actuall letter index of the word we are trying to insert
            const squareValue = this.board.readSquare(squareIndex)

            if (squareValue !== null) {
                // console.log('collision!')
                const collision = { squareIndex, squareValue, letterIndex: i }

                results.push(collision)
            }
        })

        return results
    }
}

export default Placement
