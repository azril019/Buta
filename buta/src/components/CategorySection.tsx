import Link from "next/link";
import Image from "next/image";

interface CategoryProps {
  image: string;
  title: string;
  slug: string;
}

export default function CategorySection() {
  const categories: CategoryProps[] = [
    {
      image: "/category/koleksi-wanita.png",
      title: "KOLEKSI WANITA",
      slug: "wanita",
    },
    {
      image: "/category/koleksi-pria.png",
      title: "KOLEKSI PRIA",
      slug: "pria",
    },
    {
      image: "/category/koleksi-anak-anak.png",
      title: "KOLEKSI ANAK-ANAK",
      slug: "anak",
    },
    {
      image: "/category/koleksi-sneakers.png",
      title: "KOLEKSI SNEAKERS",
      slug: "sneakers",
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">
          Unleash The Power In Every Step
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link
              href={`/products?search=${category.slug}`}
              key={index}
              className="relative overflow-hidden group"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl md:text-2xl font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {category.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
