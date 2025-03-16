import MainNavigation from "./main-navigation";

export default function Layout({ children }) {
    const headerHeight = "5rem";
    const headerMarginBottom = "6rem";

    return (
        <div>
            <header
                className="flex items-center border-b border-[#dadce0] dark:border-[#5f6368]"
                style={{
                    height: `${headerHeight}`,
                    marginBottom: `${headerMarginBottom}`,
                }}
            >
                <MainNavigation />
            </header>
            <main
                style={{
                    height: `calc(100vh - ${
                        headerHeight + headerMarginBottom
                    })`,
                }}
            >
                {children}
            </main>
        </div>
    );
}
