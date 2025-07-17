import { useEffect, useContext } from "react"
import { GameContext } from "../contexts/GameContext"
import { fetchLevel } from "../utils/fetch"
import Memorize from "../components/Memorize"
import WordSearch from "../components/WordSearch"
import Results from "../components/Results"

interface Stats {
  result: string
  timeLeft: number
  wordsFoundNum: number
}

const DELAYS_MS = {
  memorize: { firstPart: 4000 },
  fade: 1000,
  short: 250,
  normal: 500,
  long: 1000,
}

export default function Play() {
  const game = useContext(GameContext)

  useEffect(() => {
    startLevel()
  }, [game.level])

  useEffect(() => {
    if (game.isRetry) {
      startLevel()
    }
  }, [game.isRetry])

  useEffect(() => {
    return () => {
      game.dispatch({ type: "SET_LEVEL", payload: 1 })
    }
  }, [])

  const startLevel = async () => {
    const level = await fetchLevel(game.level)
    game.dispatch({ type: "SET_RETRY", payload: false })
    game.dispatch({ type: "SET_PUZZLE", payload: level })
    game.dispatch({ type: "SET_NEXT", payload: "memorize" })
  }

  const handleMemorizeEnd = () => {
    game.dispatch({ type: "SET_NEXT", payload: "word-search" })
  }

  const handleWordSearchEnd = (stats: Stats) => {
    game.dispatch({ type: "GAME_END", payload: stats })
    game.dispatch({ type: "SET_NEXT", payload: "results" })
  }

  const handleNextClick = async () => {
    game.dispatch({ type: "INCREASE_LEVEL" })
  }

  const handleRetryClick = async () => {
    game.dispatch({ type: "SET_RETRY", payload: true })
  }

  return (
    <>
      {game.next === "memorize" && (
        <Memorize
          level={game.level}
          puzzle={game.puzzle}
          timeToMemorize={10}
          delays={DELAYS_MS}
          onEnd={handleMemorizeEnd}
        />
      )}

      {game.next === "word-search" && (
        <WordSearch
          puzzle={game.puzzle}
          timeToPlay={10}
          delays={DELAYS_MS}
          onEnd={handleWordSearchEnd}
        />
      )}

      {game.next === "results" && (
        <Results
          onNextClick={handleNextClick}
          onRetryClick={handleRetryClick}
        />
      )}
    </>
  )
}