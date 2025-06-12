"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { ProductType } from "../types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "next/navigation";

export default function Products() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [products, setProducts] = useState<ProductType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const productsPerPage = 8;

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setIsFirstLoad(true);
  }, [search]);

  useEffect(() => {
    if (isFirstLoad) {
      fetchProducts(1, true);
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, search]);

  const fetchProducts = async (customPage?: number, isReset?: boolean) => {
    try {
      const currentPage = customPage || page;
      const response = await fetch(
        `/api/products?page=${currentPage}&limit=${productsPerPage}&search=${encodeURIComponent(
          search
        )}`
      );
      const newProducts: ProductType[] = await response.json();

      if (newProducts.length < productsPerPage) {
        setHasMore(false);
      }

      setProducts((prev) =>
        isReset ? newProducts : [...prev, ...newProducts]
      );
      setPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        <InfiniteScroll
          dataLength={products.length}
          next={() => fetchProducts()}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center py-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            </div>
          }
          endMessage={
            <p className="text-center py-4">
              <b>You have seen all products</b>
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </main>
  );
}
