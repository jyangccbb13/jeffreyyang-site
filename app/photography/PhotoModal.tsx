'use client';

import { Photo } from './photos';
import Image from 'next/image';

interface PhotoModalProps {
  photo: Photo;
  onClose: () => void;
}

export default function PhotoModal({ photo, onClose }: PhotoModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-gray-800">
          <Image
            src={photo.imagePath}
            alt={photo.title}
            fill
            className="object-contain"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>

        <div className="p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
