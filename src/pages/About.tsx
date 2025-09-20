import brainPng from "../public/brainv.png"
import { Aperture, Search, MousePointer, Award, CheckCircle } from "react-feather"
import brain2Png from "../public/brain2.png"
import { useState } from "react"
import clsx from "clsx"
import Logo from "../components/Logo"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export default function About() {
  const navigate = useNavigate()
  const [isHoverLogo, setIsHoverLogo] = useState(false)

  return (
    <>
      <section className="mx-auto min-h-[calc(100vh+100px)] w-[500px] font-roboto text-text">
        <nav className="mt-10 flex items-center justify-between">
          <Link
            to="/"
            className="flex cursor-pointer select-none items-center justify-center font-righteous text-xl text-muted transition-colors hover:text-rose text-foam"
            onMouseEnter={() => setIsHoverLogo(true)}
            onMouseLeave={() => setIsHoverLogo(false)}
          >
            <span>CR</span>
            {/* logo */}
            <Logo className="mx-[2px] w-[18px]  transition-colors fill-iris" />
            <span>SSWIT</span>
          </Link>

          <ul className="flex">
            <li>
              <Link to="/" className="text-muted underline hover:text-rose">
                go back
              </Link>
            </li>
            <li className="ml-4">
              <Link to="/play" className="text-muted underline hover:text-rose">
                play
              </Link>
            </li>
          </ul>
        </nav>

        <div className="pt-12">
          <h2 className="mb-2 font-caveat text-3xl text-iris">Welcome</h2>
          <p className="pl-0">Thank you for trying out the app!</p>

          <h2 className="mt-12 mb-2 font-caveat text-3xl text-iris">About</h2>
          <p className="pl-0">
            <span className="text-rose">Exercise</span> parts of your brain responsible
            for <span className="text-rose">short term memory.</span>
          </p>
          <p className="mt-4 pl-0">
            Playing the game without writing the words down or taking screenshots will
            have the best effect for this type of exercise.
          </p>

          <h2 className="mt-12 mb-2 font-caveat text-3xl text-iris">Did you know?</h2>
          <p className="pl-0">
            Crosswords <span className="text-rose">alleviate</span> anxiety, which will{" "}
            <span className="text-rose">improve </span>your mood.
          </p>

          <h2 className="mt-12 mb-6 font-caveat text-3xl text-iris">How to play?</h2>
          <ul className="pl-7 text-neutral-200">
            <li className="mb-5 flex items-center">
              <Aperture size={22} className="mr-2 stroke-[1.5px] text-neutral-700" />
              <span>
                <span className="text-gold">Memorize</span> list of words
              </span>
            </li>
            <li className="mb-5 flex items-center">
              <Search size={22} className="mr-2 stroke-[1.5px] text-neutral-700" />
              <span>
                <span className="text-gold">Find</span> them in the puzzle{" "}
                <span className="text-gold">before</span> timer ends
              </span>
            </li>
            <li className="mb-5 flex items-center">
              <MousePointer size={22} className="mr-2 stroke-[1.5px] text-neutral-700" />
              <span>
                <span className="text-gold">Click</span> and{" "}
                <span className="text-gold">drag</span> to select a word
              </span>
            </li>
            <li className="mb-5 flex items-center">
              <Award size={22} className="mr-2 stroke-[1.5px] text-neutral-700" />
              <span>
                Score points by <span className="text-gold">quickly</span> finding all the
                words
              </span>
            </li>
            <li className="mb-5 flex items-center">
              <CheckCircle size={22} className="mr-2 stroke-[1.5px] text-neutral-700" />
              <span>
                Reach and <span className="text-gold">complete</span> level 10
              </span>
            </li>
          </ul>
        </div>
        {/* <div className="mb-40 pt-12"> */}
        {/*     <h2 className="mb-6 text-2xl text-iris font-caveat">change theme</h2> */}
        {/*     <ThemeChanger /> */}
        {/* </div> */}
      </section>
    </>
  )
}
