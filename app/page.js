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
import { BrandLogo, TAGLINE } from "../components/brand-header";
import { UserProfileContext } from "../context/UserContext";
import { apiBase } from "../utils";
import { Menu, X } from "lucide-react";
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
  const [mainView, setMainView] = useState("dashboard"); // "dashboard" | "leaderboard"
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
    if (!state?.isHideQuickTutorial) {
      setNextView("tutorial");
      setShowHomeUi(false);
      return;
    }
    setNextView("play");
    setShowHomeUi(false);
  };

  const handleAboutClick = () => {
    setMobileMenuOpen(false);
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

  const scrollInputIntoView = (e) => {
    const el = e.target;
    const isMobile = typeof window !== "undefined" && (
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768
    );
    if (isMobile) {
      setTimeout(
        () => el.scrollIntoView({ block: "center", behavior: "smooth" }),
        200
      );
    }
  };

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
      {/* Layout height: this section defines the content area height. Single row (1fr) fills viewport on mobile; inner flex (header | content | footer) splits it, middle has flex-1 to expand. */}
      <section className="font-outfit bg-ink mx-auto grid h-screen max-h-screen min-h-0 max-w-3xl grid-rows-[1fr] gap-4 overflow-hidden px-4 pt-4 sm:h-auto sm:min-h-screen sm:max-h-none sm:overflow-visible sm:gap-6 sm:px-6 sm:pt-6">
        {showPlayContent ? (
          <div className="col-span-full row-span-full min-h-screen min-w-full -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 bg-ink">
            <PlayContent onExit={handleExitPlay} backgroundClassName="bg-ink" />
          </div>
        ) : showAboutContent ? (
          <div className="scrollbar-hide col-span-full row-span-full min-h-0 min-w-full overflow-y-auto overflow-x-hidden -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 bg-ink">
            <AboutContent onExit={handleExitAbout} backgroundClassName="bg-ink" />
          </div>
        ) : showTutorialContent ? (
          <div className="col-span-full row-span-full min-h-0 min-w-full -mx-4 -mt-4 sm:-mx-6 sm:-mt-6 bg-ink">
            <TutorialContent onLetsGo={handleTutorialLetsGo} onExit={() => { setShowTutorialContent(false); setShowHomeUi(true); }} />
          </div>
        ) : (
          <Fade
            toggler={showHomeUi}
            duration={FADE_DURATION}
            onEnd={handleFadeOutEnd}
            className="col-span-full row-span-full flex h-full min-h-0 min-w-0 flex-col gap-4 sm:gap-6"
          >
            {/* 1. Header with nav - fades with the rest */}
            <header className="min-w-0 shrink-0 max-w-sm w-full mx-auto sm:max-w-none">
              <div className="flex items-center justify-between gap-4 sm:block">
                <div className="flex flex-col gap-0 min-w-0">
                  <BrandLogo fontClass="font-audiowide" rightText="SSWiT" colorClass="text-foam" iconColorClass="text-iris" />
                  <span className="-mt-1 block font-hand text-sm text-iris sm:text-base !text-iris">
                    {TAGLINE}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen((o) => !o)}
                  className="shrink-0 p-2 -m-2 text-subtle hover:text-white transition-colors sm:hidden"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileMenuOpen}
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
              {/* Desktop nav */}
              <nav className="mt-4 hidden w-full flex-wrap items-center justify-start gap-x-6 gap-y-2 sm:flex sm:gap-x-8" aria-label="Main">
                <button
                  type="button"
                  onClick={handlePlayClick}
                  className="text-subtle/90 underline-offset-4 hover:text-white hover:underline transition-colors"
                >
                  play
                </button>
                <button
                  type="button"
                  onClick={() => setMainView("dashboard")}
                  className={`underline-offset-4 hover:underline transition-colors ${mainView === "dashboard" ? "text-white font-medium" : "text-subtle/90 hover:text-white"}`}
                >
                  dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setMainView("leaderboard")}
                  className={`underline-offset-4 hover:underline transition-colors ${mainView === "leaderboard" ? "text-white font-medium" : "text-subtle/90 hover:text-white"}`}
                >
                  leaderboards
                </button>
                <button
                  type="button"
                  onClick={handleAboutClick}
                  className="text-subtle/90 underline-offset-4 hover:text-white hover:underline transition-colors"
                >
                  about
                </button>
              </nav>
              {/* Mobile nav dropdown - always in DOM for height transition so content below animates */}
              <div
                className={`mobile-nav-wrapper overflow-hidden sm:hidden ${mobileMenuOpen ? "max-h-[220px]" : "max-h-0"}`}
                aria-hidden={!mobileMenuOpen}
              >
                <nav className="animate-mobile-menu-in mt-4 flex flex-col items-end gap-1 border-t border-overlay/40 pt-4" aria-label="Main">
                  <button type="button" onClick={handlePlayClick} className="w-full py-2 text-right text-subtle/90 hover:text-white underline-offset-4 hover:underline transition-colors">play</button>
                  <button type="button" onClick={() => { setMainView("dashboard"); setMobileMenuOpen(false); }} className={`w-full py-2 text-right underline-offset-4 hover:underline transition-colors ${mainView === "dashboard" ? "text-white font-medium" : "text-subtle/90 hover:text-white"}`}>dashboard</button>
                  <button type="button" onClick={() => { setMainView("leaderboard"); setMobileMenuOpen(false); }} className={`w-full py-2 text-right underline-offset-4 hover:underline transition-colors ${mainView === "leaderboard" ? "text-white font-medium" : "text-subtle/90 hover:text-white"}`}>leaderboards</button>
                  <button type="button" onClick={handleAboutClick} className="w-full py-2 text-right text-subtle/90 hover:text-white underline-offset-4 hover:underline transition-colors">about</button>
                </nav>
              </div>
              <hr className="mt-4 border-0 border-b border-overlay/40 -mx-4 sm:-mx-6" />
            </header>

            {/* 2. Main content - dashboard (login form or profile), leaderboard (fades when switching nav) */}
            <Fade
              key={mainView}
              toggler={true}
              duration={300}
              className="min-h-0 flex-1 flex flex-col overflow-hidden max-w-sm w-full mx-auto sm:max-w-none"
            >
            {mainView === "leaderboard" ? (
              <LeaderboardContent />
            ) : (
              <>
            {status === "loading" ? null : session ? (
              <ProfileContent />
            ) : (
              <div className="main-content-scroll flex min-h-0 w-full flex-1 flex-col items-center gap-8 overflow-auto pt-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10 sm:pt-10">
            {/* Intro text for signed-out users */}
            <div className="order-1 max-w-sm shrink-0 sm:max-w-[320px] sm:pt-2">
              <h2 className="font-semibold text-xl text-white sm:text-2xl">
                Sharpen your mind
              </h2>
              <p className="mt-2 text-white/75 leading-relaxed">
                Crosswit trains your <span className="text-iris font-semibold">short-term memory</span> and{" "}
                <span className="text-iris font-semibold">visual search</span> by having you memorize words, then find them in a puzzle under time pressure. Regular play can improve recall, focus, and pattern recognition.
              </p>
              <p className="mt-3 text-sm text-subtle/70 leading-relaxed">
                You can play without signing in—create an account to save your progress and climb the leaderboards.
              </p>
              <p className="mt-4 text-subtle/70 text-sm">
                If Crosswit has helped sharpen your memory or become part of your mental fitness, consider supporting its development.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_BUY_ME_A_COFFEE_URL || "https://buymeacoffee.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block buy-me-coffee-link cursor-pointer"
                aria-label="Buy me a coffee"
              >
                <img
                  src={`${apiBase()}/bmc-button.png`}
                  alt="Buy me a coffee"
                  className="h-9 w-auto object-contain rounded-lg sm:h-12"
                />
              </a>
            </div>

            <div className="order-2 w-full max-w-none shrink-0 sm:max-w-[320px]">
            <div className="flex min-h-[360px] flex-col rounded-xl border border-white/10 bg-overlay/20 px-4 py-4 shadow-xl shadow-black/20 backdrop-blur-md">
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
                      onFocus={scrollInputIntoView}
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
                    onFocus={scrollInputIntoView}
                    required
                    placeholder="you@example.com"
                    className="h-8 border-overlay/60 bg-overlay/40 text-sm text-text placeholder:text-subtle/70 focus-visible:bg-iris/10 focus-visible:ring-iris/80 focus-visible:ring-2"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-iris text-xs">
                    Password {authMode === "register" && "(min 6)"}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={scrollInputIntoView}
                    required
                    minLength={authMode === "register" ? 6 : undefined}
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
            </div>
              </div>
            )}
            </>
            )}
            </Fade>

            {/* 3. Footer - min height so content fits; middle row expands */}
            <footer className="min-h-24 shrink-0 w-full max-w-sm mx-auto sm:max-w-none">
              <div className="w-full pt-4 pb-4 sm:pt-6 sm:pb-6">
                <hr className="border-0 border-b border-overlay/40 -mx-4 mb-4 sm:-mx-6 sm:mb-6" />
                <div className="flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-3 w-full text-left text-subtle/60 sm:gap-x-6 sm:gap-y-4">
                  <div className="flex min-w-0 flex-1 flex-col gap-y-0.5 self-start text-left sm:flex-initial sm:gap-y-1">
                    <p className="m-0 text-xs leading-none">
                      <span className="font-bold text-sm">Crosswit</span>
                      <span> {TAGLINE}</span>
                    </p>
                    <p className="m-0 text-[11px] leading-none tracking-wide">
                      <span>© {new Date().getFullYear()} Crosswit. All rights reserved. </span>
                      <a
                        href="https://millify.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white transition-colors"
                      >
                        millify.dev
                      </a>
                    </p>
                  </div>
                  <a
                    href={process.env.NEXT_PUBLIC_BUY_ME_A_COFFEE_URL || "https://buymeacoffee.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center transition-opacity hover:opacity-90 buy-me-coffee-link"
                    aria-label="Buy me a coffee"
                  >
                    <span
                      className="inline-block h-8 w-8 shrink-0 bg-iris [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
                      style={{
                        maskImage: "url(/bmc-logo-no-background.png)",
                        WebkitMaskImage: "url(/bmc-logo-no-background.png)",
                      }}
                      role="img"
                      aria-hidden
                    />
                  </a>
                </div>
                {process.env.NODE_ENV === "development" && (
                  <div className="mt-4 rounded-lg bg-overlay/10 py-3 -mx-4 px-4 sm:-mx-6 sm:px-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-subtle/60">
                    <span className="text-subtle/40">Dev:</span>
                    <Link
                      href="/board-test"
                      className="underline hover:text-white transition-colors"
                    >
                      board test
                    </Link>
                  </div>
                )}
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
        <div className="font-outfit bg-ink flex min-h-screen items-center justify-center">
          <span className="text-subtle">Loading…</span>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
