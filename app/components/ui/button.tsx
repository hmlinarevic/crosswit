import clsx from "clsx";

interface ButtonProps {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

export default function Button({
    className: propClasses,
    children,
    onClick,
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "font-roboto block h-[32px] min-w-[96px] rounded-lg border-2 border-rose border-opacity-10 bg-rose bg-opacity-10 text-sm tracking-wide text-rose hover:border-rose hover:bg-rose hover:bg-opacity-80 hover:font-bold hover:text-black",
                propClasses
            )}
        >
            {children}
        </button>
    );
}
