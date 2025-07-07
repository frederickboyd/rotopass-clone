import { NextResponse, NextRequest } from "next/server";
import { getCookie } from "./lib/cookie";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.pathname;
  const token = await getCookie("Bearer_token");
  // Redirect to login if the user is not authenticated and trying to access a protected route
  if (["/login", "/register"].includes(path)) {
    return NextResponse.redirect(new URL(`/auth${path}`, request.url));
  }

  if (path === "/account" && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (path === "/auth/logout") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access to the login page without authentication
  if (path.includes("/auth") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // For all other routes, continue as normal
  return NextResponse.next();
}
