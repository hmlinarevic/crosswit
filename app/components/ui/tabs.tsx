"use client";

// next
import { usePathname, useRouter } from "next/navigation";
// react
import { useEffect, useState } from "react";
// lib
import clsx from "clsx";

interface TabsProps {
    components: [string, React.ReactNode][];
}

export default function Tabs({ components }: TabsProps) {
    const [selectedTab, setSelectedTab] = useState("About");
    const [renderComponent, setRenderComponent] = useState<React.ReactNode>(null);

    const router = useRouter()
    const pathname = usePathname();
    console.log({ pathname });

    const labels = components.map((c) => c[0]);

    useEffect(() => {
        if (selectedTab) {
            const component = components.find((c) => c[0] === selectedTab);
            if (pathname === "/login") {
                router.push('/')
            }

            if (component) {
                setRenderComponent(component[1]);
            }
        } else {
            setRenderComponent(null);
        }
    }, [selectedTab]);

    useEffect(() => {
        if (pathname === "/login") {
            setSelectedTab("");
        }
    }, [pathname]);

    const handleTabSelect = (tab: string) => {
        setSelectedTab(tab);
    };

    return (
        <>
            <ul className="mt-10 flex">
                {labels.map((label, i) => (
                    <li
                        key={label}
                        className={clsx(
                            labels[i + 1] && "mr-8",
                            "cursor-pointer",
                            selectedTab === label ? "text-love" : null,
                            "text-[#333]"
                        )}
                        onClick={() => handleTabSelect(label)}
                    >
                        {label}
                    </li>
                ))}
            </ul>
            <hr className="mt-2 border-[#333]" />

            <div className="pt-5">{renderComponent}</div>
        </>
    );
}
