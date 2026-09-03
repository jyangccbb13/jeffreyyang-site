import type { Metadata } from "next";
import Link from "next/link";
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
        <p className="text-sm uppercase tracking-[0.2em] text-faint">Archive</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Photography</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Landscapes from the Cascades and Olympics, the occasional night sky,
          and an automotive series. Prints are available —{" "}
          <Link href="/contact" className="text-accent link-underline">
            reach out
          </Link>{" "}
          for sizes and pricing.
        </p>
      </Reveal>

      <div className="mt-12">
        <PhotoGallery />
      </div>
    </div>
  );
}
