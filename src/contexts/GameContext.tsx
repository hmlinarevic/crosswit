import { createContext, useReducer, ReactNode } from "react"

type Stats = {
  result: null | "completed" | "failed"
  timeLeft: number
  wordsFoundNum: number
}

type Action =
  | { type: "INCREASE_LEVEL" }
  | { type: "SET_PUZZLE"; payload: any }
  | { type: "SET_NEXT"; payload: string }
  | { type: "SET_RETRY"; payload: boolean }
  | { type: "GAME_END"; payload: Stats }
  | { type: "SET_GAME_STATS_RESULT"; payload: "completed" | "failed" }

interface GameState {
  stats: Stats
  level: number
  isRetry: boolean
  totalScore: string
  levelScore: string
  puzzle: any
  isMemorizeNext: boolean
  next: string
  isGameDone: boolean
  dispatch: React.Dispatch<Action>
}
const defaultState: GameState = {
  stats: {
    result: null,
    timeLeft: 0,
    wordsFoundNum: 0,
  },
  puzzle: {},
  level: 1,
  isRetry: false,
  totalScore: "",
  levelScore: "",
  isMemorizeNext: true,
  next: "",
  isGameDone: false,
  dispatch: () => null,
}

export const GameContext = createContext<GameState>(defaultState)

function gameReducer(state: GameState, action: Action) {
  switch (action.type) {
    case "INCREASE_LEVEL":
      console.log("level increased!")
      return { ...state, level: state.level + 1 }
    case "SET_PUZZLE":
      console.log("setting puzzle", action)
      return { ...state, puzzle: action.payload }
    case "SET_RETRY":
      console.log("setting puzzle", action)
      return { ...state, isRetry: action.payload }
    case "SET_NEXT":
      return { ...state, next: action.payload }
    case "GAME_END":
      return { ...state, stats: action.payload }
    case "SET_GAME_STATS_RESULT":
      return { ...state, stats: { ...state.stats, result: action.payload } }
    default:
      return state
  }
}

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, defaultState)

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>{children}</GameContext.Provider>
  )
}

export default GameProvider
