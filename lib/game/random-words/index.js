/**
 * Module dependencies.
 */

import wordsList from "./words.js"
import { getRandomNumber, selectRandomArrayElement } from "../utils.js"

/**
 * Class is responsibe for generating a single random word or a new word from
 * a partial word (e.g. ['', 'p', 'p', '', 'e'] --> ['a', 'p', 'p', 'l', 'e']).
 * All methods are static and available on the class constructor.
 */

export default class RandomWords {
    /**
     * Get random words-list array member and return it
     * @private
     */

    static #extractRandomWordFromList() {
        return wordsList[getRandomNumber(0, wordsList.length)]
    }

    /**
     * Validate maxWordLength argument provided on getWord() method.
     * Constraints are: min = 3, max = 14. (i.e. smallest and biggest word in
     * the provided words list file).
     * @private
     */

    static #validateMaxWordLengthArgument(length) {
        if (length < 3 || length > 14) {
            throw new Error(
                "invalid constrains on getWord() method - check argument length"
            )
        }
    }

    /**
     * Get one random word.
     * @public
     */

    static getWord(maxWordLength) {
        maxWordLength && this.#validateMaxWordLengthArgument(maxWordLength)

        // word length is specified
        if (maxWordLength) {
            let word

            do {
                word = this.#extractRandomWordFromList()
            } while (word.length > maxWordLength)

            return word
        }

        // word length is not specified
        return this.#extractRandomWordFromList()
    }

    /**
     * Create a new word from a partial word (i.e. from string chars and their indexes),
     * if the new word is found in the "wordsList".
     * (e.g. ['', 'p', 'p', '', 'e'] --> ['a', 'p', 'p', 'l', 'e'])
     * @public
     */

    static createWordFromPartialWord(partialWord, newWordLength) {
        // (e.g partialWord = [{ char: "p", charIndex: 1 }] or { letter, index })

        const newWords = wordsList.filter((word) => {
            if (word.length === newWordLength) {
                const hasWordSameLettersAndIndexes = partialWord.every(
                    (partial) => {
                        const ch = partial.char ?? partial.letter;
                        const idx = partial.charIndex ?? partial.index;
                        return ch === word[idx];
                    }
                )

                if (hasWordSameLettersAndIndexes) {
                    return word
                }
            }
        })

        return newWords.length ? selectRandomArrayElement(newWords) : null
    }
}
