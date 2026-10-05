"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, nav } from "@/lib/site";

export default function Footer() {
  // The home hero already fills the viewport — butt the footer straight up
  // against it there instead of adding the usual breathing room.
  const isHome = usePathname() === "/";

  return (
    <footer className={`border-t border-line no-print ${isHome ? "" : "mt-24"}`}>
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-2xl">{site.name}</p>
            <p className="mt-1 text-sm text-muted">
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {nav.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="text-muted hover:text-ink">
                {item.label}
              </Link>
            ))}
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-ink"
            >
              Instagram
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-faint">
          © {new Date().getFullYear()} {site.name}. All photographs are my own work.
        </p>
      </div>
    </footer>
  );
}
