// ---------------------------------------------------------------------------
// Résumé content. All placeholder — swap in your real experience.
// Keep bullet lists to 2–4 items each; lead with an action verb + outcome.
// ---------------------------------------------------------------------------

export const summary =
  "Placeholder summary — two or three lines. Who you are, the kind of work you do well, and what you're looking for. Mention a concrete strength or two (analysis, communication, shipping projects) and the field or roles you're targeting.";

export interface Job {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export const experience: Job[] = [
  {
    role: "[Job Title]",
    company: "[Company / Organization]",
    location: "[City, State]",
    period: "Jun 2024 – Aug 2024",
    bullets: [
      "Placeholder achievement — what you did, the tools you used, and the measurable result.",
      "Placeholder achievement — a project you owned end to end, and its impact on the team.",
      "Placeholder achievement — a time you improved a process or number.",
    ],
  },
  {
    role: "[Job Title]",
    company: "[Company / Organization]",
    location: "[City, State]",
    period: "Jun 2023 – Aug 2023",
    bullets: [
      "Placeholder achievement — quantify wherever you can (%, $, time saved, users).",
      "Placeholder achievement — collaboration across teams or with stakeholders.",
    ],
  },
  {
    role: "Founder & Photographer",
    company: "Jeffrey Yang Photography (@shotswithjeff)",
    location: "Remote",
    period: "2021 – Present",
    bullets: [
      "Built and run a landscape and automotive photography practice — shooting, editing, print fulfillment, and the client-facing website.",
      "Grew an audience on Instagram and sold fine-art prints to collectors across the country.",
    ],
  },
];

export interface School {
  school: string;
  degree: string;
  detail: string;
  period: string;
}

export const education: School[] = [
  {
    school: "[University Name]",
    degree: "B.S. / B.A. in [Major]",
    detail: "GPA X.XX · Relevant coursework: [Course], [Course], [Course]",
    period: "Expected 2026",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Tools", items: ["[Tool]", "[Tool]", "Excel / Sheets", "Git"] },
  { group: "Technical", items: ["[Skill]", "[Skill]", "Data analysis"] },
  { group: "Creative", items: ["Photography", "Lightroom", "Premiere Pro", "Video editing"] },
];

export const highlights: { label: string; value: string }[] = [
  { label: "Prints sold", value: "[XX]" },
  { label: "Miles hiked with a camera", value: "[XXX]" },
  { label: "Projects shipped", value: "[X]" },
];
