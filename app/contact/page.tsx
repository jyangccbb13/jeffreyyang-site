import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

const socialButtons = [
  { label: "Email", href: `mailto:${site.email}`, icon: "/icons/gmail.png", external: false },
  { label: "LinkedIn", href: site.socials.linkedin, icon: "/icons/linkedin.png", external: true },
  { label: "Instagram", href: site.socials.instagram, icon: "/icons/instagram.png", external: true },
  { label: "GitHub", href: site.socials.github, icon: "/icons/github.png", external: true },
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

      <Reveal delay={80} className="mt-12 rounded-2xl border border-line bg-surface px-6 py-8 sm:px-10 sm:py-10">
        <ContactForm />
      </Reveal>

      <Reveal delay={120} className="mt-8 flex flex-wrap justify-center gap-3">
        {socialButtons.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            aria-label={item.label}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-2 shadow-sm ring-1 ring-line transition-transform hover:scale-105"
          >
            <Image src={item.icon} alt="" width={32} height={32} className="h-full w-full object-contain" />
          </a>
        ))}
      </Reveal>
    </div>
  );
}
