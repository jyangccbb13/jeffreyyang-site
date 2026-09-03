import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — background, interests, and what I'm working toward.`,
};

const interests = [
  {
    title: "Photography",
    body: "Landscapes, night skies, and cars. I shoot on a Canon R6, edit in Lightroom, and sell fine-art prints under @shotswithjeff.",
  },
  {
    title: "The outdoors",
    body: "Most of my photos are the byproduct of a hike. Alpine lakes in the Cascades and Olympics are the current obsession.",
  },
  {
    title: "Building things",
    body: "I like turning an idea into something people can actually use — this site included. Comfortable picking up new tools quickly.",
  },
  {
    title: "[Your fourth interest]",
    body: "Placeholder — music, cooking, a sport, a side project. Something that shows how you spend your time.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-8 pt-32 sm:px-8">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-faint">About</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">A bit about me</h1>
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <Reveal className="space-y-5 text-lg leading-relaxed text-ink">
          <p>
            Placeholder bio, paragraph one. Where you&apos;re from, what
            you&apos;re studying or doing now, and the thread that ties your
            interests together. Keep it human — this isn&apos;t a cover letter.
          </p>
          <p>
            Paragraph two. A formative experience or two: a project, a trip, a
            job that changed how you think. What you learned from it.
          </p>
          <p>
            Paragraph three. What you&apos;re focused on now and where you want
            to take it. End with the kind of team or problem you&apos;d be
            excited to join.
          </p>
          <p className="text-muted">
            Want the short version?{" "}
            <Link href="/resume" className="text-accent link-underline">
              Read my résumé
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-accent link-underline">
              get in touch
            </Link>
            .
          </p>
        </Reveal>

        <Reveal delay={100} className="self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-line">
            <Image
              src="/featured/goat.jpg"
              alt="On the trail"
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover"
            />
          </div>
          <p className="mt-2 text-xs text-faint">
            Replace with a photo of yourself.
          </p>
        </Reveal>
      </div>

      <section className="mt-20">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl">What I spend my time on</h2>
        </Reveal>
        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {interests.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 80} className="border-t border-line pt-4">
              <h3 className="text-xl">{item.title}</h3>
              <p className="mt-2 text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
