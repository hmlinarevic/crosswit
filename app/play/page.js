"use client";

import { useRouter } from "next/navigation";
import PlayContent from "../../components/play-content";

export default function Play() {
  const router = useRouter();

  return <PlayContent onExit={() => router.push("/")} />;
}
