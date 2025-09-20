import clsx from "clsx";
import Image from "next/image";
import { Check } from "react-feather";
import arrowShowToLeft from "../public/arrow-show-to-left.png";
import arrowShowToRight from "../public/arrow-show-to-right.png";
import { useContext, useState } from "react";
import Button from "./Button";

export function HintLogo({ className }) {
    const [isHide, setIsHide] = useState(false);

    return isHide ? null : (
        <div className={clsx(className, "flex items-center justify-between")}>
            <img src="arrow-show-to-left.png" className="" alt="arrow to left" />
            <div className="absolute right-0 top-8 flex flex-col">
                <span className="mb-1 w-fit font-caveat text-2xl text-gold">
                    go to main menu / pressure indicator
                </span>
                <Button
                    className="min-w-[78px] h-[30px] flex border-highlight-med  items-center justify-center self-center hover:border-foam hover:bg-opacity-10 text-sm font-bold cursor-pointer bg-foam/20 hover:text-black hover:bg-foam/100 text-foam"
                    onClick={() => {
                        setIsHide(true);
                        dispatch({ type: "SET_HIDE_HINT_LOGO" });
                    }}
                >
                    ok
                    <Check size={16} className="ml-1" />
                </Button>
            </div>
        </div>
    );
}

export function HintTimer({ className }) {
    const [isHide, setIsHide] = useState(false);

    return isHide ? null : (
        <div className={clsx(className, "flex items-center justify-between")}>
            <div className="flex flex-col">
                <span className="mb-1 w-fit font-caveat text-2xl text-gold">
                    time remaining
                </span>
                <Button
                    className="min-w-[78px] h-[30px] flex border-highlight-med  items-center justify-center self-center hover:border-foam hover:bg-opacity-10 text-sm font-bold cursor-pointer bg-foam/20 hover:text-black hover:bg-foam/100 text-foam"
                    onClick={() => {
                        setIsHide(true);
                        dispatch({ type: "SET_HIDE_HINT_TIMER" });
                    }}
                >
                    ok
                    <Check size={16} className="ml-1" />
                </Button>
            </div>
            <img src="arrow-show-to-right.png" className="" alt="arrow to left" />
        </div>
    );
}
