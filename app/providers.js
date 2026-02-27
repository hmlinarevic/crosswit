"use client";

import { SessionProvider } from "next-auth/react";
import { motion } from "framer-motion";
import UserProfileProvider from "../context/UserContext";

const authBasePath = process.env.NEXT_PUBLIC_BASE_PATH
  ? `${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth`
  : undefined;

export function Providers({ children }) {
  return (
    <SessionProvider basePath={authBasePath}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <UserProfileProvider>{children}</UserProfileProvider>
      </motion.div>
    </SessionProvider>
  );
}
