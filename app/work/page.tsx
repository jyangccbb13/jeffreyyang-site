import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { featuredPhotos, videoProjects } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description: `Photography and video work by ${site.name}.`,
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-8 pt-32 sm:px-8">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-faint">Work</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Things I&apos;ve made</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          No code projects to show yet — my portfolio lives behind a camera. Here
          is a selection of photography and video.
        </p>
      </Reveal>

      {/* ---------- Photography ---------- */}
      <section className="mt-16">
        <Reveal className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl">Photography</h2>
          <Link
            href="/photography"
            className="text-sm text-muted hover:text-ink link-underline"
          >
            Full gallery →
          </Link>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {featuredPhotos.map((photo, i) => (
            <Reveal
              key={photo.src}
              delay={(i % 3) * 60}
              className="group relative aspect-[4/3] overflow-hidden rounded-md bg-line"
            >
              <Image
                src={photo.src}
                alt={`${photo.title} — ${photo.place}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{photo.title}</p>
                <p className="text-xs text-white/70">{photo.place}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Video ---------- */}
      <section className="mt-20">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl">Video</h2>
          <p className="mt-2 max-w-xl text-muted">
            Placeholder section — drop in YouTube or Vimeo embed URLs in{" "}
            <code className="rounded bg-accent-soft px-1 py-0.5 text-sm text-accent-ink">
              lib/work.ts
            </code>{" "}
            and the players appear automatically.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {videoProjects.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 80}>
              <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-accent-soft">
                {v.embedUrl ? (
                  <iframe
                    src={v.embedUrl}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-faint">
                    Video embed goes here
                  </div>
                )}
              </div>
              <h3 className="mt-3 text-lg">{v.title}</h3>
              <p className="text-sm text-faint">{v.role}</p>
              <p className="mt-1 text-muted">{v.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="mt-20 border-t border-line pt-10">
        <p className="text-muted">
          Interested in prints or a shoot?{" "}
          <Link href="/contact" className="text-accent link-underline">
            Get in touch
          </Link>
          .
        </p>
      </Reveal>
    </div>
  );
}
