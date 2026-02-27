import { useState, useEffect, useRef, useCallback } from "react";

import Fade from "./fade";
import Timer from "./timer";

export default function Memorize({
    level,
    wordsToMemorize,
    timeToMemorize,
    delays,
    onEnd,
    backgroundClassName = "bg-ink",
}) {
    const [showUi, setShowUi] = useState({
        memorize: null,
        level: null,
        words: null,
        timer: null,
    });
    const [isNotifyingDone, setIsNotifyingDone] = useState();
    const part1TimeoutsRef = useRef([]);
    const skipToPart2Ref = useRef(false);

    // show/hide ui - memorize, level
    useEffect(() => {
        const ids = [];

        ids[0] = setTimeout(() => {
            ids[1] = setTimeout(() => {
                setShowUi((ui) => ({ ...ui, memorize: true }));
            });
            ids[2] = setTimeout(() => {
                setShowUi((ui) => ({ ...ui, level: true }));
            }, delays.short);
            ids[3] = setTimeout(() => {
                setShowUi((ui) => ({ ...ui, memorize: false, level: false }));
            }, delays.memorize.firstPart);
            ids[4] = setTimeout(() => {
                setIsNotifyingDone(true);
            }, delays.memorize.firstPart + delays.fade);

            part1TimeoutsRef.current = [...part1TimeoutsRef.current, ids[1], ids[2], ids[3], ids[4]];
        }, 200);
        part1TimeoutsRef.current = [ids[0]];

        return () => {
            part1TimeoutsRef.current.forEach((id) => clearTimeout(id));
            part1TimeoutsRef.current = [];
        };
    }, [delays]);

    // show ui -  words, timer
    useEffect(() => {
        if (!isNotifyingDone) return;

        const ids = [];

        // delay everything
        ids[0] = setTimeout(() => {
            // show words
            ids[1] = setTimeout(() => {
                setShowUi((ui) => {
                    return { ...ui, words: true };
                });
            }, 0);

            // show timer
            ids[2] = setTimeout(() => {
                setShowUi((ui) => {
                    return { ...ui, timer: true };
                });
            }, delays.long);
            //
        }, delays.short);

        return () => {
            ids.forEach((id) => clearTimeout(id));
        };
    }, [delays, isNotifyingDone]);

    const unmountComponent = useCallback(() => {
        setShowUi((ui) => ({ ...ui, words: false, timer: false }));
        setTimeout(() => onEnd(), delays.fade);
    }, [onEnd, delays.fade]);

    // Right arrow: cycle through steps; skip to Phase 2 from timer
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key !== "ArrowRight") return;
            e.preventDefault();

            if (!isNotifyingDone) {
                skipToPart2Ref.current = false;
                setShowUi((prev) => {
                    if (!prev.memorize) return { ...prev, memorize: true };
                    if (!prev.level) return { ...prev, level: true };
                    skipToPart2Ref.current = true;
                    part1TimeoutsRef.current.forEach((id) => clearTimeout(id));
                    part1TimeoutsRef.current = [];
                    return { ...prev, words: true, timer: true };
                });
                if (skipToPart2Ref.current) setIsNotifyingDone(true);
            } else {
                setShowUi((prev) => {
                    if (!prev.words) return { ...prev, words: true };
                    if (!prev.timer) return { ...prev, timer: true };
                    unmountComponent();
                    return prev;
                });
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isNotifyingDone, level, unmountComponent]);

    return (
        <section className={`min-h-screen w-full ${backgroundClassName}`}>
            <div className="grid min-h-screen w-full place-content-center">
            {!isNotifyingDone && (
                <div className="relative min-w-[20rem] sm:min-w-[24rem] bg-transparent">
                    <Fade toggler={showUi.memorize} duration={delays.fade} className="bg-transparent">
                        <h2 className="text-center font-hand text-4xl font-medium tracking-wide text-white">
                            Memorize
                        </h2>
                    </Fade>
                    <Fade toggler={showUi.level} duration={delays.fade} className="bg-transparent">
                        <span className="-mt-1 block text-center font-hand text-lg text-iris sm:text-xl">
                            level <span className="font-bold">{level}</span>
                        </span>
                    </Fade>
                </div>
            )}

            {isNotifyingDone && (
                <>
                    <Fade
                        className="bg-transparent"
                        toggler={showUi.words}
                        duration={delays.fade}
                    >
                        <ul className="text-center">
                            {wordsToMemorize.map((word, i) => {
                                return (
                                    <li
                                        key={word + i}
                                        className="font-hand text-4xl text-white"
                                    >
                                        {word}
                                    </li>
                                );
                            })}
                        </ul>
                    </Fade>

                    <Fade
                        className="bg-transparent"
                        toggler={showUi.timer}
                        duration={delays.fade}
                    >
                        <Timer
                            className="mt-4 block text-center text-lg text-iris"
                            seconds={timeToMemorize}
                            // seconds={1000} // testing
                            delayStart={1000 + delays.fade}
                            onTimeEnd={unmountComponent}
                        />
                    </Fade>
                </>
            )}
            </div>
        </section>
    );
}
