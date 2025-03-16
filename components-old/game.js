import { useState, useEffect, useCallback, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import Fade from "./fade";
import Board from "./crossword/board";
import Timer from "./timer";
import brainPng from "../public/brain-rose.png";
import Hint, { HintLogo, HintTimer } from "./hint";
import { UserProfileContext } from "../context/UserContext";
import Logo from "./icons/logo";
import clsx from "clsx";

const timerIds = [];

export default function Game({ crossword, delays, timeToPlay, onGameEnd }) {
    const findWordsNum = crossword.insertedWords.length;

    const [showBoard, setShowBoard] = useState();
    const [showOther, setShowOther] = useState();
    const [numOfWordsToFind, setNumOfWordsToFind] = useState(findWordsNum);
    const [areWordsFound, setAreWordsFound] = useState();
    const [timeLeft, setTimeLeft] = useState();
    const [state, dispatch] = useContext(UserProfileContext);

    // colors state

    const [isFocus, setIsFocus] = useState(false);
    const [isWarning, setIsWarning] = useState(false);

    // --- fade in/out components on the page ---

    const hideGameComponents = useCallback(
        (cb) => {
            timerIds[0] = setTimeout(() => {
                setShowOther(false);
            }, delays.short);

            timerIds[1] = setTimeout(() => {
                setShowBoard(false);
            }, delays.long);

            timerIds[2] = setTimeout(() => {
                cb();
            }, delays.long + delays.fade);
        },
        [delays]
    );

    const showGameComponents = useCallback(() => {
        // when game loads (default logo and timer colors)

        timerIds[0] = setTimeout(() => {
            setShowBoard(true);
        }, delays.short);

        timerIds[1] = setTimeout(() => {
            setShowOther(true);
        }, delays.normal);

        // after game loads set focus colors (logo, timer)

        timerIds[2] = setTimeout(() => {
            setIsFocus(true);
        }, delays.short + 3000);
    }, [delays]);

    // --- handlers ---

    const handleTenSecondsLeft = () => {
        setIsFocus(false);
        setIsWarning(true);
    };

    const handleFoundWord = useCallback(() => {
        setNumOfWordsToFind((prevNum) => prevNum - 1);
    }, []);

    // when user finds all words

    const handleAllWordsFound = useCallback(() => {
        hideGameComponents(() =>
            onGameEnd({
                result: "completed",
                timeLeft,
                wordsFoundNum: findWordsNum,
            })
        );
    }, [timeLeft, onGameEnd, findWordsNum, hideGameComponents]);

    // when timer has no more seconds left

    const handleTimerEnded = () => {
        hideGameComponents(() => onGameEnd({ result: "failed" }));
    };

    // --- effects ---

    // run after inital render

    useEffect(() => {
        showGameComponents();

        return () => {
            timerIds.forEach((id) => clearInterval(id));
        };
    }, [showGameComponents]);

    // when user finds all words (numOfWordsToFind === 0)

    useEffect(() => {
        if (!numOfWordsToFind) {
            setAreWordsFound(true);
        }

        if (!numOfWordsToFind && timeLeft) {
            handleAllWordsFound();
        }
    }, [numOfWordsToFind, timeLeft, handleAllWordsFound]);

    return (
        <section className="grid h-screen place-content-center place-items-center">
            <Fade
                toggler={showOther}
                duration={delays.fade}
                className="relative"
            >
                <Link href="/" passHref>
                    <Logo
                        className={clsx(
                            isFocus
                                ? "fill-muted"
                                : isWarning
                                ? "fill-love"
                                : "fill-rose",
                            "mb-10 w-[32px] transition-colors duration-1000 hover:fill-rose hover:duration-200"
                        )}
                    />
                </Link>

                {state.isHideHintLogo ? null : (
                    <HintLogo className="absolute bottom-20 left-16 w-[320px]" />
                )}
            </Fade>
            <Fade
                toggler={showBoard}
                duration={delays.fade}
                className="self-center"
            >
                <Board crossword={crossword} onFoundWord={handleFoundWord} />
            </Fade>
            <Fade
                toggler={showOther}
                duration={delays.fade}
                className="relative mt-10 text-center"
            >
                {state.isHideHintTimer ? null : (
                    <HintTimer className="absolute top-4 right-24 w-[280px]" />
                )}
                <Timer
                    className={clsx(
                            isFocus
                                ? "text-muted"
                                : isWarning
                                ? "text-love"
                                : "text-rose",
                        "transition-colors duration-1000"
                    )}
                    seconds={timeToPlay}
                    delayStart={1000 + delays.fade}
                    onTenSecondsLeft={handleTenSecondsLeft}
                    onTimeEnd={handleTimerEnded}
                    areWordsFound={areWordsFound}
                    onWordsFoundSetTimeLeft={setTimeLeft}
                />
            </Fade>
        </section>
    );
}
