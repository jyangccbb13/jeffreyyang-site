"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Photo } from "./photos";

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fade-up fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-sm text-white/70 hover:text-white"
      >
        Close ✕
      </button>
      <div
        className="relative max-h-[85vh] w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mx-auto flex max-h-[85vh] justify-center">
          <Image
            src={photo.imagePath}
            alt={photo.title}
            width={1600}
            height={1067}
            className="h-auto max-h-[85vh] w-auto rounded-md object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
        {photo.description && (
          <p className="mt-3 text-center text-sm text-white/60">{photo.description}</p>
        )}
      </div>
    </div>
  );
}
