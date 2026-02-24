"use client";

import Link from "next/link";
import {
  Aperture,
  Search,
  MousePointer,
  Award,
  CheckCircle,
} from "react-feather";
import Logo from "../../components/icons/logo";
import { useState } from "react";
import clsx from "clsx";

export default function About() {
  const [isHoverLogo, setIsHoverLogo] = useState(false);

  return (
    <section className="mx-auto min-h-[calc(100vh+100px)] w-[500px] font-roboto">
      <nav className="mt-10 flex items-center justify-between">
        <Link
          href="/"
          className="flex cursor-pointer select-none items-center justify-center font-righteous text-xl text-muted transition-colors hover:text-rose"
          onMouseEnter={() => setIsHoverLogo(true)}
          onMouseLeave={() => setIsHoverLogo(false)}
        >
          <span>CR</span>
          <Logo
            className={clsx(
              isHoverLogo ? "fill-love" : "fill-muted",
              "mx-[2px] w-[20px] transition-colors"
            )}
          />
          <span>SSWIT</span>
        </Link>
        <ul className="flex">
          <li>
            <Link href="/" className="text-muted underline hover:text-rose">
              go back
            </Link>
          </li>
        </ul>
      </nav>

      <div className="pt-12">
        <h2 className="mb-2 font-caveat text-3xl text-love">Welcome</h2>
        <p className="pl-0">Thank you for trying out the app!</p>

        <h2 className="mt-12 mb-2 font-caveat text-3xl text-love">About</h2>
        <p className="pl-0">
          <span className="text-rose">Exercise</span> parts of your brain
          responsible for <span className="text-rose">short term memory.</span>
        </p>
        <p className="mt-4 pl-0">
          Playing the game without writing the words down or taking screenshots
          will have the best effect for this type of exercise.
        </p>

        <h2 className="mt-12 mb-2 font-caveat text-3xl text-love">
          Did you know?
        </h2>
        <p className="pl-0">
          Crosswords <span className="text-rose">alleviate</span> anxiety, which
          will <span className="text-rose">improve </span>your mood.
        </p>

        <h2 className="mt-12 mb-6 font-caveat text-3xl text-love">
          How to play?
        </h2>
        <ul className="pl-7 text-neutral-200">
          <li className="mb-5 flex items-center">
            <Aperture
              size={22}
              className="mr-2 stroke-[1.5px] text-neutral-700"
            />
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
            <MousePointer
              size={22}
              className="mr-2 stroke-[1.5px] text-neutral-700"
            />
            <span>
              <span className="text-gold">Click</span> and{" "}
              <span className="text-gold">drag</span> to select a word
            </span>
          </li>
          <li className="mb-5 flex items-center">
            <Award
              size={22}
              className="mr-2 stroke-[1.5px] text-neutral-700"
            />
            <span>
              Score points by <span className="text-gold">quickly</span> finding
              all the words
            </span>
          </li>
          <li className="mb-5 flex items-center">
            <CheckCircle
              size={22}
              className="mr-2 stroke-[1.5px] text-neutral-700"
            />
            <span>
              Reach and <span className="text-gold">complete</span> level 10
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
