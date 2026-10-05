// ---------------------------------------------------------------------------
// "In frame" photo grid on the About page. Drop 4 images into public/about/
// (named photo-1.jpg .. photo-4.jpg, or update the paths below to match
// whatever you name them) and swap in real captions.
// ---------------------------------------------------------------------------

export interface AboutPhoto {
  src: string;
  caption: string;
}

export const aboutPhotos: AboutPhoto[] = [
  { src: "/about/photo-1.jpg", caption: "[Caption 1]" },
  { src: "/about/photo-2.jpg", caption: "[Caption 2]" },
  { src: "/about/photo-3.jpg", caption: "[Caption 3]" },
  { src: "/about/photo-4.jpg", caption: "[Caption 4]" },
];
