"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="w-full bg-white flex flex-col items-center gap-4">
      {/* Main Image */}
      <div className="relative w-full max-w-md aspect-square rounded-xl shadow-md flex items-center justify-center overflow-hidden bg-white">
        <Image
          src={images[selected]}
          alt={alt}
          fill
          className="object-contain transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {/* Thumbnails */}
      <div className="flex gap-3 mt-2">
        {images.map((img, idx) => (
          <button
            key={img}
            onClick={() => setSelected(idx)}
            className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none ${
              idx === selected
                ? "border-indigo-300 ring-2 ring-indigo-200 bg-white"
                : "border-gray-200 hover:border-indigo-300 bg-white"
            }`}
            aria-label={`Preview ${idx + 1}`}
            type="button"
          >
            <Image
              src={img}
              alt={`${alt} preview ${idx + 1}`}
              fill
              className="object-cover bg-white"
              sizes="56px"
            />
            {idx === selected && (
              <span className="absolute inset-0 rounded-lg ring-2 ring-indigo-400 pointer-events-none"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
