import { useState } from "react"
import Fade from "./components/Fade";
import Button from "./components/Button";


function App() {
  const [showContent, setShowContent] = useState(true);

  return (
    <>
      <section className="dark:bg-base grid h-screen place-content-center">
        <Fade
          toggler={showContent}
          duration={500}
          onEnd={() => console.log('change page...')}
          className=""
        >
          <div className="flex select-none items-center justify-center font-titilliumWeb text-4xl text-rose">
            <span className="font-righteous">CR</span>
            {/* logo */}
            <span className="border-1 p-8 grid place-content-center">logo here...</span>
            {/* <Image
              // className="relative top-[10px]"
              src={brain2Png}
              style={{
                width: "32px",
                height: "auto",
                marginLeft: "2.5px",
                marginRight: "2.5px",
              }}
              alt="abstract brain symbol"
            /> */}
            <span className="font-righteous">SSWIT</span>
          </div>

          <span className="block text-center font-caveat text-xl text-love">
            {"Word Search & Memory Trainer"}
          </span>

          {/* buttons */}
          <div className="mx-auto mt-3 flex h-[30px] w-[200px] justify-between">
            <Button
              className="mr-2 h-auto w-full text-sm hover:border-rose hover:bg-rose hover:bg-opacity-10 hover:text-rose"
              onClick={() => console.log('handle play click...')}
            >
              play
            </Button>

            <Button
              className="w-full text-sm hover:border-rose hover:bg-rose hover:bg-opacity-10 hover:text-rose"
              onClick={() => console.log('go to about page...')}
            >
              about
            </Button>
          </div>
        </Fade>
      </section>
    </>
  )
}

export default App
