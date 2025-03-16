import { useRef } from "react";

import SearchIcon from "../icons/svg/search-icon";

export default function WordInput() {
    const inputRef = useRef();

    const focusInputHandler = () => {
        inputRef.current.focus();
    };

    return (
        <div
            className="flex rounded-full border border-[#dadce0] py-4 px-6 text-[#5f6368] dark:border-[#5f6368] dark:text-[#e8eaed]"
            onClick={focusInputHandler}
        >
            <SearchIcon
                size={20}
                className="mr-3 flex items-center text-inherit"
            />
            <input
                className="w-full bg-inherit caret-[#1a73e8] placeholder:transition-colors  focus:outline-none placeholder:focus:text-[#1a73e8] dark:caret-blue-300 dark:placeholder:focus:text-blue-300"
                ref={inputRef}
                type="text"
                placeholder="Search here"
            />
        </div>
    );
}
