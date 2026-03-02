import { useState } from "react";
import Link from "next/link";

import ThemeChanger from "../theme-changer";

import Logo from "../logo";
import ActivityIcon from "../icons/activity-icon";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MainNavigation(props) {
    const [showActivityDropdown, setShowActivityDropdown] = useState(false);

    const toggleActiviyDropdown = () => {
        setShowActivityDropdown((prevState) => !prevState);
    };

    return (
        <nav className="m-auto flex h-full w-4/5 items-center justify-between ">
            <Link href="/">
                <Logo width={58} height={58} fontSize="1.85rem" />
            </Link>

            <ul className="flex h-full items-stretch text-neutral-400">
                <li className=" flex h-full w-32 cursor-pointer select-none items-center justify-center hover:bg-neutral-900 hover:text-white">
                    <Link href="/new">New</Link>
                </li>
                <li
                    className="flex h-full w-32 cursor-pointer select-none items-center justify-center hover:bg-neutral-900 hover:text-white"
                    onClick={props.onSideBarToggle}
                >
                    <Link href="/about">About</Link>
                </li>
                <li className="relative flex h-full w-32 select-none items-center  justify-center transition">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={toggleActiviyDropdown}
                        className="rounded-full p-4 hover:bg-neutral-900 hover:text-white"
                    >
                        <ActivityIcon size={22} />
                    </Button>
                    {showActivityDropdown && (
                        <div className="absolute top-[100%] left-0 w-full bg-neutral-500 text-center">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Neque esse mollitia temporibus
                                eaque vero eligendi maiores quisquam impedit
                                odio itaque!
                            </p>
                        </div>
                    )}
                </li>
                <li className="ml-6 flex h-full select-none items-center justify-center">
                    <ThemeChanger className="rounded-full p-4 hover:bg-neutral-900 hover:text-white" />
                </li>
                <li className="ml-6 flex h-full select-none items-center justify-center">
                    <a
                        href="https://buymeacoffee.com/millify"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-full p-4 text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-white"
                        aria-label="Buy me a coffee"
                    >
                        <Coffee size={22} />
                        <span className="hidden sm:inline">Buy me a coffee</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
