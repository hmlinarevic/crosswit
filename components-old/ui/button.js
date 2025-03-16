import clsx from "clsx";

export default function Button({ className: propClasses, children, onClick }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "block min-h-[32px] min-w-[96px] rounded-lg border-2 border-rose border-opacity-10 bg-rose bg-opacity-10 font-roboto text-sm tracking-wide text-rose hover:border-rose hover:font-bold hover:bg-rose hover:bg-opacity-80 hover:text-black",
                propClasses
            )}
        >
            {children}
        </button>
    );
}
