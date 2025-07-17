import ResultsSucess from "./ResultsSuccess"
import ResultsFailed from "./ResultsFailed"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { GameContext } from "../contexts/GameContext"

type ResultsProps = {
  onNextClick: () => void
  onRetryClick: () => void
}

function Results({ onNextClick, onRetryClick }: ResultsProps) {
  const game = useContext(GameContext)
  if (!game) throw new Error("missing game context")

  const navigate = useNavigate()

  const handleQuitClick = () => {
    navigate("/")
  }

  return (
    <div className="relative grid h-screen place-content-center justify-items-center">
      {game.stats.result === "completed" && (
        <ResultsSucess
          level={game.level}
          result={game.stats.result}
          levelScore={game.levelScore}
          totalScore={game.totalScore}
          timeLeft={game.stats.timeLeft}
          wordsFoundNum={game.stats.wordsFoundNum}
          onNextClick={onNextClick}
          onQuitClick={handleQuitClick}
        />
      )}

      {game.stats.result === "failed" && (
        <ResultsFailed
          level={game.level}
          result={game.stats.result}
          levelScore={game.levelScore}
          totalScore={game.totalScore}
          onQuitClick={handleQuitClick}
          onRetryClick={onRetryClick}
        />
      )}
    </div>
  )
}

export default Results
