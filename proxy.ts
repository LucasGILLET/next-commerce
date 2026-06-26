import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname, searchParams } = req.nextUrl;

  // Protection admin
  if (pathname.startsWith("/admin")) {
    if (req.auth?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return;
  }

  // A/B testing : attribution du variant
  const override = searchParams.get("ab_prefetch");
  const existing = req.cookies.get("ab")?.value;

  const variant: "A" | "B" =
    override === "A" || override === "B"
      ? override
      : existing === "A" || existing === "B"
      ? existing
      : Math.random() < 0.5
      ? "A"
      : "B";

  // Cookie déjà correct → rien à faire
  if (existing === variant && !override) return;

  const res = NextResponse.next();
  res.cookies.set("ab", variant, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 jours
    sameSite: "lax",
  });
  return res;
});

export const config = {
  matcher: [
    // Toutes les routes sauf fichiers statiques Next.js et API auth
    "/((?!_next/static|_next/image|favicon\\.ico|api/auth).*)",
  ],
};
