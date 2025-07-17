import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Home"
import Play from "./pages/Play"
import GameProvider from "./contexts/GameContext"
import { useEffect } from "react"
import ErrorBoundary from "./components/ErrorBoundary"

function App() {
  useEffect(() => {
    console.log("app render")
  }, [])

  return (
    <>
      <ErrorBoundary>
        <GameProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/play" element={<Play />} />
            </Routes>
          </BrowserRouter>
        </GameProvider>
      </ErrorBoundary>
    </>
  )
}

export default App
