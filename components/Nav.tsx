"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, nav } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Home has a full-bleed dark hero — start transparent there until scrolled.
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overHero
          ? "bg-transparent"
          : "bg-bg/85 backdrop-blur-md border-b border-line"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/"
          className={`font-display text-lg tracking-tight transition-colors ${
            overHero ? "text-white" : "text-ink"
          }`}
        >
          {site.name}
        </Link>

        <nav className="hidden gap-7 sm:flex">
          {nav.slice(1).map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm link-underline transition-colors ${
                  overHero
                    ? "text-white/80 hover:text-white"
                    : active
                      ? "text-accent"
                      : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`sm:hidden text-sm ${overHero ? "text-white" : "text-ink"}`}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line bg-bg px-5 py-3 sm:hidden">
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-2 text-sm text-muted hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
