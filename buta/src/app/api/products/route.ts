import ProductModel from "@/db/models/ProductModel";

interface Product {
  name?: string;
  description?: string;
  excerpt?: string;
  [key: string]: unknown;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "8");
  const search = searchParams.get("search")?.toLowerCase() || "";

  const validPage = page > 0 ? page : 1;
  const validLimit = limit > 0 ? limit : 8;

  const skip = (validPage - 1) * validLimit;

  try {
    let allProducts = await ProductModel.getAll();

    if (search) {
      allProducts = allProducts.filter(
        (product: Product) =>
          product.name?.toLowerCase().includes(search) ||
          product.description?.toLowerCase().includes(search) ||
          product.excerpt?.toLowerCase().includes(search)
      );
    }

    const paginatedProducts = allProducts.slice(skip, skip + validLimit);

    return Response.json(paginatedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
