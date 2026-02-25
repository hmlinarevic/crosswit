"use client";

import brain2Png from "../public/brain2.png";

export const TAGLINE = "Word Search & Memory Trainer";

export function BrandLogo({ className = "" }) {
  return (
    <div
      className={`flex select-none items-center font-titilliumWeb text-xl text-foam sm:text-2xl ${className}`}
      data-cursor-element-id="brand-logo"
    >
      <span className="font-righteous">CR</span>
      <span
        className="ml-px mr-px inline-block h-5 w-5 shrink-0 bg-iris [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center] [-webkit-mask-size:contain] [-webkit-mask-repeat:no-repeat] [-webkit-mask-position:center]"
        style={{
          maskImage: `url(${brain2Png.src})`,
          WebkitMaskImage: `url(${brain2Png.src})`,
        }}
        role="img"
        aria-label="abstract brain symbol"
      />
      <span className="font-righteous">SSWIT</span>
    </div>
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
