"use client";

import errHandler from "@/app/helpers/errHandler";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface WishlistButtonProps {
  productId: string | number;
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlisted, setIsWishtlisted] = useState(false);

  useEffect(() => {
    async function checkWishlist() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`
        );
        if (response.ok) {
          const data = await response.json();
          setIsWishtlisted(
            data.some(
              (item: unknown) =>
                (item as { productId: string | number }).productId === productId
            )
          );
        }
      } catch (error) {
        errHandler(error);
      }
    }
    checkWishlist();
  }, [productId]);

  const addToWishlist = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to wishlist");
      }
      toast.success("Added to wishlist!");
      setIsWishtlisted(true);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={addToWishlist}
      disabled={isLoading || isWishlisted}
      className={`bg-white border ${
        isWishlisted ? "border-red-500" : "border-black-400"
      } ${
        isWishlisted ? "text-red-500" : "text-black-600"
      } p-3 rounded-full hover:bg-red-100 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 transition-colors flex items-center justify-center`}
      aria-label="Add to wishlist"
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : isWishlisted ? (
        <svg
          className="w-5 h-5 text-red-500"
          fill="currentColor"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-black-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  );
}
