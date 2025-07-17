import { useEffect, useState } from "react"
import Fade from "../components/Fade"
import Button from "../components/Button"
import Logo from "../components/Logo"
import { useNavigate } from "react-router-dom"

function Home() {
  const [showContent, setShowContent] = useState(true)
  const navigate = useNavigate()

  return (
    <>
      <section className="dark:bg-base grid h-screen place-content-center">
        <Fade
          toggler={showContent}
          duration={500}
          onEnd={() => console.log("change page...")}
          className=""
        >
          <div className="flex font-righteous text-mint select-none items-center justify-center text-4xl text-rose mb-[-2px]">
            <span className="">CR</span>
            <Logo
              className="fill-lavender hover:fill-love transition-colors"
              style={{
                width: "32px",
                height: "auto",
                marginLeft: "2.5px",
                marginRight: "2.5px",
              }}
            />
            <span>SSWIT</span>
          </div>

          <span className="block text-center font-caveat text-xl text-lavender">
            Word Search & Memory Trainer
          </span>

          <div className="mx-auto mt-3 flex h-[30px] w-[200px] justify-between">
            <Button
              className="mr-2 w-full text-sm text-neutral-600 font-bold hover:text-neutral-400 cursor-pointer border-2 border-neutral-800 hover:border-neutral-700"
              onClick={() => navigate('/play')}
            >
              play
            </Button>

            <Button
              className="w-full text-sm text-neutral-600 font-bold  hover:text-neutral-400 cursor-pointer border-2 border-neutral-800 hover:border-neutral-700"
              onClick={() => console.log("go to about page...")}
            >
              about
            </Button>
          </div>
        </Fade>
      </section>
    </>
  )
}

export default Home
