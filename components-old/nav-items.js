export const NavAction = ({ children }) => {
    return (
        <div className="flex h-full w-32 cursor-pointer items-center justify-center transition hover:bg-[#8ab4f810]">
            {children}
        </div>
    );
};

export const NavToggle = ({ children }) => {
    return (
        <div className="ml-12 flex h-full items-center justify-center">
            {children}
        </div>
    );
};
