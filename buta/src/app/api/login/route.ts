import { comparePassword } from "@/app/helpers/bcrypt";
import errHandler from "@/app/helpers/errHandler";
import { generateToken } from "@/app/helpers/jwt";
import UserModel from "@/db/models/UserModel";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    if (!email || !password) {
      throw { status: 400, message: "Email and password are required" };
    }

    const user = await UserModel.findByEmail(email);

    if (!user) {
      throw { status: 401, message: "Invalid email or password" };
    }

    const isValid = comparePassword(password, user.password);
    if (!isValid) {
      throw { status: 401, message: "Invalid email or password" };
    }
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const cookieStore = await cookies();
    cookieStore.set("Authorization", `Bearer ${token}`);

    return Response.json({
      accessToken: token,
    });
  } catch (error) {
    return errHandler(error);
  }
}
