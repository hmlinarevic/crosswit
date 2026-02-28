"use client";

import { useSyncExternalStore } from "react";
import brain2Png from "../public/brain2.png";
import { getLogoPreference, LOGO_PREFERENCE_KEY } from "../lib/logo-preference";

export const TAGLINE = "Word Search & Memory Trainer";

const DEFAULT_FONT_CLASS = "font-righteous";
const DEFAULT_RIGHT_TEXT = "SSWIT";

const COLOR_CLASS_TO_ICON_BG = {
  "text-white": "bg-white",
  "text-iris": "bg-iris",
  "text-rose": "bg-rose",
  "text-love": "bg-love",
  "text-gold": "bg-gold",
  "text-foam": "bg-foam",
  "text-pine": "bg-pine",
  "text-subtle": "bg-subtle",
};

export function BrandLogo({
  className = "",
  fontClass = DEFAULT_FONT_CLASS,
  rightText = DEFAULT_RIGHT_TEXT,
  colorClass = "text-white",
  iconColorClass,
  iconColorHex,
  displayText,
}) {
  const effectiveIconHex = iconColorHex && iconColorHex.trim() ? iconColorHex : null;
  const iconColorSource = effectiveIconHex ?? iconColorClass ?? colorClass;
  const iconBgClass = effectiveIconHex ? null : (COLOR_CLASS_TO_ICON_BG[iconColorSource] ?? COLOR_CLASS_TO_ICON_BG[colorClass] ?? "bg-white");
  const iconStyle = effectiveIconHex
    ? { maskImage: `url(${brain2Png.src})`, WebkitMaskImage: `url(${brain2Png.src})`, backgroundColor: effectiveIconHex }
    : { maskImage: `url(${brain2Png.src})`, WebkitMaskImage: `url(${brain2Png.src})` };
  if (displayText != null) {
    return (
      <div
        className={`flex select-none items-center ${colorClass} ${fontClass} ${className}`}
        data-cursor-element-id="brand-logo"
      >
        {displayText}
      </div>
    );
  }
  return (
    <div
      className={`flex select-none items-center text-xl sm:text-2xl ${colorClass} ${fontClass} ${className}`}
      data-cursor-element-id="brand-logo"
    >
      <span className={fontClass}>CR</span>
      <span
        className={`ml-px mr-px inline-block h-6 w-6 shrink-0 ${iconBgClass ?? ""} [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]`}
        style={iconStyle}
        role="img"
        aria-label="abstract brain symbol"
      />
      <span className={fontClass}>{rightText}</span>
    </div>
  );
}

function subscribeToLogoPreference(callback) {
  const onStorage = (e) => {
    if (e.key === LOGO_PREFERENCE_KEY) callback();
  };
  const onPreferenceChange = () => callback();
  const onVisibilityChange = () => {
    if (document.visibilityState === "visible") callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener("crosswit-logo-preference-change", onPreferenceChange);
  document.addEventListener("visibilitychange", onVisibilityChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("crosswit-logo-preference-change", onPreferenceChange);
    document.removeEventListener("visibilitychange", onVisibilityChange);
  };
}

let cachedSnapshot = null;
let cachedRaw = null;

function getLogoPreferenceSnapshot() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOGO_PREFERENCE_KEY);
    if (raw === cachedRaw && cachedSnapshot) return cachedSnapshot;
    cachedRaw = raw;
    cachedSnapshot = raw ? JSON.parse(raw) : null;
    return cachedSnapshot;
  } catch {
    return null;
  }
}

function getLogoPreferenceServerSnapshot() {
  return null;
}

/** Renders BrandLogo using the selection from /logo-test (localStorage). Use on home page. */
export function BrandLogoFromPreference({
  className = "",
  fontClass = DEFAULT_FONT_CLASS,
  rightText = DEFAULT_RIGHT_TEXT,
  displayText,
}) {
  const pref = useSyncExternalStore(
    subscribeToLogoPreference,
    getLogoPreferenceSnapshot,
    getLogoPreferenceServerSnapshot
  );

  const finalFontClass = pref?.fontClass ?? fontClass;
  const finalRightText = pref?.rightText ?? rightText;
  const finalColorClass = pref?.colorClass ?? "text-white";
  const finalIconColorClass = pref?.iconColorClass ?? undefined;
  const finalIconColorHex = pref?.iconColorHex ?? undefined;

  return (
    <BrandLogo
      className={className}
      fontClass={finalFontClass}
      rightText={finalRightText}
      colorClass={finalColorClass}
      iconColorClass={finalIconColorClass}
      iconColorHex={finalIconColorHex}
      displayText={displayText}
    />
  );
}

export function BrandTagline({ className = "" }) {
  return (
    <span
      className={`block min-h-[1.25rem] shrink-0 font-hand text-sm leading-normal text-iris sm:text-base ${className}`}
      data-cursor-element-id="brand-tagline"
    >
      {TAGLINE}
    </span>
  );
}

export function BrandLogoWithTagline({ className = "" }) {
  return (
    <div
      className={`flex min-h-[3rem] flex-col justify-center gap-1 ${className}`}
      data-cursor-element-id="brand-tagline"
    >
      <BrandLogo />
      <BrandTagline />
    </div>
  );
}
