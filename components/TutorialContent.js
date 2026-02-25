"use client";

import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import {
  Aperture,
  Search,
  Award,
  CheckCircle,
} from "react-feather";
import { Grab } from "lucide-react";
import Fade from "./fade";
import Button from "./ui/button";
import { UserProfileContext } from "../context/UserContext";

const TUTORIAL_ITEMS = [
  {
    Icon: Aperture,
    content: (
      <>
        <span className="text-gold">Memorize</span> list of words
      </>
    ),
  },
  {
    Icon: Search,
    content: (
      <>
        <span className="text-gold">Find</span> them in the puzzle{" "}
        <span className="text-gold">before</span> timer ends
      </>
    ),
  },
  {
    Icon: Grab,
    content: (
      <>
        <span className="text-gold">Click</span> and{" "}
        <span className="text-gold">drag</span> to select a word
      </>
    ),
  },
  {
    Icon: Award,
    content: (
      <>
        <span className="text-gold">Score</span> points by <span className="text-gold">quickly</span> finding all
        the words
      </>
    ),
  },
  {
    Icon: CheckCircle,
    content: (
      <>
        <span className="text-gold">Complete</span> level 10
      </>
    ),
  },
];

export default function TutorialContent({ onLetsGo }) {
  const [showContent, setShowContent] = useState(true);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isHideQuickTutorial, setIsHideQuickTutorial] = useState(false);
  const [wobbleKey, setWobbleKey] = useState(0);
  const [, dispatch] = useContext(UserProfileContext);

  useEffect(() => {
    const t = setTimeout(() => setWobbleKey(1), 1000);
    return () => clearTimeout(t);
  }, []);

  const handleDontShowAgainButton = () =>
    setIsHideQuickTutorial((prev) => !prev);

  useEffect(() => {
    dispatch({
      type: "SET_HIDE_QUICK_TUTORIAL",
      payload: isHideQuickTutorial,
    });
  }, [dispatch, isHideQuickTutorial]);

  const allRevealed = revealedCount >= TUTORIAL_ITEMS.length;

  const handleRevealNext = () => {
    if (revealedCount < TUTORIAL_ITEMS.length) {
      setRevealedCount((c) => c + 1);
    }
  };

  const handleMainButtonClick = () => {
    if (allRevealed) {
      setShowContent(false);
    } else {
      setRevealedCount((c) => c + 1);
    }
  };

  const handleFadeEnd = () => {
    onLetsGo?.();
  };

  return (
    <section className="flex min-h-full min-w-full flex-col bg-ink font-outfit text-text pt-[28vh] sm:pt-[30vh]">
      <Fade toggler={showContent} duration={500} onEnd={handleFadeEnd}>
        <header className="text-center font-hand shrink-0">
          <h2
            className="font-hand text-4xl text-foam about-cascade"
            style={{ animationDelay: "0ms", animationFillMode: "backwards" }}
          >
            <span className="font-bold">Quick</span> Tutorial
          </h2>
          <span
            className="block text-3xl text-iris about-cascade"
            style={{ animationDelay: "120ms", animationFillMode: "backwards" }}
          >
            <button
              key={wobbleKey}
              type="button"
              onClick={handleRevealNext}
              className={clsx(
                "underline cursor-pointer hover:opacity-90 focus:outline-none rounded inline-block",
                wobbleKey > 0 && "animate-wobble"
              )}
            >
              how
            </button>{" "}
            to play
          </span>
        </header>

        <main className="flex flex-col items-center py-8 sm:py-10">
          <ul className="text-subtle flex min-h-[180px] flex-col items-center justify-start">
            {TUTORIAL_ITEMS.slice(0, revealedCount).map(({ Icon, content }, i) => (
              <li
                key={i}
                className="about-cascade mb-3 flex items-center justify-center"
                style={{ animationDelay: "0ms", animationFillMode: "backwards" }}
              >
                <Icon
                  size={22}
                  className="mr-2 stroke-[1.5px] text-gold"
                />
                <span>{content}</span>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-4 flex min-h-[52px] items-center justify-center text-sm">
            {allRevealed && (
              <>
                <Button
                  type="button"
                  variant="muted"
                  className="mr-10 flex items-center border-0 about-cascade"
                  onClick={handleDontShowAgainButton}
                  style={{ animationDelay: "240ms", animationFillMode: "backwards" }}
                >
                  <span
                    className={clsx(
                      isHideQuickTutorial ? "bg-subtle/80" : "bg-none",
                      "mr-2 h-[20px] w-[20px] rounded-lg border border-subtle/50"
                    )}
                  />
                  <span>don&apos;t show again</span>
                </Button>
                <Button
                  type="button"
                  variant="muted"
                  onClick={handleMainButtonClick}
                  className="about-cascade"
                  style={{ animationDelay: "240ms", animationFillMode: "backwards" }}
                >
                  let&apos;s go!
                </Button>
              </>
            )}
          </div>
        </main>
      </Fade>
    </section>
  );
}
