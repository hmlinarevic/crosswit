"use client";

export default function LevelPreview() {
  return (
    <main className="min-h-screen bg-baseDark px-6 py-12">
      <h1 className="mb-10 font-titilliumWeb text-lg text-subtle">
        Level text preview (same styling as memorize screen)
      </h1>
      <ul className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
          <li key={level}>
            <span className="-mt-1 block text-center font-hand text-lg text-iris sm:text-xl !text-iris">
              level <span className="font-bold">{level}</span>
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
