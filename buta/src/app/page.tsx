import Carousel from "@/components/Carousel";
import CategorySection from "@/components/CategorySection";
import RecommendationSection from "@/components/RecommendationSection";
import { ProductType } from "./types";

interface SlideProps {
  id: number;
  image: string;
  title: string;
  description: string;
  isPromotion?: boolean;
  promotionType?: "women" | "summer" | "men" | "kids";
}

export default async function Home() {
  const slides: SlideProps[] = [
    {
      id: 1,
      image: "/carousel1.png",
      title: "Women's Collection",
      description: "Our latest women's fashion",
      isPromotion: true,
      promotionType: "summer",
    },
    {
      id: 2,
      image: "/carousel2.png",
      title: "Summer Sale",
      description: "Hot deals for summer",
      isPromotion: true,
      promotionType: "women",
    },
  ];

  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  const products: ProductType[] = await data.json();

  const recommendedProducts = products.slice(0, 4);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Carousel slides={slides} autoplayInterval={5000} />

      <CategorySection />

      <RecommendationSection products={recommendedProducts} />
    </main>
  );
}
