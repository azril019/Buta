import { ObjectId } from "mongodb";
import { db } from "../config/mongodb";

class WishlistModel {
  static collection() {
    return db.collection("wishlists");
  }
  static async addToWishlist(data: { userId: string; productId: string }) {
    await this.collection().insertOne({
      userId: new ObjectId(data.userId),
      productId: new ObjectId(data.productId),
    });
    return "Success add to wishlist";
  }

  static async checkWishlist(data: { userId: string; productId: string }) {
    const wishlistItem = await this.collection().findOne({
      userId: new ObjectId(data.userId),
      productId: new ObjectId(data.productId),
    });
    return wishlistItem;
  }

  static async getWishlist(userId: string) {
    const result = await this.collection()
      .aggregate([
        {
          $match: { userId: new ObjectId(userId) },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
      ])
      .toArray();
    return result;
  }

  static async removeFromWishlist(data: { userId: string; productId: string }) {
    const wishlistItem = await this.collection().findOne({
      userId: new ObjectId(data.userId),
      productId: new ObjectId(data.productId),
    });

    if (!wishlistItem) {
      throw { status: 404, message: "Wishlist not found" };
    }

    // Fix: Call deleteOne on the collection, not on the document
    await this.collection().deleteOne({
      userId: new ObjectId(data.userId),
      productId: new ObjectId(data.productId),
    });

    return "Wishlist item deleted successfully";
  }
}

export default WishlistModel;
