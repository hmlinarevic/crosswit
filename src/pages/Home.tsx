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
      <section className="grid h-screen place-content-center">
        <Fade
          toggler={showContent}
          duration={500}
          onEnd={() => console.log("change page...")}
          className=""
        >
          <div className="flex font-righteous text-foam select-none items-center justify-center text-4xl text-rose mb-[-2px]">
            <span className="">CR</span>
            <Logo
              className="fill-love"
              style={{
                width: "32px",
                height: "auto",
                marginLeft: "2.5px",
                marginRight: "2.5px",
              }}
            />
            <span>SSWIT</span>
          </div>

          <span className="block text-center font-caveat text-xl text-love">
            Word Search & Memory Trainer
          </span>

          <div className="mx-auto mt-3 flex h-[30px] w-[200px] justify-between">
            <Button
              className="mr-2 w-full text-sm font-bold cursor-pointer bg-iris/20 hover:text-black hover:bg-iris/100 text-iris"
              onClick={() => navigate("/play")}
            >
              play
            </Button>

            <Button
              className="w-full text-sm font-bold cursor-pointer bg-iris/20 hover:text-black hover:bg-iris/100 text-iris"
              onClick={() => navigate("/about")}
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
