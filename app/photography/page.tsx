import PhotoGallery from './PhotoGallery';

export default function PhotographyPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Photos</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          All photos will be re-edited for coloring and cropping before shipping. Framing options include 8x10 and 18x24.
        </p>
      </div>

      <PhotoGallery />
    </section>
  );
}
  