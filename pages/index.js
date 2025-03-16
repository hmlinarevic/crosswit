import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Fade from "../components/fade";
import Button from "../components/ui/button";
import Leaderboard from "../components/leaderboard";
import brainPng from "../public/brainv.png";
import brain2Png from "../public/brain2.png";
import clsx from "clsx";
import { useTheme } from "next-themes";
import UserProfileProvider, {
    UserContext,
    UserProfileContext,
} from "../context/UserContext";

export default function Home() {
    const [showContent, setShowContent] = useState(true);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [state, dispatch] = useContext(UserProfileContext);

    const { theme, setTheme } = useTheme();

    const router = useRouter();

    const handlePlayClick = () => {
        setShowContent(false);
    };

    const changePage = () => {
        if (state.isHideQuickTutorial) {
            // router.push("/tutorial") // testing
            router.push("/play");
        } else {
            router.push("/tutorial");
        }
    };

    const showLeaderboardHandler = () => {
        setShowLeaderboard((prevState) => !prevState);
    };

    useEffect(() => {
        setTheme("dark");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {showLeaderboard && (
                <Leaderboard onClose={showLeaderboardHandler} />
            )}
            <Head>
                <title>Crosswit</title>
                <link rel="icon" href="/favicon.png" /> 
            </Head>

            <section className="dark:bg-base grid h-screen place-content-center">
                <Fade
                    toggler={showContent}
                    duration={500}
                    onEnd={changePage}
                    className=""
                >
                    <div className="flex select-none items-center justify-center font-titilliumWeb text-4xl text-rose">
                        <span className="font-righteous">CR</span>
                        {/* logo */}
                        <Image
                            // className="relative top-[10px]"
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
                        {"Word Search & Memory Trainer"}
                    </span>

                    {/* buttons */}
                    <div className="mx-auto mt-3 flex h-[30px] w-[200px] justify-between">
                        <Button
                            className="mr-2 h-auto w-full text-sm hover:border-rose hover:bg-rose hover:bg-opacity-10 hover:text-rose"
                            onClick={handlePlayClick}
                        >
                            play
                        </Button>

                        <Button
                            className="w-full text-sm hover:border-rose hover:bg-rose hover:bg-opacity-10 hover:text-rose"
                            onClick={() => router.push("/about")}
                        >
                            about
                        </Button>
                    </div>
                </Fade>
            </section>
        </>
    );
}
