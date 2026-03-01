"use client";

import { Eye, Search, MousePointer, Award, CheckCircle } from "react-feather";
import { BrandLogo, TAGLINE } from "../../components/brand-header";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Eye,
    title: "Memorize",
    description: "Memorize the list of words before the round starts.",
  },
  {
    icon: Search,
    title: "Find",
    description:
      "Find them in the puzzle before the timer ends. Speed matters for your score.",
  },
  {
    icon: MousePointer,
    title: "Click & drag",
    description: "Click and drag to select a word in the grid.",
  },
  {
    icon: Award,
    title: "Score points",
    description: "Score points by quickly finding all the words.",
  },
  {
    icon: CheckCircle,
    title: "Complete level 10",
    titleHighlight: "Complete",
    description: "Complete level 10 to master the game.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-matt-gloss text-text">
      <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <BrandLogo className="text-2xl sm:text-3xl text-white" />
          </div>
          <h1 className="font-titilliumWeb font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
            About Crosswit
          </h1>
          <p className="mt-4 text-subtle text-lg sm:text-xl leading-relaxed max-w-2xl">
            {TAGLINE}. Exercise parts of your brain responsible for short-term
            memory. Playing without writing words down or taking screenshots
            gives the best effect.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="font-titilliumWeb font-semibold text-base tracking-tight text-white mb-3">
            How to get the most out of Crosswit
          </h2>
          <p className="text-subtle text-sm leading-relaxed">
            Thank you for trying out the app!{" "}
            <span className="text-rose">Exercise</span> parts of your brain
            responsible for{" "}
            <span className="text-rose">short-term memory.</span> Playing the
            game without writing the words down or taking screenshots will have
            the best effect for this type of exercise.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-titilliumWeb font-semibold text-base tracking-tight text-white mb-4">
            Did you know?
          </h2>
          <p className="text-subtle text-sm leading-relaxed">
            Crosswords <span className="text-rose">alleviate</span> anxiety,
            which can <span className="text-rose">improve</span> your mood.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-titilliumWeb font-semibold text-lg tracking-tight text-subtle uppercase mb-6">
            How to play
          </h2>
          <ul className="grid grid-cols-1 gap-4">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={i}>
                  <Card className="border-overlay bg-surface rounded-2xl overflow-hidden transition-all duration-200 hover:border-pine/50">
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-overlay text-pine">
                          <Icon
                            className="h-5 w-5 stroke-[1.5px]"
                            aria-hidden
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-titilliumWeb font-semibold text-base tracking-tight text-text">
                            {item.titleHighlight ? (
                              <>
                                <span className="text-rose">
                                  {item.titleHighlight}
                                </span>
                                {item.title.slice(item.titleHighlight.length)}
                              </>
                            ) : (
                              item.title
                            )}
                          </h3>
                          <p className="text-subtle text-sm leading-relaxed mt-1.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
