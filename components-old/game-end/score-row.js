import clsx from "clsx";

export default function ScoreRow({ className: propStyles, children }) {
    return (
        <div
            className={clsx(
                "flex flex-row justify-between uppercase",
                propStyles
            )}
        >
            {children}
        </div>
    );
}
