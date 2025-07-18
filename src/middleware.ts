import { type NextRequest, NextResponse } from "next/server";

// Конфигурация роутов
const ROUTES = {
  public: {
    auth: "/auth",
    signIn: "/auth/sign-in",
  },
  private: {
    profile: "/profile",
    dashboard: "/dashboard",
    cart: "/cart",
  },
  defaultRedirect: {
    auth: "/profile",
    unAuth: "/auth/sign-in",
  },
};

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("authjs.session-token")?.value;

  const isAuthRoute = pathname.startsWith(ROUTES.public.auth);
  const isPrivateRoute = Object.values(ROUTES.private).some((route) =>
    pathname.startsWith(route)
  );

  if (isAuthRoute) {
    if (session) {
      const redirectUrl = new URL(ROUTES.defaultRedirect.auth, request.url);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  if (isPrivateRoute && !session) {
    const redirectUrl = new URL(ROUTES.defaultRedirect.unAuth, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Публичные роуты
    "/auth/:path*",
    // Приватные роуты
    "/profile/:path*",
    "/dashboard/:path*",
    "/cart/:path*",
  ],
};
