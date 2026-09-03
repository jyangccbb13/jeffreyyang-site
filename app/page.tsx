import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { featuredPhotos } from "@/lib/work";

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Image
          src="/featured/craterlake.jpg"
          alt="Sunrise over Crater Lake"
          fill
          priority
          sizes="100vw"
          className="hero-img object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/45" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />

        <div className="relative mx-auto w-full max-w-5xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28">
          <p className="fade-up text-sm uppercase tracking-[0.2em] text-white/70">
            {site.role}
          </p>
          <h1
            className="fade-up mt-4 max-w-3xl text-5xl text-white sm:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            {site.name}
          </h1>
          <p
            className="fade-up mt-6 max-w-xl text-lg text-white/85"
            style={{ animationDelay: "0.2s" }}
          >
            {site.tagline}
          </p>
          <div
            className="fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/work"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-white/90"
            >
              See my work
            </Link>
            <Link
              href="/resume"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              View résumé
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Intro ---------- */}
      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="max-w-2xl font-display text-2xl leading-snug text-ink sm:text-3xl">
            I&apos;m a student and photographer who likes making things that are
            useful and things that are beautiful — often at the same time.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-6 max-w-2xl text-muted">
            This site is a quick tour of who I am: my background, the work
            I&apos;m proud of, and what I&apos;m hoping to do next. If any of it
            resonates,{" "}
            <Link href="/contact" className="text-accent link-underline">
              I&apos;d love to hear from you
            </Link>
            .
          </p>
        </Reveal>
      </section>

      {/* ---------- Featured work ---------- */}
      <section className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal className="flex items-end justify-between">
          <h2 className="text-3xl sm:text-4xl">Selected photography</h2>
          <Link
            href="/work"
            className="hidden text-sm text-muted hover:text-ink sm:block link-underline"
          >
            All work →
          </Link>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {featuredPhotos.slice(0, 6).map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={(i % 3) * 70}
              className="group relative aspect-[4/3] overflow-hidden rounded-md bg-line"
            >
              <Image
                src={photo.src}
                alt={`${photo.title} — ${photo.place}`}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{photo.title}</p>
                <p className="text-xs text-white/70">{photo.place}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Link
          href="/work"
          className="mt-6 inline-block text-sm text-muted hover:text-ink sm:hidden link-underline"
        >
          All work →
        </Link>
      </section>

      {/* ---------- Recruiting CTA ---------- */}
      <section className="mx-auto mt-24 max-w-5xl px-5 sm:px-8">
        <Reveal className="rounded-2xl bg-accent px-6 py-14 text-center sm:px-16">
          <h2 className="text-3xl text-white sm:text-4xl">
            I&apos;m looking for my next role
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Open to full-time opportunities in [your field]. If you&apos;re
            hiring — or just want to talk shop — my inbox is open.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-accent-ink transition-colors hover:bg-white/90"
            >
              Email me
            </a>
            <Link
              href="/resume"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Résumé
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
