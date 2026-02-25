"use client";

import { SessionProvider } from "next-auth/react";
import { motion } from "framer-motion";
import UserProfileProvider from "../context/UserContext";

export function Providers({ children }) {
  return (
    <SessionProvider>
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
