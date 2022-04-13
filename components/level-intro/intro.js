import { useState, useEffect } from 'react'

import { Memorize, Words, Timer, Level } from './elements'

export default function Intro({ onComplete }) {
  const [showMemorize, setShowMemorize] = useState(false)
  const [showLevel, setShowLevel] = useState(false)
  const [showWords, setShowWords] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    // -- showing memorize and level--
    setTimeout(() => setShowMemorize(true), 500)
    setTimeout(() => setShowLevel(true), 1000)

    // -- hiding memorize and level --
    setTimeout(() => {
      setShowMemorize(false)
      setShowLevel(false)
    }, 3500)

    // -- updating state
    setTimeout(() => setIsHidden(true), 4500)
  }, [])

  useEffect(() => {
    // -- showing words
    if (isHidden) {
      setTimeout(() => setShowWords(true), 250)
    }
  }, [isHidden])

  useEffect(() => {
    // -- hiding words
    if (showWords) {
      setTimeout(() => {
        setShowWords(false)
      }, 3000)
      setTimeout(() => {
        onComplete()
      }, 4000)
    }
  }, [showWords, onComplete])

  return (
    <>
      <div className="h-screen grid grid-rows-3 justify-center">
        <div className="row-start-2 row-end-3 place-self-center">
          {!isHidden && (
            <>
              <Memorize show={showMemorize} />
              <Level show={showLevel} />
            </>
          )}
          {isHidden && <Words show={showWords} />}
        </div>
      </div>
    </>
  )
}
