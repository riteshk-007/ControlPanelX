import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const { pathname } = req.nextUrl;

  // Redirect authenticated users from login and landing routes
  if (session) {
    if (["/login-user", "/admin-login", "/"].includes(pathname)) {
      const user = session.user;
      const redirectUrl = user.isAdmin ? "/admin-dashboard" : "/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
  }

  // Check if the user is authenticated
  if (!session) {
    // Redirect unauthenticated users to the login page
    if (["/admin-dashboard", "/dashboard"].includes(pathname)) {
      return NextResponse.redirect(new URL("/login-user", req.url));
    }
    return NextResponse.next();
  }

  // Get the user object from the session
  const user = session.user;

  // Check if the user is an admin
  if (!user.isAdmin) {
    // Redirect non-admin users from admin routes
    if (["/admin-dashboard", "/admin-login"].includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Redirect admin users from non-admin routes
  if (["/login-user", "/dashboard"].includes(pathname)) {
    return NextResponse.redirect(new URL("/admin-dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/dashboard",
    "/login-user",
    "/admin-login",
    "/",
  ],
};
