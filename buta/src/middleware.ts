import { cookies } from "next/headers";
import errHandler from "./app/helpers/errHandler";
import { verifyTokenJose } from "./app/helpers/jwt";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  console.log("masuk middleware");

  const pathname = new URL(request.url).pathname;

  try {
    const cookieStore = await cookies();
    const authorization = cookieStore.get("Authorization");

    if (!authorization) {
      if (pathname.startsWith("/api/")) {
        throw { status: 401, message: "Unauthorized, please login first" };
      }
      if (pathname === "/wishlist") {
        return NextResponse.redirect(
          new URL("/account?loginRequired=1", request.url)
        );
      }
      return NextResponse.redirect(
        new URL("/account?loginRequired=1", request.url)
      );
    }

    const [type, token] = authorization.value.split(" ");
    if (type !== "Bearer") {
      if (pathname.startsWith("/api/")) {
        throw { status: 401, message: "Unauthorized" };
      }
      if (pathname === "/wishlist") {
        return NextResponse.redirect(
          new URL("/account?loginRequired=1", request.url)
        );
      }
      return NextResponse.redirect(
        new URL("/account?loginRequired=1", request.url)
      );
    }

    const decoded = await verifyTokenJose<{ userId: string; email: string }>(
      token
    );

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded.userId);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  } catch (error) {
    if (pathname.startsWith("/api/")) {
      return errHandler(error);
    }
    return NextResponse.redirect(
      new URL("/account?loginRequired=1", request.url)
    );
  }
}

export const config = {
  matcher: ["/api/wishlist/:path*", "/wishlist"],
};
