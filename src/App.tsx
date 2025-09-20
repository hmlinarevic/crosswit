import { BrowserRouter, Routes, Route } from "react-router"
import GameProvider from "./contexts/GameContext"
import ErrorBoundary from "./components/ErrorBoundary"
import Home from "./pages/Home"
import Play from "./pages/Play"
import About from "./pages/About"

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <GameProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/play" element={<Play />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </BrowserRouter>
        </GameProvider>
      </ErrorBoundary>
    </>
  )
}