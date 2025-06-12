"use client";
import { useState } from "react";

type SizeSelectorProps = {
  sizes: number[];
};

export default function SizeSelector({ sizes }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<number>(sizes[0]);

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Pilih Ukuran Sepatu
      </label>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setSelectedSize(size)}
            className={`w-10 h-10 flex items-center justify-center border rounded-md text-base font-semibold transition
              ${
                selectedSize === size
                  ? "bg-gray-600 text-white border-gray-800"
                  : "bg-white text-gray-800 border-gray-300 hover:border-black-800"
              }
            `}
          >
            {size}
          </button>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Ukuran terpilih: <span className="font-semibold">{selectedSize}</span>
      </div>
    </div>
  );
}
