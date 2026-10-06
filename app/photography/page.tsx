import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PhotoGallery from "./PhotoGallery";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Photography",
  description: `Full photography archive by ${site.name} — landscapes, night skies, and cars.`,
};

export default function PhotographyPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-8 pt-32 sm:px-8">
      <Reveal>
        <h1 className="text-4xl sm:text-5xl">Photography</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          I love shooting nature, cars, and people — reach out for prints or
          shoots.
        </p>
      </Reveal>

      <div className="mt-12">
        <PhotoGallery />
      </div>
    </div>
  );
}
