"use client";

const FONTS = [
  { name: "Caveat", class: "font-caveat" },
  { name: "Righteous", class: "font-righteous" },
  { name: "Roboto", class: "font-roboto" },
  { name: "Merriweather", class: "font-merriweather" },
  { name: "Architects Daughter", class: "font-hand" },
  { name: "Ubuntu", class: "font-ubuntu" },
  { name: "Ubuntu Mono", class: "font-ubuntuMono" },
  { name: "Source Code Pro", class: "font-sourceCodePro" },
  { name: "Titillium Web", class: "font-titilliumWeb" },
  { name: "Audiowide", class: "font-audiowide" },
];

export default function MemorizeFontPreview() {
  return (
    <main className="min-h-screen bg-ink px-6 py-12">
      <h1 className="mb-10 font-titilliumWeb text-lg text-subtle">
        Memorize — font variations (same size: text-4xl)
      </h1>
      <ul className="flex flex-col gap-8">
        {FONTS.map(({ name, class: fontClass }) => (
          <li key={name} className="flex flex-col gap-1">
            <span className="font-ubuntuMono text-xs text-subtle">{name}</span>
            <span
              className={`text-center text-4xl font-medium tracking-wide text-white ${fontClass}`}
            >
              Memorize
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
