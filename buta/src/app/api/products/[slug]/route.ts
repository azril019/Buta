import errHandler from "@/app/helpers/errHandler";
import ProductModel from "@/db/models/ProductModel";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await ProductModel.getBySlug(slug);
    if (!product) {
      throw { status: 404, message: "Product not found" };
    }
    return Response.json(product);
  } catch (error) {
    return errHandler(error);
  }
}
