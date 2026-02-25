"use client";

import { Suspense, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession, signOut, signIn } from "next-auth/react";
import Fade from "../components/fade";
import Leaderboard from "../components/leaderboard";
import PlayContent from "../components/play-content";
import AboutContent from "../components/about-content";
import ProfileContent from "../components/profile-content";
import LeaderboardContent from "../components/leaderboard-content";
import TutorialContent from "../components/TutorialContent";
import { BrandLogoFromPreference, TAGLINE } from "../components/brand-header";
import { UserProfileContext } from "../context/UserContext";
import { apiBase } from "../utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FADE_DURATION = 500;

function HomeContent() {
  const [showHomeUi, setShowHomeUi] = useState(true);
  const [showPlayContent, setShowPlayContent] = useState(false);
  const [showAboutContent, setShowAboutContent] = useState(false);
  const [showTutorialContent, setShowTutorialContent] = useState(false);
  const [nextView, setNextView] = useState(null); // "play" | "about" | "tutorial" when fading out
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [mainView, setMainView] = useState("home"); // "home" | "dashboard" | "leaderboard"
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [state, dispatch] = useContext(UserProfileContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams?.get("show") === "tutorial") {
      setShowTutorialContent(true);
      setShowHomeUi(false);
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  const handlePlayClick = () => {
    if (!state?.isHideQuickTutorial) {
      setNextView("tutorial");
      setShowHomeUi(false);
      return;
    }
    setNextView("play");
    setShowHomeUi(false);
  };

  const handleAboutClick = () => {
    setNextView("about");
    setShowHomeUi(false);
  };

  const handleFadeOutEnd = () => {
    if (nextView === "play") setShowPlayContent(true);
    if (nextView === "about") setShowAboutContent(true);
    if (nextView === "tutorial") setShowTutorialContent(true);
    setNextView(null);
  };

  const handleTutorialLetsGo = () => {
    setShowTutorialContent(false);
    setShowPlayContent(true);
  };

  const handleExitPlay = () => {
    setShowPlayContent(false);
    setShowHomeUi(true);
  };

  const handleExitAbout = () => {
    setShowAboutContent(false);
    setShowHomeUi(true);
  };

  const showLeaderboardModalHandler = () =>
    setShowLeaderboardModal((prev) => !prev);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    if (authMode === "login") {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setAuthLoading(false);
      if (res?.error) {
        setAuthError("Invalid email or password");
        return;
      }
      router.refresh();
      setEmail("");
      setPassword("");
      return;
    }
    try {
      const res = await fetch(`${apiBase()}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name: username || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setAuthError(data.message || "Registration failed");
        setAuthLoading(false);
        return;
      }
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      setAuthLoading(false);
      if (signInRes?.error) {
        setAuthError("Account created. Please sign in.");
        return;
      }
      router.refresh();
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setAuthError("Something went wrong");
      setAuthLoading(false);
    }
  };

  return (
    <>
      {showLeaderboardModal && (
        <Leaderboard onClose={showLeaderboardModalHandler} />
      )}
      <section className="font-outfit dark:bg-ink mx-auto grid h-screen max-h-screen max-w-3xl grid-rows-[1fr] gap-4 overflow-hidden px-4 pt-4 sm:gap-6 sm:px-6 sm:pt-6">
        {showPlayContent ? (
          <div className="col-span-full row-span-full min-h-screen min-w-full -mx-4 -mt-4 sm:-mx-6 sm:-mt-6">
            <PlayContent onExit={handleExitPlay} backgroundClassName="dark:bg-ink" />
          </div>
        ) : showAboutContent ? (
          <div className="scrollbar-hide col-span-full row-span-full min-h-0 min-w-full overflow-y-auto overflow-x-hidden -mx-4 -mt-4 sm:-mx-6 sm:-mt-6">
            <AboutContent onExit={handleExitAbout} backgroundClassName="dark:bg-ink" />
          </div>
        ) : showTutorialContent ? (
          <div className="col-span-full row-span-full min-h-0 min-w-full -mx-4 -mt-4 sm:-mx-6 sm:-mt-6">
            <TutorialContent onLetsGo={handleTutorialLetsGo} />
          </div>
        ) : (
          <Fade
            toggler={showHomeUi}
            duration={FADE_DURATION}
            onEnd={handleFadeOutEnd}
            className="col-span-full row-span-full grid min-h-0 min-w-0 grid-rows-[auto_1fr_auto] gap-4 sm:gap-6"
          >
            {/* 1. Header with nav - fades with the rest */}
            <header className="min-w-0">
              <div className="flex flex-col gap-0">
                <BrandLogoFromPreference />
                <span className="-mt-1 block font-hand text-sm text-iris sm:text-base !text-iris">
                  {TAGLINE}
                </span>
              </div>
              <nav className="mt-4 flex w-full flex-wrap items-center justify-start gap-2 border-b border-overlay/60 pb-4 sm:gap-3 sm:pb-6" aria-label="Main">
                <Button
                  type="button"
                  variant="muted"
                  onClick={() => setMainView("home")}
                  className={`min-w-[6.5rem] border-white/10 bg-overlay/20 backdrop-blur-md hover:border-iris hover:text-iris ${mainView === "home" ? "border-iris text-iris hover:text-iris" : ""}`}
                >
                  home
                </Button>
                <Button
                  type="button"
                  variant="muted"
                  onClick={handlePlayClick}
                  className="min-w-[6.5rem] border-white/10 bg-overlay/20 backdrop-blur-md hover:border-iris hover:text-iris"
                >
                  play
                </Button>
                <Button
                  type="button"
                  variant="muted"
                  onClick={() => setMainView("dashboard")}
                  className={`min-w-[6.5rem] border-white/10 bg-overlay/20 backdrop-blur-md hover:border-iris hover:text-iris ${mainView === "dashboard" ? "border-iris text-iris hover:text-iris" : ""}`}
                >
                  dashboard
                </Button>
                <Button
                  type="button"
                  variant="muted"
                  onClick={() => setMainView("leaderboard")}
                  className={`min-w-[6.5rem] border-white/10 bg-overlay/20 backdrop-blur-md hover:border-iris hover:text-iris ${mainView === "leaderboard" ? "border-iris text-iris hover:text-iris" : ""}`}
                >
                  leaderboards
                </Button>
                <Button
                  type="button"
                  variant="muted"
                  onClick={handleAboutClick}
                  className="ml-auto min-w-[6.5rem] border-white/10 bg-overlay/20 backdrop-blur-md hover:border-iris hover:text-iris"
                >
                  about
                </Button>
              </nav>
            </header>

            {/* 2. Main content - home (login/session), about, dashboard, or leaderboard (fades when switching nav) */}
            <Fade
              key={mainView}
              toggler={true}
              duration={300}
              className="min-h-0 min-w-0 flex flex-col"
            >
            {mainView === "dashboard" ? (
              <ProfileContent />
            ) : mainView === "leaderboard" ? (
              <LeaderboardContent />
            ) : (
              <div className="flex min-h-0 w-full flex-1 items-center justify-center px-2 pt-6 sm:px-0 sm:pt-10">
          {status === "loading" ? null : session ? (
            <div className="w-full max-w-sm rounded-2xl border border-overlay/60 bg-gradient-to-br from-baseDark to-surface px-5 py-4 shadow-xl shadow-black/40">
              <p className="text-sm text-foam">
                {session.user?.name || session.user?.email}
              </p>
              <Button
                type="button"
                variant="muted"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="mt-2 text-ink hover:underline"
              >
                sign out
              </Button>
            </div>
          ) : (
            <div className="w-full max-w-xs flex min-h-[360px] flex-col rounded-xl border border-white/10 bg-overlay/20 px-4 py-4 shadow-xl shadow-black/20 backdrop-blur-md">
              {/* Tabs fixed at top - card height stays constant so cursor stays on tabs when switching */}
              <div className="shrink-0 grid grid-cols-2 gap-1 rounded-lg bg-overlay/50 p-1 w-fit" role="tablist">
                <Button
                  type="button"
                  role="tab"
                  aria-selected={authMode === "login"}
                  variant="muted"
                  onClick={() => { setAuthMode("login"); setAuthError(""); }}
                  className={
                    authMode === "login"
                      ? "border-iris/60 bg-iris/90 text-ink hover:border-iris hover:bg-iris hover:text-ink"
                      : ""
                  }
                >
                  Login
                </Button>
                <Button
                  type="button"
                  role="tab"
                  aria-selected={authMode === "register"}
                  variant="muted"
                  onClick={() => { setAuthMode("register"); setAuthError(""); }}
                  className={
                    authMode === "register"
                      ? "border-iris/60 bg-iris/90 text-ink hover:border-iris hover:bg-iris hover:text-ink"
                      : ""
                  }
                >
                  Register
                </Button>
              </div>
              <form
                onSubmit={handleAuthSubmit}
                className="mt-3 flex min-h-0 flex-1 flex-col gap-3"
              >
                {authError && (
                  <p className="text-xs text-love">
                    {authError}
                  </p>
                )}
                {authMode === "register" && (
                  <div className="space-y-1">
                    <Label htmlFor="username" className="text-iris text-xs">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your name"
                      className="h-8 border-overlay/60 bg-overlay/40 text-sm text-text placeholder:text-subtle/70 focus-visible:bg-iris/10 focus-visible:ring-iris/80 focus-visible:ring-2"
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-iris text-xs">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="h-8 border-overlay/60 bg-overlay/40 text-sm text-text placeholder:text-subtle/70 focus-visible:bg-iris/10 focus-visible:ring-iris/80 focus-visible:ring-2"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-iris text-xs">
                    Password {authMode === "register" && "(min 8)"}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={authMode === "register" ? 8 : undefined}
                    className="h-8 border-overlay/60 bg-overlay/40 text-sm text-text placeholder:text-subtle/70 focus-visible:bg-iris/10 focus-visible:ring-iris/80 focus-visible:ring-2"
                  />
                </div>
                <Button
                  type="submit"
                  variant="iris"
                  disabled={authLoading}
                  className="w-full text-ink disabled:opacity-50"
                >
                  {authLoading
                    ? authMode === "login"
                      ? "Signing in…"
                      : "Creating account…"
                    : authMode === "login"
                      ? "Sign in"
                      : "Sign up"}
                </Button>
              </form>
            </div>
          )}
              </div>
            )}
            </Fade>

            {/* 3. Footer - fades with header and main content */}
            <footer className="border-t border-overlay/60 mt-20">
              <div className="w-full py-6 sm:py-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-4">
                  <div className="min-w-0">
                    <p className="font-medium text-foam/90 text-sm">
                      Crosswit
                    </p>
                    <p className="mt-1 text-subtle/60 text-xs">
                      {TAGLINE}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1 text-right">
                    <p className="text-subtle/60 text-[11px] tracking-wide">
                      © {new Date().getFullYear()} Crosswit · All rights reserved
                    </p>
                    <a
                      href="https://millify.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-iris hover:text-iris/90 text-xs font-medium transition-colors"
                    >
                      millify.dev
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </Fade>
        )}
      </section>
    </>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="font-outfit dark:bg-ink flex min-h-screen items-center justify-center">
          <span className="text-subtle">Loading…</span>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
