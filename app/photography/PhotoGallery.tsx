"use client";

import { useState } from "react";
import Image from "next/image";
import { Photo, photos, categories } from "./photos";
import PhotoModal from "./PhotoModal";

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filtered =
    selectedCategory === "all"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = selectedCategory === category.value;
          return (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-accent text-white"
                  : "border border-line text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
        {filtered.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="group relative aspect-square overflow-hidden rounded-md bg-line"
          >
            <Image
              src={photo.imagePath}
              alt={photo.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted">Nothing here yet — check back soon.</p>
      )}

      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </div>
  );
}
