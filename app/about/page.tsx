import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { aboutPhotos } from "@/lib/about";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — background, interests, and what I'm working toward.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-8 pt-32 sm:px-8">
      <Reveal>
        <h1 className="text-4xl text-ink sm:text-5xl">About</h1>
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <Reveal className="space-y-5 text-lg leading-relaxed text-ink">
          <p>
            I am a senior at USC, pursuing a major in Computer Science and
            Business Administration. I&apos;m interested in how tech companies
            work at every level, from granular product decisions to
            company-wide strategy. I&apos;ve built projects trying to solve
            glossed-over problems, most recently in dementia detection, college
            counseling, and senior care. This past summer I worked on M&amp;A
            at Perella Weinberg Partners, and I&apos;ve previously interned in
            software engineering at Arista Networks and whole loan trading at
            Brean Capital, alongside product roles with USC startups.
          </p>
          <p>
            I&apos;m involved in a variety of extracurriculars on campus,
            including USC&apos;s SEP and Troy Labs (USC&apos;s startup
            incubator and accelerator) and Trojan Finance Academy. When
            I&apos;m free, I enjoy photography and videography, cooking,
            traveling, and playing volleyball and soccer.
          </p>
          <p className="text-muted">
            Want to know more?{" "}
            <Link href="/contact" className="text-accent link-underline">
              Get in touch
            </Link>
            .
          </p>
        </Reveal>

        <Reveal delay={100} className="self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-line">
            <Image
              src="/about/jeffrey.jpg"
              alt={site.name}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <section className="mt-20">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {aboutPhotos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={(i % 4) * 70}
              className="group relative aspect-[4/5] overflow-hidden rounded-md bg-line"
            >
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{photo.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
