import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}

export const config = {
  matcher: ["/"],
};