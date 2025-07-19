import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getUserRole } from "./features/user/lib/get-user-role";

const ROUTES = {
  public: {
    auth: "/auth",
    signIn: "/auth/sign-in",
  },
  private: {
    profile: "/profile",
    dashboard: "/dashboard",
    cart: "/cart",
    admin: "/profile/admin",
  },
  defaultRedirect: {
    auth: "/profile",
    unAuth: "/auth/sign-in",
    noPermission: "/profile",
  },
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (pathname.startsWith(ROUTES.private.admin)) {
    if (!session?.sub) {
      return NextResponse.redirect(
        new URL(ROUTES.defaultRedirect.unAuth, request.url)
      );
    }

    const userRole = await getUserRole(session.sub);
    if (userRole?.role !== "admin") {
      return NextResponse.redirect(
        new URL(ROUTES.defaultRedirect.noPermission, request.url)
      );
    }
  }

  const isAuthRoute = pathname.startsWith(ROUTES.public.auth);
  const isPrivateRoute = Object.values(ROUTES.private).some((route) =>
    pathname.startsWith(route)
  );

  if (isAuthRoute) {
    if (session) {
      return NextResponse.redirect(
        new URL(ROUTES.defaultRedirect.auth, request.url)
      );
    }
    return NextResponse.next();
  }

  if (isPrivateRoute && !session) {
    return NextResponse.redirect(
      new URL(ROUTES.defaultRedirect.unAuth, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Публичные роуты
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|auth).*)",
    "/api/:path*",
    "/auth/:path*",
    // Приватные роуты
    "/profile/:path*",
    "/dashboard/:path*",
    "/cart/:path*",
  ],
};
