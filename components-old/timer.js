import { useEffect } from "react";

import clsx from "clsx";

import useCountdown from "../hooks/useCountdown";

const formatTime = (min, sec) =>
    `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;

const calcTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { minutes, seconds };
};

export default function Timer({
    className,
    seconds: totalSeconds,
    delayStart = 0,
    onTimeEnd,
   onTenSecondsLeft,
    areWordsFound,
    onWordsFoundSetTimeLeft,
}) {
    const [secondsLeft, stopRunningTime] = useCountdown(
        totalSeconds,
        delayStart,
        onTimeEnd
    );

    const time = calcTime(secondsLeft);

    useEffect(() => {
        if (areWordsFound) {
            stopRunningTime();
            onWordsFoundSetTimeLeft(secondsLeft);
        }
        return () => {
            stopRunningTime();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [areWordsFound]);

    useEffect(() => {
        if (onTenSecondsLeft && secondsLeft === 10) {
            onTenSecondsLeft();
        }
    }, [onTenSecondsLeft, secondsLeft]);

    return (
        <span className={clsx("font-ubuntuMono", className)}>
            {formatTime(time.minutes, time.seconds)}
        </span>
    );
}
