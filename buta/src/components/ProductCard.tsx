"use client";

import React from "react";
import Link from "next/link";
import WishlistButton from "./WishlistButton";
import Image from "next/image";
interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  thumbnail: string;
  category?: string;
  tags?: string[] | string;
  excerpt?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="relative bg-white rounded-sm shadow-sm pb-4">
      {/* Product image - consistent height for all images */}
      <div className="aspect-square overflow-hidden mb-3">
        <Link href={`/products/${product.slug}`}>
          <Image
            width={300}
            height={300}
            src={product.thumbnail || "/placeholder.png"}
            alt={product.name}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Product info with consistent formatting */}
      <div className="px-4">
        <div className="text-xs text-gray-500 uppercase font-medium mb-1">
          {product.category || product.excerpt || "Brand"}
        </div>

        <h3 className="font-medium text-sm mb-1 line-clamp-2">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="font-medium text-sm mb-1">
          Rp {product.price.toLocaleString("id-ID")}
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {product.tags &&
            (typeof product.tags === "string"
              ? (product.tags as string)
                  .split(" ")
                  .map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600"
                    >
                      {tag.trim()}
                    </span>
                  ))
              : Array.isArray(product.tags) &&
                product.tags.map((tag, index: number) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600"
                  >
                    {tag}
                  </span>
                )))}
        </div>

        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {product.description}
        </p>
      </div>

      {/* Added container with flex and justify-end to move button to the right */}
      <div className="px-4 flex justify-end">
        <WishlistButton productId={product._id} />
      </div>
    </div>
  );
};

export default ProductCard;
