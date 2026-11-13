// ---------------------------------------------------------------------------
// Résumé content, sourced from the downloadable PDF. Keep the two in sync.
// ---------------------------------------------------------------------------

export const summary =
  "Computer Science & Business Administration student at USC (Viterbi + Marshall) focused on software engineering and product. I've shipped an AI study tool to 500+ users, built computer-vision software for early dementia detection, and engineered customer-facing tools at Arista Networks. Looking for full-time and internship roles in software engineering or product.";

export type ExperienceGroup = "Experience" | "Startup & Product Experience" | "Projects & Competitions";

export interface Job {
  role: string;
  company: string;
  location?: string;
  period: string;
  bullets: string[];
  group: ExperienceGroup;
  link?: { text: string; href: string };
}

export const experience: Job[] = [
  // --- Experience ---
  {
    role: "Investment Banking Summer Analyst, Technology",
    company: "Perella Weinberg Partners",
    location: "San Francisco, CA",
    period: "Jun – Aug 2026",
    group: "Experience",
    bullets: [
      "Researched AI benchmarking and deployment trends, authoring fintech market briefs for coverage clients.",
      "Built DCFs, comps, and precedents; reconstructed historicals and forward P&Ls for early-stage sell-side companies.",
      "Supported 6 sell-side M&A, activism defense, and origination engagements across AI, fintech, traveltech, and edtech.",
    ],
  },
  {
    role: "Product Strategy & Software Engineering Intern, Customer Engineering",
    company: "Arista Networks",
    location: "Santa Clara, CA / Remote",
    period: "May – Aug 2025",
    group: "Experience",
    bullets: [
      "Developed end-to-end multi-vendor network configuration parsers for Cisco-based and other vendor operating systems.",
      "Defined the product roadmap for a vendor-agnostic translation platform, prioritizing features by customer pain point.",
      "Led product discovery for networking configuration tools through interviews with 8+ enterprise sales engineers.",
    ],
  },
  {
    role: "Whole Loan Sales Intern, Fixed Income Group",
    company: "Brean Capital",
    location: "Memphis, TN",
    period: "Jun – Aug 2024",
    group: "Experience",
    bullets: [
      "Engineered custom GPT-4 workflows to automate deal execution, cutting loan writeup turnaround time by 40%.",
      "Supported a $300M capital raise, underwriting transaction documents for the Ardavon and Frontier Airlines deals.",
      "Modeled credit analysis for $2.5M+ loan bundles across 5 businesses, informing strategies with a 12.5% blended gain.",
    ],
  },

  // --- Startup & Product Experience ---
  {
    role: "Founding Engineer",
    company: "USC Sigma Eta Pi (SEP)",
    location: "Los Angeles, CA",
    period: "Aug 2025 – Present",
    group: "Startup & Product Experience",
    bullets: [
      "Co-developed Gait, computer-vision software for early dementia detection — defined PMF and owned the ML integration.",
      "Led product for Rumo, a college-counseling platform — ran 15+ user interviews and defined the roadmap.",
      "Led customer discovery for both ventures, mapping user interviews to product requirements.",
    ],
  },
  {
    role: "Product Manager",
    company: "Troy Labs",
    location: "Los Angeles, CA",
    period: "Aug 2024 – Present",
    group: "Startup & Product Experience",
    bullets: [
      "Led product for Bliss, an AI study tool — ran 50+ user interviews, defined the roadmap, and shipped the MVP in 10 weeks.",
      "Scaled Bliss to 500+ users in under 3 months through GTM execution and online advertising; advised the founder on fundraising strategy.",
      "As co-head PM, helped internal PMs delegate work across teams and coordinated communication with startup founders.",
    ],
  },
  {
    role: "Business Development (Part-time)",
    company: "LiveIQ.ai",
    location: "New York, NY / Remote",
    period: "Mar – Jun 2025",
    group: "Startup & Product Experience",
    bullets: [
      "Owned GTM strategy for an AI front-desk agent, scaling the lead pipeline 3x through outreach and conversion optimization.",
      "Ran customer discovery through outreach to 30+ franchised and independent medical spas in Southern California.",
      "Built scalable outreach workflows using Apollo.io and CRMs, adopted as a repeatable process by the sales team.",
    ],
  },

  // --- Projects & Competitions ---
  {
    role: "Co-Founder",
    company: "Tether — Global Student Startup Competition",
    period: "May 2026",
    group: "Projects & Competitions",
    bullets: [
      "Co-developed and pitched Tether, an AI storytelling platform that turns senior residents' life stories into short-form video.",
      "Pitched in Seoul and won 1st place; invited to Techstars NYC; advanced discussions with home networks serving 15k+ residents.",
    ],
    link: { text: "Competition writeup", href: "https://globalstudentstartup.org/" },
  },
  {
    role: "Hackathon Project",
    company: "Serenade — HackMIT",
    period: "Sep 2025",
    group: "Projects & Competitions",
    bullets: [
      "Built a web app that generates personalized music from a user's info and Spotify listening history.",
      "Led the technical architecture for the Spotify, Gmail, and Claude API integrations within a 24-hour build.",
    ],
    link: { text: "View on GitHub", href: "https://github.com/aznduck/Serenade" },
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
    school: "University of Southern California — Viterbi School of Engineering & Marshall School of Business",
    degree: "B.S. in Computer Science & Business Administration",
    detail: "Dean's List (5 semesters) · USC Presidential & Viterbi Scholar · Trojan Finance Academy",
    period: "Expected May 2027",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Technical", items: ["Python", "Java", "C++", "SQL", "LLM APIs"] },
  { group: "Product", items: ["Product Strategy & Roadmapping", "Figma", "Jira", "Financial Modeling"] },
  { group: "Languages", items: ["English (fluent)", "Mandarin (conversational)"] },
];
