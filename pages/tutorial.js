import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import clsx from "clsx";
import {
    Aperture,
    Search,
    MousePointer,
    Award,
    CheckCircle,
} from "react-feather";
import Fade from "../components/fade";
import Button from "../components/ui/button";
import { UserProfileContext } from "../context/UserContext";

export default function Tutorial() {
    const [showContent, setShowContent] = useState(true);
    const [isHideQuickTutorial, setIsHideQuickTutorial] = useState(false);
    const [_, dispatch] = useContext(UserProfileContext);
    const router = useRouter();

    const handleDontShowAgainButton = () => {
        setIsHideQuickTutorial((prevState) => !prevState);
    };

    useEffect(() => {
        dispatch({
            type: "SET_HIDE_QUICK_TUTORIAL",
            payload: isHideQuickTutorial,
        });
    }, [dispatch, isHideQuickTutorial]);

    const handlePlayClick = () => {
        setShowContent(false);
    };

    const changePage = () => {
        router.push("/play");
    };

    return (
        <>
            <Head>
                <title>Crosswit - Quick Tutorial</title>
            </Head>

            <section className="grid h-screen place-content-center">
                <Fade toggler={showContent} duration={500} onEnd={changePage}>
                    <header className="text-center font-caveat">
                        <span className="block text-3xl text-neutral-700">
                            1min
                        </span>
                        <h2 className="font-caveat text-5xl text-love">
                            Quick Tutorial
                        </h2>
                        <span className="block text-5xl text-rose">
                            how to play:
                        </span>
                    </header>

                    <main className="py-10">
                        <ul className="text-neutral-200">
                            <li className="mb-3 flex items-center">
                                <Aperture
                                    size={22}
                                    className="mr-2 stroke-[1.5px] text-neutral-700"
                                />
                                <span>
                                    <span className="text-gold">Memorize</span>{" "}
                                    list of words
                                </span>
                            </li>
                            <li className="mb-3 flex items-center">
                                <Search
                                    size={22}
                                    className="mr-2 stroke-[1.5px] text-neutral-700"
                                />
                                <span>
                                    <span className="text-gold">Find</span> them
                                    in the puzzle{" "}
                                    <span className="text-gold">before</span>{" "}
                                    timer ends
                                </span>
                            </li>
                            <li className="mb-3 flex items-center">
                                <MousePointer
                                    size={22}
                                    className="mr-2 stroke-[1.5px] text-neutral-700"
                                />
                                <span>
                                    <span className="text-gold">Click</span> and{" "}
                                    <span className="text-gold">drag</span> to
                                    select a word
                                </span>
                            </li>
                            <li className="mb-3 flex items-center">
                                <Award
                                    size={22}
                                    className="mr-2 stroke-[1.5px] text-neutral-700"
                                />
                                <span>
                                    Score points by{" "}
                                    <span className="text-gold">quickly</span>{" "}
                                    finding all the words
                                </span>
                            </li>
                            <li className="mb-3 flex items-center">
                                <CheckCircle
                                    size={22}
                                    className="mr-2 stroke-[1.5px] text-neutral-700"
                                />
                                <span>
                                    Reach and{" "}
                                    <span className="text-gold">complete</span>{" "}
                                    level 10
                                </span>
                            </li>
                        </ul>

                        {/* actions */}
                        <div className="mx-auto mt-8 flex items-center justify-center text-sm">
                            <button
                                className="mr-10 flex items-center px-2 py-1 text-muted"
                                onClick={handleDontShowAgainButton}
                            >
                                <span
                                    className={clsx(
                                        isHideQuickTutorial
                                            ? "bg-neutral-700"
                                            : "bg-none",
                                        "mr-2 h-[20px] w-[20px] rounded-lg border border-muted"
                                    )}
                                ></span>
                                <span>don&apos;t show again</span>
                            </button>

                            <Button
                                className="h-[30px] w-[100px] hover:border-rose hover:bg-rose hover:bg-opacity-10 hover:text-rose"
                                onClick={handlePlayClick}
                            >
                                let&apos;s go!
                            </Button>
                        </div>
                    </main>
                </Fade>
            </section>
        </>
    );
}
