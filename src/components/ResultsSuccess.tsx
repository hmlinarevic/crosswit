import { useState, useEffect, useContext } from "react"

import Fade from "./Fade"
import Button from "./Button"
import IconCheck from "./IconCheck"
import { GameContext } from "../contexts/GameContext"

function ResultsSucess({
  level,
  result,
  levelScore,
  totalScore,
  wordsFoundNum,
  timeLeft,
  onNextClick,
  onQuitClick,
}) {
  const game = useContext(GameContext)
  const [showResults, setShowResults] = useState()

  const handleNextClick = async () => {
    setShowResults(false)

    setTimeout(() => {
      onNextClick()
    }, 500)
  }

  useEffect(() => {
    setTimeout(() => {
      setShowResults(true)
    }, 500)
  }, [])

  // e.i. "level 01 completed"
  const status = `level ${level} ${result}!`
  console.log("success")
  return (
    <Fade toggler={showResults} duration={500} className="relative">
      {/* icon */}
      <IconCheck className="stroke-green-400 block w-fit mx-auto" size={24} />
      {/* status */}
      <h2 className="mb-4 text-center font-caveat text-4xl text-rose">{status}</h2>

      {/* score card */}
      <div className="mx-auto mt-4 w-[210px] border-t border-b border-rose border-opacity-50 py-4 px-3">
        <div className="flex">
          <span className="text-rose">words found</span>
          <span className="text-right text-foam">{wordsFoundNum}</span>
        </div>
        <div className="flex">
          <span className="text-rose">time left</span>
          <span className="text-right text-foam">+ {timeLeft}</span>
        </div>
        <div className="flex">
          <span className="text-rose">score</span>
          <span className="text-foam">{levelScore}</span>
        </div>
      </div>

      {/* total score */}
      <div className="mx-auto mb-10 w-[210px] border-b border-rose border-opacity-50 px-3 py-4 text-center">
        <span className="flex justify-between font-bold text-rose">
          TOTAL SCORE <span className="text-foam opacity-100">{totalScore}</span>
        </span>
      </div>

      {/* buttons */}
      <Button className="mx-auto mb-3" onClick={handleNextClick}>
        next
      </Button>
      <Button className="mx-auto" onClick={onQuitClick}>
        quit
      </Button>
    </Fade>
  )
}

export default ResultsSucess
