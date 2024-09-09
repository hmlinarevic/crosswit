// next
import Link from "next/link";
// icons
import { Aperture, Search, MousePointer, Award, CheckCircle } from "react-feather";

export default function About() {
    return (
        <>
            <section>
                {/* <h2 className="text-1xl mb-2 font-caveat font-bold uppercase tracking-widest text-love">
                    Welcome
                </h2> */}
                <p className="pl-0">Thank you for trying out the app!</p>
                <p className="mt-4">
                    If you’re interested in getting the best experience with Crosswit, be
                    sure to{" "}
                    <Link href="/" className="font-bold text-iris underline hover:bg-iris hover:text-black">
                        register
                    </Link>
                    ! This will allow you to track your{" "}
                    <span className="text-rose">progress</span> and participate in live{" "}
                    <span className="text-rose">leaderboards</span>.
                </p>

                <p className="mt-4">
                    <span className="text-rose">Exercise</span> parts of your brain
                    responsible for <span className="text-rose">short term memory.</span>
                </p>
                <h2 className="text-1xl mb-2 mt-12 font-caveat font-bold uppercase tracking-widest text-love">
                    Note
                </h2>
                <p className="pl-0">
                    Playing the game without writing the words down or taking screenshots
                    will have the best effect for this type of exercise.
                </p>

                <h2 className="text-1xl mb-2 mt-12 font-caveat font-bold uppercase tracking-widest text-love">
                    Did you know?
                </h2>
                <p className="pl-0">
                    Crosswords <span className="text-rose">alleviate</span> anxiety, which
                    will <span className="text-rose">improve </span>your mood.
                </p>

                <h2 className="text-1xl mb-6 mt-12 font-caveat font-bold uppercase tracking-widest text-love">
                    How to play?
                </h2>
                <ul className="pl-7 text-neutral-200">
                    <li className="mb-5 flex items-center">
                        <Aperture
                            size={22}
                            className="mr-2 stroke-[1.5px] text-neutral-700"
                        />
                        <span>
                            <span className="text-gold">Memorize</span> list of words
                        </span>
                    </li>
                    <li className="mb-5 flex items-center">
                        <Search
                            size={22}
                            className="mr-2 stroke-[1.5px] text-neutral-700"
                        />
                        <span>
                            <span className="text-gold">Find</span> them in the puzzle{" "}
                            <span className="text-gold">before</span> timer ends
                        </span>
                    </li>
                    <li className="mb-5 flex items-center">
                        <MousePointer
                            size={22}
                            className="mr-2 stroke-[1.5px] text-neutral-700"
                        />
                        <span>
                            <span className="text-gold">Click</span> and{" "}
                            <span className="text-gold">drag</span> to select a word
                        </span>
                    </li>
                    <li className="mb-5 flex items-center">
                        <Award
                            size={22}
                            className="mr-2 stroke-[1.5px] text-neutral-700"
                        />
                        <span>
                            Score points by <span className="text-gold">quickly</span>{" "}
                            finding all the words
                        </span>
                    </li>
                    <li className="mb-5 flex items-center">
                        <CheckCircle
                            size={22}
                            className="mr-2 stroke-[1.5px] text-neutral-700"
                        />
                        <span>
                            Reach and <span className="text-gold">complete</span> level 10
                        </span>
                    </li>
                </ul>
            </section>
        </>
    );
}
