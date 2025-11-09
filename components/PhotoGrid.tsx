import Image from "next/image";

const galleryImages = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
  "/images/gallery-6.jpg",
];

export default function PhotoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {galleryImages.map((src, index) => (
        <div
          key={index}
          className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
        >
          <Image
            src={src}
            alt={`Gallery image ${index + 1}`}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
        </div>
      ))}
    </div>
  );
}

