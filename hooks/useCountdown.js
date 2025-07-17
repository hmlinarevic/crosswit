import { useState, useEffect } from "react";

const ONE_SEC = 1000;

// clear async timers in useEffect
const timerIds = [];

export default function useCountdown(seconds, delayStart, onEnd) {
    const [secondsLeft, setSecondsLeft] = useState(seconds);

    const stopRunningTime = () => {
        timerIds.forEach((id) => clearInterval(id));
    };

    useEffect(() => {
        timerIds[0] = setTimeout(() => {
            timerIds[1] = setInterval(() => {
                setSecondsLeft((secondsLeft) => secondsLeft - 1);
            }, ONE_SEC);
        }, delayStart);

        return () => {
            timerIds.forEach((id) => clearInterval(id));
        };
    }, [delayStart]);

    useEffect(() => {
        if (secondsLeft === 0) {
            clearInterval(timerIds[1]);

            // prevent running this block again
            setSecondsLeft(null);

            // call ending function if specified
            onEnd && onEnd();
        }
    }, [secondsLeft, onEnd]);

    return [secondsLeft, stopRunningTime];
}
