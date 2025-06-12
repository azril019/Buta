import WishlistModel from "@/db/models/WishlistModel";
import errHandler from "@/app/helpers/errHandler";

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) throw { status: 400, message: "User ID is required" };
    const wishlist = await WishlistModel.getWishlist(userId);
    if (!wishlist) throw { status: 404, message: "Wishlist not found" };
    return Response.json(wishlist);
  } catch (error) {
    return errHandler(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId } = body;
    if (!productId) throw { status: 400, message: "Product ID is required" };

    const userId = request.headers.get("x-user-id");

    if (!userId) throw { status: 400, message: "User ID is required" };

    const existingItem = await WishlistModel.checkWishlist({
      userId,
      productId,
    });

    if (existingItem) {
      throw { status: 400, message: "This item is already in your wishlist" };
    }

    await WishlistModel.addToWishlist({
      userId,
      productId,
    });

    return Response.json(
      { message: "Success add to wishlist" },
      { status: 201 }
    );
  } catch (error) {
    return errHandler(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) throw { status: 400, message: "User ID is required" };
    const body = await request.json();
    const { productId } = body;
    if (!productId)
      throw { status: 400, message: "Wishlist item ID is required" };
    await WishlistModel.removeFromWishlist({ userId, productId });
    return Response.json({ message: "Success remove from wishlist" });
  } catch (error) {
    return errHandler(error);
  }
}
