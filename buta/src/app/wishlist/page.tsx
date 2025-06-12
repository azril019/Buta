"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import RemoveWishlistButton from "../../components/RemoveWishlistButton";
import { ProductType } from "../types";
import Image from "next/image";

// Define the type for wishlist items
interface WishlistItem {
  _id: number;
  userId: number;
  productId: number;
  product: ProductType;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch wishlist");
      }

      const data = await response.json();
      setWishlistItems(data);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    console.log("Removing item with ID:", productId);

    try {
      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      toast.success("Item removed from wishlist");

      fetchWishlist();
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
      toast.error("Failed to remove item");
    }
  };

  const addToCart = async () => {
    try {
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-14 w-14 border-t-3 border-b-3 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-16 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl shadow-sm">
          <div className="w-20 h-20 mb-4 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600 mb-6 text-lg">Your wishlist is empty</p>
          <Link
            href="/products"
            className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md shadow-sm transition-all duration-200 font-medium"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <RemoveWishlistButton
                  productId={item.productId}
                  onRemove={removeFromWishlist}
                />
              </div>

              <div className="p-5 flex-grow flex flex-col">
                {item.product.tags && item.product.tags.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1">
                    {item.product.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 text-black-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="text-xl font-semibold text-gray-800 mb-1 line-clamp-1">
                  {item.product.name}
                </h2>

                <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                  {item.product.excerpt}
                </p>

                <div className="mt-auto">
                  <p className="text-black-100 font-bold mb-4 text-xl">
                    Rp.{item.product.price.toFixed(2)}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart()}
                      className="flex-1 bg-gray-200 text-black py-2.5 rounded-lg text-center hover:bg-gray-400 transition-colors font-medium flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Add to Cart
                    </button>

                    <Link
                      href={`/products/${item.product.slug}`}
                      className="flex-1 bg-gray-200 text-black py-2.5 rounded-lg text-center hover:bg-gray-400 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
