import Link from "next/link";
import { ProductType } from "@/app/types";
import Image from "next/image";

interface RecommendationSectionProps {
  products: ProductType[];
  title?: string;
  showAllLink?: string;
}

export default function RecommendationSection({
  products,
  title = "Direkomendasi Untuk Anda",
  showAllLink = "/products",
}: RecommendationSectionProps) {
  return (
    <section className="py-6 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Header with title and See All link */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{title}</h2>
          <Link
            href={showAllLink}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center"
          >
            Lihat Semua
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={`rec-${product._id}`}
              className="relative bg-white rounded-sm shadow-sm pb-4"
            >
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
                  {product.excerpt || "Brand"}
                </div>

                <h3 className="font-medium text-sm mb-1 line-clamp-2">
                  <Link href={`/product/${product._id}`}>{product.name}</Link>
                </h3>

                <div className="font-medium text-sm mb-1">
                  Rp {product.price?.toLocaleString("id-ID") || "0"}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
