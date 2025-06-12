import { db } from "../config/mongodb";

class ProductModel {
  static collection() {
    return db.collection("products");
  }

  static async getAll() {
    return this.collection().find().toArray();
  }

  static async getBySlug(slug: string) {
    return this.collection().findOne({ slug });
  }
}

export default ProductModel;
