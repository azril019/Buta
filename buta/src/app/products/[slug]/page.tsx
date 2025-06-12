import Link from "next/link";
import { notFound } from "next/navigation";
import WishlistButton from "@/components/WishlistButton";
import ImageCarousel from "@/components/ImageCarousel";
import SizeSelector from "@/components/SizeSelector";
import type { Metadata } from "next";
import { ProductType } from "@/app/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const product: ProductType = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`
  ).then((res) => res.json());
  return {
    title: product.slug + " - Buta",
    description: product.description,
  };
}

async function getProduct(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading product:", error);
    return null;
  }
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }
  const tags: string[] = product.tags || [
    "Featured",
    "New Arrival",
    "Limited Edition",
  ];
  const sizes = Array.from({ length: 45 - 38 + 1 }, (_, i) => 38 + i);

  return (
    <div className="container mx-auto px-4 pt-28 pb-8 ">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image - Now using the Carousel component */}
          <div className="md:w-1/2 bg-white-100 flex items-center justify-center p-4">
            <ImageCarousel images={product.images} alt={product.name} />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-8 md:pl-0 md:pr-4">
            {/* Category */}
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {product.category}
            </div>

            {/* Product Name */}
            <h1 className="mt-2 text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Tags with Pill Design */}
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-black-800"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Size Selector */}
            <SizeSelector sizes={sizes} />

            {/* Description */}
            <div className="mt-6 text-gray-700 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Price */}
            <div className="mt-8 flex items-center">
              <span className="text-3xl font-bold text-gray-900">
                Rp.{product.price.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-gray-500">IDR</span>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="bg-gray-200 text-black px-6 py-3 rounded-md font-medium flex items-center gap-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors">
                {/* Keranjang Icon Baru */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.5l1.664 12.03a2.25 2.25 0 002.244 1.97h8.684a2.25 2.25 0 002.244-1.97L20.25 6.75H5.25"
                  />
                  <circle cx="7.5" cy="20.5" r="1.5" />
                  <circle cx="17.5" cy="20.5" r="1.5" />
                </svg>
                Add to Cart
              </button>
              <WishlistButton productId={product._id} />
            </div>
          </div>
        </div>

        {/* Back to Products - Enhanced with better styling */}
        <div className="p-6 border-t border-gray-200">
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 transition-colors group font-medium"
          >
            {/* Ikon panah kiri modern */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
