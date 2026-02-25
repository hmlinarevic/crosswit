"use client";

import { useState, useEffect } from "react";
import brain2Png from "../public/brain2.png";
import { getLogoPreference, LOGO_PREFERENCE_KEY } from "../lib/logo-preference";

export const TAGLINE = "Word Search & Memory Trainer";

const DEFAULT_FONT_CLASS = "font-righteous";
const DEFAULT_RIGHT_TEXT = "SSWIT";

export function BrandLogo({
  className = "",
  fontClass = DEFAULT_FONT_CLASS,
  rightText = DEFAULT_RIGHT_TEXT,
  displayText,
}) {
  if (displayText != null) {
    return (
      <div
        className={`flex select-none items-center ${fontClass} ${className}`}
        data-cursor-element-id="brand-logo"
      >
        {displayText}
      </div>
    );
  }
  return (
    <div
      className={`flex select-none items-center text-xl text-foam sm:text-2xl ${fontClass} ${className}`}
      data-cursor-element-id="brand-logo"
    >
      <span className={fontClass}>CR</span>
      <span
        className="ml-px mr-px inline-block h-6 w-6 shrink-0 bg-iris [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
        style={{
          maskImage: `url(${brain2Png.src})`,
          WebkitMaskImage: `url(${brain2Png.src})`,
        }}
        role="img"
        aria-label="abstract brain symbol"
      />
      <span className={fontClass}>{rightText}</span>
    </div>
  );
}

/** Renders BrandLogo using the selection from /logo-test (localStorage). Use on home page. */
export function BrandLogoFromPreference({ className = "", displayText }) {
  const [pref, setPref] = useState(null);

  useEffect(() => {
    setPref(getLogoPreference());
    const onStorage = (e) => {
      if (e.key === LOGO_PREFERENCE_KEY) setPref(getLogoPreference());
    };
    const onPreferenceChange = () => setPref(getLogoPreference());
    window.addEventListener("storage", onStorage);
    window.addEventListener("crosswit-logo-preference-change", onPreferenceChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("crosswit-logo-preference-change", onPreferenceChange);
    };
  }, []);

  if (pref?.fontClass) {
    return (
      <BrandLogo
        className={className}
        fontClass={pref.fontClass}
        rightText={pref.rightText ?? DEFAULT_RIGHT_TEXT}
        displayText={displayText}
      />
    );
  }
  return <BrandLogo className={className} displayText={displayText} />;
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
