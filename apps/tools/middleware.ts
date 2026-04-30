import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const protectedPaths = ["/hook-generator", "/script-writer", "/repurpose", "/brand-pitch", "/brand-intel", "/content-strategy", "/brand-hub", "/account"];

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  // Hostname routing: veelogg.com → (www) route group
  if (hostname === "veelogg.com" || hostname === "www.veelogg.com") {
    const url = request.nextUrl.clone();
    url.pathname = `/_www${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Skip auth when Supabase isn't configured (allows preview without env vars)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isSupabaseConfigured = supabaseUrl && supabaseKey && supabaseUrl !== "http://localhost:54321";

  if (!isSupabaseConfigured) {
    return NextResponse.next({ request });
  }

  // Refresh auth session
  const { supabaseResponse, user } = await updateSession(request);

  // Protect tool routes — redirect unauthenticated users to login
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect logged-in users away from auth pages
  if (user && (pathname === "/login" || pathname === "/signup")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
