import clsx from "clsx";

export default function Card({ className, children }) {
    const styles = ``;

    return (
        <>
            <div
                className={clsx(
                    "mb-8 w-full rounded-xl border p-10",
                    className
                )}
            >
                {children}
            </div>
        </>
    );
}
