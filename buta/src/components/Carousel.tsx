"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SlideProps {
  id: number;
  image: string;
  title: string;
  description: string;
  isPromotion?: boolean;
  promotionType?: "summer" | "women" | "men" | "kids";
}

interface CarouselProps {
  slides: SlideProps[];
  autoplayInterval?: number;
  fullScreen?: boolean;
}

export default function Carousel({
  slides,
  autoplayInterval = 5000,
}: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setAnimationKey((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setAnimationKey((prev) => prev + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplayInterval]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-full relative flex items-center justify-center"
          >
            <div className="absolute inset-0 w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            {slide.isPromotion && slide.promotionType === "summer" ? (
              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white w-full max-w-4xl px-4 py-6">
                <h3 className="text-xl md:text-2xl font-light mb-1 text-shadow-xl">
                  SUMMER SALE
                </h3>
                <h2 className="text-3xl md:text-5xl font-bold tracking-wider mb-6 text-shadow-xl">
                  UP TO 20% OFF
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-3 mt-4">
                  <button
                    onClick={() =>
                      (window.location.href = `/products?search=wanita`)
                    }
                    className="bg-white text-black py-2 px-6 text-sm font-semibold hover:bg-gray-100 hover:text-red-500 transition shadow-lg"
                  >
                    WANITA
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `/products?search=pria`)
                    }
                    className="bg-white text-black py-2 px-6 text-sm font-semibold hover:bg-gray-100 hover:text-red-500 transition shadow-lg"
                  >
                    PRIA
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `/products?search=anak`)
                    }
                    className="bg-white text-black py-2 px-6 text-sm font-semibold hover:bg-gray-100 hover:text-red-500 transition shadow-lg"
                  >
                    ANAK-ANAK
                  </button>
                </div>
              </div>
            ) : slide.isPromotion && slide.promotionType === "women" ? (
              <div className="relative z-10 flex flex-col items-center justify-center text-center text-white w-full max-w-4xl px-4 py-6">
                <h2 className="text-4xl md:text-4xl font-bold tracking-widest mb-8 text-shadow-xl">
                  WOMEN&apos;S COLLECTION
                </h2>
                <div className="mt-4">
                  <button
                    onClick={() =>
                      (window.location.href = `/products?search=wanita`)
                    }
                    className="bg-white text-black py-2 px-10 text-sm font-semibold hover:bg-gray-100 hover:text-red-500 transition shadow-lg"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            ) : !slide.isPromotion ? (
              <div className="relative z-10 text-white text-center p-6 max-w-3xl bg-black bg-opacity-40 rounded-lg mx-4">
                <h2 className="text-4xl font-bold mb-3">{slide.title}</h2>
                <p className="text-xl">{slide.description}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-red-500 p-3 rounded-full transition-all duration-200"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-red-500 p-3 rounded-full transition-all duration-200"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Timer Progress Line - CSS animation based */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <div className="h-1">
          <div
            key={animationKey}
            className="h-full bg-white"
            style={{
              animation: `progressAnimation ${autoplayInterval}ms linear`,
              transformOrigin: "left",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
