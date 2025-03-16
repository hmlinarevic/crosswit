import "../styles/globals.css";

import Head from "next/head";

import { ThemeProvider } from "next-themes";

import { motion } from "framer-motion";
import UserProfileProvider from "../context/UserContext";

function MyApp({ Component, pageProps, router }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0,
					maximum-scale=1.0 , user-scalable=no"
                />
            </Head>
            <ThemeProvider attribute="class">
                <motion.div
                    key={router.route}
                    initial="pageInitial"
                    animate="pageAnimate"
                    variants={{
                        pageInitial: {
                            opacity: 0,
                        },
                        pageAnimate: {
                            opacity: 1,
                        },
                    }}
                >
                    <UserProfileProvider>
                        <Component {...pageProps} />
                    </UserProfileProvider>
                </motion.div>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
