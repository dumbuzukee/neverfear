import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/jwt";

const ADMIN_PATHS = [
    "/admin",
];

const AUTH_PATHS = [
    "/login",
    "/register",
];

export async function proxy(request: NextRequest) {
    const cookie = request.cookies.get("token")?.value;
    const pathname = request.nextUrl.pathname;

    if (
        !cookie &&
        ADMIN_PATHS.some((path) => pathname.startsWith(path))
    ) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    };

    if (!cookie) {
        return NextResponse.next();
    };

    const payload = await decrypt(cookie);

    if (
        payload &&
        AUTH_PATHS.some((path) => pathname.startsWith(path))
    ) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    };

    if (
        ["user", "guest"].some((role) => payload.role === role) &&
        ADMIN_PATHS.some((path) => pathname.startsWith(path))
    ) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    };

    return NextResponse.next();
};

export const config = {
    matcher: [
        "/admin/:path*",
        "/login",
        "/register"
    ],
};