"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Fade from "../components/fade";
import Button from "../components/ui/button";
import Leaderboard from "../components/leaderboard";
import brain2Png from "../public/brain2.png";
import { useTheme } from "next-themes";
import { UserProfileContext } from "../context/UserContext";

export default function Home() {
  const [showContent, setShowContent] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [state, dispatch] = useContext(UserProfileContext);
  const { data: session, status } = useSession();
  const { setTheme } = useTheme();
  const router = useRouter();

  const handlePlayClick = () => setShowContent(false);

  const changePage = () => {
    if (state.isHideQuickTutorial) router.push("/play");
    else router.push("/tutorial");
  };

  const showLeaderboardHandler = () =>
    setShowLeaderboard((prev) => !prev);

  useEffect(() => {
    setTheme("dark");
  }, [setTheme]);

  return (
    <>
      {showLeaderboard && (
        <Leaderboard onClose={showLeaderboardHandler} />
      )}
      <section className="dark:bg-base grid h-screen place-content-center">
        <Fade
          toggler={showContent}
          duration={500}
          onEnd={changePage}
          className=""
        >
          <div className="flex select-none items-center justify-center font-titilliumWeb text-4xl text-rose">
            <span className="font-righteous">CR</span>
            <Image
              src={brain2Png}
              style={{
                width: "32px",
                height: "auto",
                marginLeft: "2.5px",
                marginRight: "2.5px",
              }}
              alt="abstract brain symbol"
            />
            <span className="font-righteous">SSWIT</span>
          </div>

          <span className="block text-center font-caveat text-xl text-love">
            Word Search & Memory Trainer
          </span>

          <div className="mx-auto mt-3 flex max-w-[280px] flex-wrap justify-center gap-2">
            <Button
              className="h-auto flex-1 text-sm hover:border-rose hover:bg-rose hover:bg-opacity-10 hover:text-rose"
              onClick={handlePlayClick}
            >
              play
            </Button>
            <Button
              className="h-auto flex-1 text-sm hover:border-rose hover:bg-rose hover:bg-opacity-10 hover:text-rose"
              onClick={() => router.push("/about")}
            >
              about
            </Button>
            <Button
              className="h-auto flex-1 text-sm hover:border-rose hover:bg-rose hover:bg-opacity-10 hover:text-rose"
              onClick={showLeaderboardHandler}
            >
              leaderboard
            </Button>
            {status !== "loading" &&
              (session ? (
                <div className="flex w-full items-center justify-center gap-2">
                  <span className="text-sm text-neutral-400">
                    {session.user?.name || session.user?.email}
                  </span>
                  <Button
                    className="h-auto text-sm hover:border-rose hover:bg-rose hover:bg-opacity-10 hover:text-rose"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    sign out
                  </Button>
                </div>
              ) : (
                <Button
                  className="h-auto w-full text-sm hover:border-rose hover:bg-rose hover:bg-opacity-10 hover:text-rose"
                  onClick={() => router.push("/auth/signin")}
                >
                  sign in
                </Button>
              ))}
          </div>
        </Fade>
      </section>
    </>
  );
}
