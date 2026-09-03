import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

const links = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: "in/your-handle", href: site.socials.linkedin },
  { label: "GitHub", value: "jyangccbb13", href: site.socials.github },
  { label: "Instagram", value: "@shotswithjeff", href: site.socials.instagram },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-8 pt-32 sm:px-8">
      <Reveal>
        <p className="text-sm uppercase tracking-[0.2em] text-faint">Contact</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Let&apos;s talk</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          The fastest way to reach me is email. I&apos;m open to full-time roles,
          freelance photo or video work, and print inquiries — say hello.
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-12 divide-y divide-line border-y border-line">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group flex items-center justify-between py-5 transition-colors hover:text-accent"
          >
            <span className="text-sm uppercase tracking-wider text-faint group-hover:text-accent">
              {link.label}
            </span>
            <span className="text-lg">{link.value}</span>
          </a>
        ))}
      </Reveal>
    </div>
  );
}
