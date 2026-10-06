import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import InstagramEmbed from "@/components/InstagramEmbed";
import { site } from "@/lib/site";
import { experience, featuredPhotos, videoProjects } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description: `Photography and video work by ${site.name}.`,
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-8 pt-32 sm:px-8">
      <Reveal>
        <h1 className="text-4xl sm:text-5xl">My Work</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Professional experiences, side projects, and camera work.
        </p>
      </Reveal>

      {/* ---------- Experience ---------- */}
      <section className="mt-16">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl">Experience</h2>
        </Reveal>

        <div className="mt-8 space-y-8">
          {experience.map((job, i) => (
            <Reveal
              key={`${job.company}-${job.period}`}
              delay={(i % 3) * 60}
              className="rounded-2xl border border-line p-8 sm:p-10"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg sm:text-xl">
                  {job.company}
                  <span className="text-sm text-muted sm:text-base"> · {job.role}</span>
                </h3>
                <p className="text-sm text-faint">{job.period}</p>
              </div>
              <p className="mt-3 text-muted">
                {job.description.map((part, j) =>
                  typeof part === "string" ? (
                    <span key={j}>{part}</span>
                  ) : (
                    <a
                      key={j}
                      href={part.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent link-underline"
                    >
                      {part.text}
                    </a>
                  )
                )}
              </p>

              {job.screenshot && (
                <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg border border-line bg-accent-soft">
                  <Image
                    src={job.screenshot}
                    alt={`Screenshot of ${job.company}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 900px"
                    className="object-cover"
                  />
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Photography ---------- */}
      <section className="mt-16">
        <Reveal className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl">Photography</h2>
          <Link
            href="/photography"
            className="text-sm text-muted hover:text-ink link-underline"
          >
            Full gallery
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
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- Video ---------- */}
      <section className="mt-20">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl">Video</h2>
          <p className="mt-2 max-w-xl text-muted">
            Films for my friends and I as we travel the world.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {videoProjects.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 80}>
              {v.videoSrc ? (
                <div className="relative aspect-video overflow-hidden rounded-lg border border-line bg-accent-soft">
                  <video
                    src={v.videoSrc}
                    poster={v.poster}
                    controls
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                  {v.instagramUrl && (
                    <a
                      href={v.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute right-2 top-2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-black/80"
                    >
                      View on Instagram ↗
                    </a>
                  )}
                </div>
              ) : v.instagramUrl ? (
                <InstagramEmbed url={v.instagramUrl} />
              ) : (
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
              )}
              <h3 className="mt-3 text-lg">{v.title}</h3>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
