"use client";

import { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import {
  Aperture,
  Search,
  Award,
  CheckCircle,
  LogOut,
  ArrowRight,
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

const TIPS_ITEMS = [
  {
    Icon: LogOut,
    content: (
      <>
        <span className="text-foam">Esc</span> or <span className="text-foam">swipe</span> <span className="text-foam">up</span> to exit
      </>
    ),
  },
  {
    Icon: ArrowRight,
    content: (
      <>
        <span className="text-foam">Right arrow</span> or <span className="text-foam">swipe</span> <span className="text-foam">right</span> to advance
      </>
    ),
  },
];

export default function TutorialContent({ onLetsGo, onExit }) {
  const [showContent, setShowContent] = useState(true);
  const [isHideQuickTutorial, setIsHideQuickTutorial] = useState(false);
  const [, dispatch] = useContext(UserProfileContext);

  const handleDontShowAgainButton = () =>
    setIsHideQuickTutorial((prev) => !prev);

  useEffect(() => {
    dispatch({
      type: "SET_HIDE_QUICK_TUTORIAL",
      payload: isHideQuickTutorial,
    });
  }, [dispatch, isHideQuickTutorial]);

  const handleLetsGo = () => {
    setShowContent(false);
  };

  const handleFadeEnd = () => {
    onLetsGo?.();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onExit?.();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setShowContent(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onExit]);

  return (
    <section className="flex min-h-full min-w-full flex-col bg-ink font-outfit text-text pt-[12vh] sm:pt-[14vh]">
      <Fade toggler={showContent} duration={500} onEnd={handleFadeEnd}>
        <main className="flex flex-col items-center py-8 sm:py-10">
          <p
            className="font-hand text-3xl text-iris about-cascade text-center mb-6 sm:text-4xl"
            style={{ animationDelay: "0ms", animationFillMode: "backwards" }}
          >
            How to play:
          </p>
          <ul className="text-subtle text-sm flex min-h-0 flex-col items-center justify-start mb-3 sm:text-base">
            {TUTORIAL_ITEMS.map(({ Icon, content }, i) => (
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

          <p
            className="font-hand text-3xl text-iris about-cascade text-center mt-8 mb-6 sm:text-4xl"
            style={{ animationDelay: "0ms", animationFillMode: "backwards" }}
          >
            Tips:
          </p>
          <ul className="text-subtle text-sm flex min-h-0 flex-col items-center justify-start sm:text-base">
            {TIPS_ITEMS.map(({ Icon, content }, i) => (
              <li
                key={i}
                className="about-cascade mb-3 flex items-center justify-center"
                style={{ animationDelay: "0ms", animationFillMode: "backwards" }}
              >
                {Icon === LogOut ? (
                  <span className="mr-2 flex h-7 w-12 shrink-0 items-center justify-center rounded border border-foam text-sm font-medium text-foam">
                    esc
                  </span>
                ) : (
                  <span
                    className={clsx(
                      "mr-2 flex shrink-0 items-center justify-center rounded",
                      Icon === ArrowRight && "h-7 w-12 border border-foam"
                    )}
                  >
                    <Icon
                      size={Icon === ArrowRight ? 18 : 22}
                      className="stroke-[1.5px] text-foam"
                    />
                  </span>
                )}
                <span>{content}</span>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-10 flex min-h-[52px] items-center justify-center text-sm sm:mt-12">
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
              onClick={handleLetsGo}
              className="about-cascade"
              style={{ animationDelay: "240ms", animationFillMode: "backwards" }}
            >
              let&apos;s go!
            </Button>
          </div>
        </main>
      </Fade>
    </section>
  );
}
