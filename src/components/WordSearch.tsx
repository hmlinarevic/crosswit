import { useState, useEffect, useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Fade from "./Fade"
import Board from "./Board"
import Timer from "./Timer"
import Logo from "./Logo"
import clsx from "clsx"
import { HintLogo, HintTimer } from "./Hint"

const timerIds = []

function WordSearch({ puzzle, delays, timeToPlay, onEnd }) {
  const navigate = useNavigate()

  const findWordsNum = puzzle.insertedWords.length

  console.log("---word search render---")
  const [showBoard, setShowBoard] = useState()
  const [showOther, setShowOther] = useState()
  const [numOfWordsToFind, setNumOfWordsToFind] = useState(findWordsNum)
  const [areWordsFound, setAreWordsFound] = useState()
  const [timeLeft, setTimeLeft] = useState()

  // colors state

  const [isFocus, setIsFocus] = useState(false)
  const [isWarning, setIsWarning] = useState(false)

  // --- fade in/out components on the page ---

  const hideGameComponents = useCallback(
    (cb) => {
      timerIds[0] = setTimeout(() => {
        setShowOther(false)
      }, delays.short)

      timerIds[1] = setTimeout(() => {
        setShowBoard(false)
      }, delays.long)

      timerIds[2] = setTimeout(() => {
        cb()
      }, delays.long + delays.fade)
    },
    [delays]
  )

  const showGameComponents = useCallback(() => {
    // when game loads (default logo and timer colors)

    timerIds[0] = setTimeout(() => {
      setShowBoard(true)
    }, delays.short)

    timerIds[1] = setTimeout(() => {
      setShowOther(true)
    }, delays.normal)

    // after game loads set focus colors (logo, timer)

    timerIds[2] = setTimeout(() => {
      setIsFocus(true)
    }, delays.short + 3000)
  }, [delays])

  const handleTenSecondsLeft = () => {
    setIsFocus(false)
    setIsWarning(true)
  }

  const handleFoundWord = useCallback(() => {
    setNumOfWordsToFind((prevNum) => prevNum - 1)
  }, [])

  // when user finds all words

  const handleAllWordsFound = useCallback(() => {
    hideGameComponents(() =>
      onEnd({
        result: "completed",
        timeLeft,
        wordsFoundNum: findWordsNum,
      })
    )
  }, [timeLeft, onEnd, findWordsNum, hideGameComponents])

  // when timer has no more seconds left

  const handleTimerEnded = () => {
    hideGameComponents(() => onEnd({ result: "failed" }))
  }

  // run after inital render

  useEffect(() => {
    showGameComponents()

    return () => {
      timerIds.forEach((id) => clearInterval(id))
    }
  }, [showGameComponents])

  // when user finds all words (numOfWordsToFind === 0)

  useEffect(() => {
    if (!numOfWordsToFind) {
      setAreWordsFound(true)
    }

    if (!numOfWordsToFind && timeLeft) {
      handleAllWordsFound()
    }
  }, [numOfWordsToFind, timeLeft, handleAllWordsFound])

  return (
    <section className="grid h-screen place-content-center place-items-center">
      <Fade toggler={showOther} duration={delays.fade} className="relative">
        <a onClick={() => navigate("/")}>
          <Logo
            className={clsx(
              isFocus
                ? "fill-highlight-med"
                : isWarning
                ? "fill-love"
                : "fill-highlight-med",
              "mb-10 w-[32px] transition-colors duration-1000 hover:fill-foam hover:duration-200"
            )}
          />
        </a>

        <HintLogo className="absolute bottom-20 left-16 w-[320px]" />
      </Fade>

      <Fade toggler={showBoard} duration={delays.fade} className="self-center">
        <Board puzzle={puzzle} onFoundWord={handleFoundWord} />
      </Fade>

      <Fade
        toggler={showOther}
        duration={delays.fade}
        className="relative mt-10 text-center"
      >
        <HintTimer className="absolute top-4 right-24 w-[280px]" />
        <Timer
          className={clsx(
            isFocus
              ? "text-highlight-med"
              : isWarning
              ? "text-love"
              : "text-highlight-med",
            "transition-colors duration-1000"
          )}
          seconds={timeToPlay}
          delayStart={1000 + delays.fade}
          onTenSecondsLeft={handleTenSecondsLeft}
          onTimeEnd={handleTimerEnded}
          areWordsFound={areWordsFound}
          onWordsFoundSetTimeLeft={setTimeLeft}
        />
      </Fade>
    </section>
  )
}

export default WordSearch
