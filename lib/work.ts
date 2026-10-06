// ---------------------------------------------------------------------------
// Portfolio content for the Work page.
// ---------------------------------------------------------------------------

export interface ExperienceDescriptionLink {
  text: string;
  href: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  /** Path under /public to a screenshot of the product/site. Leave unset to omit. */
  screenshot?: string;
  /** Mix of plain strings and inline links, joined in order. */
  description: (string | ExperienceDescriptionLink)[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "Perella Weinberg Partners",
    role: "Investment Banking Summer Analyst, Technology",
    period: "Jun – Aug 2026",
    description: [
      "Supported 6 sell-side M&A, activism defense, and origination engagements across AI, fintech, traveltech, and edtech, building financial models and sector research.",
    ],
  },
  {
    company: "Tether",
    role: "Co-Founder",
    period: "Feb – May 2026",
    description: [
      "Founded an AI storytelling platform for senior living facilities that turns residents' life stories into short-form video. Won first place at the ",
      { text: "global student startup competition", href: "https://globalstudentstartup.org/" },
      " in Seoul.",
    ],
  },
  {
    company: "Gait",
    role: "Founding Engineer",
    period: "Sep – Dec 2025",
    description: [
      "Built a computer vision product that analyzes walking patterns to support early detection of dementia and Alzheimer's.",
    ],
  },
  {
    company: "Rumo",
    role: "Founding Engineer",
    period: "Sep – Dec 2025",
    description: [
      "Built a platform helping international high school students manage the college application process, with dashboards, reminders, and live status tracking for their counselors.",
    ],
  },
  {
    company: "Arista Networks",
    role: "Software Engineering & Product Intern",
    period: "May – Aug 2025",
    description: [
      "Built parsers that ingest existing Cisco and Juniper network configuration files and translate them into Arista's EOS format, letting customers migrate to Arista hardware without rewriting their configurations by hand.",
    ],
  },
];

export interface FeaturedPhoto {
  src: string;
  title: string;
  place: string;
  /** Grid emphasis on desktop. */
  wide?: boolean;
  tall?: boolean;
}

export const featuredPhotos: FeaturedPhoto[] = [
  { src: "/featured/craterlake.jpg", title: "Still Morning", place: "Crater Lake, OR", wide: true },
  { src: "/featured/goat.jpg", title: "The Local", place: "Colchuck Lake, WA", tall: true },
  { src: "/featured/hurricane.jpg", title: "Alpenglow", place: "Hurricane Ridge, WA" },
  { src: "/featured/solduc.jpg", title: "Sol Duc", place: "Olympic NP, WA" },
  { src: "/featured/stars.jpg", title: "Clear Night", place: "North Cascades, WA" },
  { src: "/featured/lambo.jpg", title: "Showroom", place: "Automotive series", tall: true },
];

export interface VideoProject {
  title: string;
  /** YouTube/Vimeo embed URL. */
  embedUrl?: string;
  /** Local video file under /public, e.g. "/videos/clip.mp4". */
  videoSrc?: string;
  /** Poster frame for videoSrc, shown before play. */
  poster?: string;
  /**
   * Public Instagram post/reel URL. If videoSrc is also set, this renders as a
   * "View on Instagram" link alongside the self-hosted player; otherwise it
   * falls back to Instagram's own embed card.
   */
  instagramUrl?: string;
}

export const videoProjects: VideoProject[] = [
  {
    title: "Bali",
    videoSrc: "/videos/bali-demo.mp4",
    poster: "/videos/bali-demo-poster.jpg",
    instagramUrl: "https://www.instagram.com/reel/DWrxugwAK1J/",
  },
  {
    title: "Hawaii",
    videoSrc: "/videos/hawaii-demo.mp4",
    poster: "/videos/hawaii-demo-poster.jpg",
    instagramUrl: "https://www.instagram.com/p/DOASjvsjbqh/",
  },
];
