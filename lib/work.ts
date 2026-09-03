// ---------------------------------------------------------------------------
// Portfolio content for the Work page.
// ---------------------------------------------------------------------------

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
  role: string;
  description: string;
  /** YouTube/Vimeo embed URL, or leave "" to show a placeholder card. */
  embedUrl: string;
}

export const videoProjects: VideoProject[] = [
  {
    title: "[Project One]",
    role: "Shot & edited",
    description:
      "Placeholder — a short travel / event / brand film. Note the camera, the cut length, and what you were going for.",
    embedUrl: "",
  },
  {
    title: "[Project Two]",
    role: "Editor",
    description:
      "Placeholder — describe the footage you were handed and how you shaped it into a story.",
    embedUrl: "",
  },
];
