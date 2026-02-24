import WordSearch from "./WordSearch.js"

const createWordSearchLevel = (levelNum) => {
    const ws = new WordSearch(levelNum)

    const level = {
        size: ws.getSize(),
        squares: ws.getSquares(),
        insertedWords: ws.getInsertedWords(),
    }

    return level
}

export default createWordSearchLevel
