import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const demoParam = url.searchParams.get("demo");

  if(demoParam) {
    return NextResponse.redirect(new URL(`/demo?demo=${demoParam}`, request.url));
  }

  if (request.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }
}

export const config = {
  matcher: ["/"],
};