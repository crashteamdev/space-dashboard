import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const demoToken = searchParams.get("demo");
  if (demoToken) {
    if (pathname === "/") {
      const response = NextResponse.redirect(new URL("/profile", request.url));
      response.cookies.set("demo_token", demoToken, {
        path: "/",
        maxAge: 60 * 60,
      });
      return response;
    } else {
      const response = NextResponse.next();
      response.cookies.set("demo_token", demoToken, {
        path: "/",
        maxAge: 60 * 60,
      });
      return response;
    }
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
