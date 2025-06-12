import { NewUser } from "@/app/types";
import { db } from "../config/mongodb";
import { z } from "zod";
import { hashPassword } from "@/app/helpers/bcrypt";

const NewUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  Name: z.string().min(2, "Name must be at least 2 characters long"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  marketing: z.boolean(),
});

class UserModel {
  static collection() {
    return db.collection("users");
  }

  static async create(user: NewUser) {
    NewUserSchema.parse(user);
    const existUser = await this.collection().findOne({
      $or: [
        { email: { $regex: user.email } },
        { username: { $regex: user.email } },
      ],
    });
    if (existUser) throw { status: 400, message: "User already exists" };

    user.password = hashPassword(user.password);

    await this.collection().insertOne(user);
    return "Success register user";
  }

  static async findByEmail(email: string) {
    const user = await this.collection().findOne({
      email: { $regex: email, $options: "i" },
    });
    return user;
  }
}

export default UserModel;
