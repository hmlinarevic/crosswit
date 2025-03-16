import clsx from "clsx";
import Image from "next/image";
import { Check } from "react-feather";
import Button from "./ui/button";
import arrowShowToLeft from "../public/arrow-show-to-left.png";
import arrowShowToRight from "../public/arrow-show-to-right.png";
import { useContext, useState } from "react";
import { UserProfileContext } from "../context/UserContext";

export function HintLogo({ className }) {
    const [isHide, setIsHide] = useState(false);
    const [state, dispatch] = useContext(UserProfileContext);

    return isHide ? null : (
        <div className={clsx(className, "flex items-center justify-between")}>
            <Image
                src={arrowShowToLeft}
                className=""
                alt="tutorial arrow pointing to logo"
            />
            <div className="absolute right-2 top-8 flex flex-col">
                <span className="mb-1 w-fit font-caveat text-2xl text-love">
                    go to main menu / indicator
                </span>
                <Button
                    className="min-w-[78px] flex items-center justify-center self-center hover:border-foam hover:bg-foam hover:bg-opacity-10 hover:text-foam"
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
    const [state, dispatch] = useContext(UserProfileContext);
    const [isHide, setIsHide] = useState(false);

    return isHide ? null : (
        <div className={clsx(className, "flex items-center justify-between")}>
            <div className="flex flex-col">
                <span className="mb-1 w-fit font-caveat text-2xl text-love">
                    time remaining
                </span>
                <Button
                    className="min-w-[78px] flex items-center justify-center self-center hover:border-foam hover:bg-foam hover:bg-opacity-10 hover:text-foam"
                    onClick={() => {
                        setIsHide(true);
                        dispatch({ type: "SET_HIDE_HINT_TIMER" });
                    }}
                >
                    ok
                    <Check size={16} className="ml-1" />
                </Button>
            </div>
            <Image
                src={arrowShowToRight}
                className=""
                alt="tutorial arrow pointing to logo"
            />
        </div>
    );
}
