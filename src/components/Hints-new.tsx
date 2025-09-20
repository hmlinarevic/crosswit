import clsx from "clsx"
import Image from "next/image"
import { Check } from "react-feather"
import Button from "./Button"
import arrowShowToLeft from "../public/arrow-show-to-left.png"
import arrowShowToRight from "../public/arrow-show-to-right.png"
import { useContext, useState } from "react"
import { UserProfileContext } from "../context/UserContext"

export function Hints() {
  const [isHideLeftArrow, setIsHideLeftArrow] = useState(false)
  const [isHideRightArrow, setIsHideRightArrow] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
        <img
          src="/arrow-show-to-left.png"
          alt="Arrow to left"
          className="absolute right-110 top-16"
        />
        <div className="absolute right-46 top-26 flex flex-col">
          <span className="mb-1 w-fit font-caveat text-2xl text-gold">
            go to main menu / pressure indicator
          </span>
          <Button
            className="min-w-[78px] border-1 border-highlight-med text-highlight-med flex items-center justify-center self-center hover:border-foam hover:bg-opacity-10 hover:text-foam"
            onClick={() => {
              setIsHide(true)
              dispatch({ type: "SET_HIDE_HINT_LOGO" })
            }}
          >
            ok
            <Check size={16} className="ml-1" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col absolute left-72 bottom-20">
          <span className="mb-1 w-fit font-caveat text-2xl text-gold">
            time remaining
          </span>
          <Button
            className="min-w-[78px] border-1 border-highlight-med text-highlight-med flex items-center justify-center self-center hover:border-foam hover:bg-opacity-10 hover:text-foam"
            onClick={() => {
              setIsHide(true)
              dispatch({ type: "SET_HIDE_HINT_TIMER" })
            }}
          >
            ok
            <Check size={16} className="ml-1" />
          </Button>
        </div>
        <img
          src="/arrow-show-to-right.png"
          alt="Arrow to right"
          className="absolute left-110 bottom-18"
        />
      </div>
    </>
  )
}
