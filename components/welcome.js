import Link from "next/link";

import Logo from "./logo";
import { Button } from "./ui/button";

export default function Welcome() {
    return (
        <div className="h-[75vh]">
            <div className="grid h-full justify-items-center">
                <div className="self-end">
                    <Logo width={74} height={74} fontSize="2.25rem" />
                    <span className="mt-[-0.5rem] block text-center font-hand text-lg">
                        The Crossword Puzzle Trainer
                    </span>
                    <Link href="/play">
                        <Button
                            type="button"
                            variant="muted"
                            className="m-auto mt-6 block self-center"
                        >
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
