"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import brain2Png from "../../public/brain2.png";
import { getLogoPreference, setLogoPreference } from "../../lib/logo-preference";

const LOGO_FONTS = [
  { name: "Titillium Web (current wrapper)", class: "font-titilliumWeb" },
  { name: "Righteous (current text)", class: "font-righteous" },
  { name: "Fira Code", class: "font-firaCode", rightText: "SSWiT" },
  { name: "Rubik Doodle Shadow", class: "font-rubikDoodleShadow" },
  { name: "Rampart One", class: "font-rampartOne" },
  { name: "Audiowide", class: "font-audiowide", rightText: "SSWiT" },
  { name: "Outfit", class: "font-outfit" },
  { name: "DM Sans", class: "font-dmSans" },
  { name: "Ubuntu", class: "font-ubuntu" },
  { name: "Source Code Pro", class: "font-sourceCodePro" },
  { name: "Caveat", class: "font-caveat" },
  { name: "Architects Daughter", class: "font-hand" },
  { name: "Merriweather", class: "font-merriweather" },
  { name: "Roboto", class: "font-roboto" },
];

function LogoPreview({
  fontClass,
  fontName,
  rightText = "SSWIT",
  isSelected,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full cursor-pointer flex-col gap-2 rounded-lg border p-6 text-left transition-colors ${
        isSelected
          ? "border-iris bg-iris/20 ring-2 ring-iris/50"
          : "border-overlay/60 bg-surface/50 hover:border-overlay hover:bg-surface/70"
      }`}
    >
      <span className="font-ubuntuMono text-xs text-subtle">{fontName}</span>
      <div
        className={`flex select-none items-center text-xl text-white sm:text-2xl ${fontClass}`}
      >
        <span className={fontClass}>CR</span>
        <span
          className="ml-px mr-px inline-block h-5 w-5 shrink-0 bg-iris [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] sm:h-6 sm:w-6"
          style={{
            maskImage: `url(${brain2Png.src})`,
            WebkitMaskImage: `url(${brain2Png.src})`,
          }}
          role="img"
          aria-label="abstract brain symbol"
        />
        <span className={fontClass}>{rightText}</span>
      </div>
    </button>
  );
}

function isSameSelection(pref, fontClass, rightText) {
  if (!pref?.fontClass) return false;
  return pref.fontClass === fontClass && (pref.rightText ?? "SSWIT") === (rightText ?? "SSWIT");
}

export default function LogoTestPage() {
  const [preference, setPreference] = useState(null);

  useEffect(() => {
    setPreference(getLogoPreference());
  }, []);

  const handleSelect = (fontClass, rightText) => {
    const existing = getLogoPreference();
    setLogoPreference({ ...existing, fontClass, rightText: rightText ?? "SSWIT" });
    setPreference(getLogoPreference());
  };

  const handleUseDefault = () => {
    setLogoPreference(null);
    setPreference(null);
  };

  return (
    <main className="min-h-screen bg-matt-gloss px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 font-titilliumWeb text-2xl font-semibold text-white sm:text-3xl">
          Logo font test
        </h1>
        <p className="mb-6 font-titilliumWeb text-sm text-subtle">
          Compare font families for the brand name (CR + icon + SSWIT). Select
          one to use on the home page.
        </p>
        {preference && (
          <p className="mb-6 flex flex-wrap items-center gap-2 font-titilliumWeb text-sm text-subtle">
            <span>Current home logo: {preference.fontClass.replace("font-", "")}</span>
            <button
              type="button"
              onClick={handleUseDefault}
              className="rounded border border-overlay bg-surface/50 px-2 py-1 text-iris hover:bg-surface"
            >
              Use default
            </button>
            <Link href="/" className="rounded border border-white/50 px-2 py-1 text-white hover:bg-white/10">
              View home
            </Link>
          </p>
        )}

        {/* Current production reference */}
        <section className="mb-12">
          <h2 className="mb-4 font-ubuntuMono text-xs uppercase tracking-wider text-subtle">
            Current production
          </h2>
          <div className="flex flex-col gap-2 rounded-lg border border-iris/40 bg-surface/30 p-6">
            <span className="font-ubuntuMono text-xs text-iris">
              Righteous (CR + SSWIT)
            </span>
            <div className="flex select-none items-center font-titilliumWeb text-xl text-white sm:text-2xl">
              <span className="font-righteous">CR</span>
              <span
                className="ml-px mr-px inline-block h-5 w-5 shrink-0 bg-iris [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center] sm:h-6 sm:w-6"
                style={{
                  maskImage: `url(${brain2Png.src})`,
                  WebkitMaskImage: `url(${brain2Png.src})`,
                }}
                role="img"
                aria-label="abstract brain symbol"
              />
              <span className="font-righteous">SSWIT</span>
            </div>
          </div>
        </section>

        {/* All font variants */}
        <section>
          <h2 className="mb-4 font-ubuntuMono text-xs uppercase tracking-wider text-subtle">
            Font family options
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {LOGO_FONTS.map(({ name, class: fontClass, rightText }) => (
              <li key={name}>
                <LogoPreview
                  fontName={name}
                  fontClass={fontClass}
                  rightText={rightText}
                  isSelected={isSameSelection(preference, fontClass, rightText)}
                  onSelect={() => handleSelect(fontClass, rightText)}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
