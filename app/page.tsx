import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Home() {
  return (
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
        <h1 className="fade-up max-w-3xl text-5xl text-white sm:text-7xl">
          {site.name}
        </h1>
        <p
          className="fade-up mt-6 max-w-xl text-lg text-white/85"
          style={{ animationDelay: "0.1s" }}
        >
          {site.tagline}
        </p>
        <div
          className="fade-up mt-8 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            href="/work"
            className="rounded-full bg-button px-6 py-3 text-sm font-medium text-stone-900 transition-colors hover:bg-button-hover"
          >
            See my work
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-button p-2 shadow-sm transition-transform hover:scale-105"
            >
              <Image
                src="/icons/instagram.png"
                alt=""
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-button p-2 shadow-sm transition-transform hover:scale-105"
            >
              <Image
                src="/icons/linkedin.png"
                alt=""
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
