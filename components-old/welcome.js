import Link from "next/link";

import Logo from "./logo";
import Button from "./button";

export default function Welcome() {
    return (
        <div className="h-[75vh]">
            <div className="grid h-full justify-items-center">
                <div className="self-end">
                    <Logo width={74} height={74} fontSize="2.25rem" />
                    <span className="mt-[-0.5rem] block text-center font-hand text-lg">
                        The Crossword Puzzle Trainer
                    </span>
                    <Link href="/play" passHref>
                        <Button className="m-auto mt-6  block self-center border-[#dadce0] py-3 px-8 dark:border-[#5f6368] dark:text-[#9AA0A6] dark:hover:bg-neutral-900 dark:hover:text-white">
                            play
                        </Button>
                    </Link>
                </div>
                <p className="self-end text-lg font-light text-[#9AA0A6]">
                    Did you know? Crosswords alleviate anxiety, which will
                    improve your mood.
                </p>
            </div>
        </div>
    );
}
