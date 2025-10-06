'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Photo, photos, categories } from './photos';
import PhotoModal from './PhotoModal';

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos =
    selectedCategory === 'all'
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No photos available yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]">
          {filteredPhotos.map((photo) => {
            // Dynamic grid spanning based on orientation
            const gridClass =
              photo.orientation === 'vertical'
                ? 'row-span-2'
                : photo.orientation === 'square'
                ? 'lg:col-span-2 row-span-2'
                : 'lg:col-span-2';

            return (
              <div
                key={photo.id}
                className={`group cursor-pointer bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${gridClass}`}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative w-full h-full bg-gray-200 dark:bg-gray-800">
                  <Image
                    src={photo.imagePath}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {selectedPhoto && (
        <PhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </div>
  );
}
