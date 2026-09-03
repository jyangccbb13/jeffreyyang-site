import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PrintButton from "@/components/PrintButton";
import { site } from "@/lib/site";
import { summary, experience, education, skills } from "@/lib/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}.`,
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-8 pt-32 sm:px-8">
      {/* Header */}
      <Reveal className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="text-4xl">{site.name}</h1>
          <p className="mt-2 text-muted">{site.role}</p>
          <p className="mt-1 text-sm text-faint">
            <a href={`mailto:${site.email}`} className="link-underline">
              {site.email}
            </a>
            {"  ·  "}
            {site.location}
            {"  ·  "}
            <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="link-underline">
              LinkedIn
            </a>
          </p>
        </div>
        <div className="no-print">
          <PrintButton />
        </div>
      </Reveal>

      {/* Summary */}
      <Reveal as="section" className="py-8">
        <p className="text-ink">{summary}</p>
      </Reveal>

      {/* Experience */}
      <section className="border-t border-line py-8">
        <Reveal>
          <h2 className="text-sm uppercase tracking-[0.18em] text-faint">Experience</h2>
        </Reveal>
        <div className="mt-6 space-y-8">
          {experience.map((job) => (
            <Reveal key={`${job.company}-${job.period}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg">
                  {job.role}
                  <span className="text-muted"> · {job.company}</span>
                </h3>
                <p className="text-sm text-faint">{job.period}</p>
              </div>
              <p className="text-sm text-faint">{job.location}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-line">
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="border-t border-line py-8">
        <Reveal>
          <h2 className="text-sm uppercase tracking-[0.18em] text-faint">Education</h2>
        </Reveal>
        <div className="mt-6 space-y-5">
          {education.map((ed) => (
            <Reveal key={ed.school}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg">{ed.school}</h3>
                <p className="text-sm text-faint">{ed.period}</p>
              </div>
              <p className="text-muted">{ed.degree}</p>
              <p className="text-sm text-faint">{ed.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-line py-8">
        <Reveal>
          <h2 className="text-sm uppercase tracking-[0.18em] text-faint">Skills</h2>
        </Reveal>
        <dl className="mt-6 space-y-3">
          {skills.map((s) => (
            <Reveal key={s.group} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <dt className="w-28 shrink-0 text-sm text-faint">{s.group}</dt>
              <dd className="text-muted">{s.items.join("  ·  ")}</dd>
            </Reveal>
          ))}
        </dl>
      </section>
    </div>
  );
}
