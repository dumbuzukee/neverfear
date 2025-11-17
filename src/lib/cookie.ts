import { cookies } from "next/headers";
import { decrypt, encrypt } from "./jwt";

const cookieName = "token";
const cookieSecure = process.env.NODE_ENV === "production";
const cookieMaxAge = 24 * 60 * 60;

export const setCookie = async (payload: any) => {
    const cookie = await encrypt(payload);
    (await cookies()).set(cookieName, cookie, {
        httpOnly: true,
        sameSite: "strict",
        secure: cookieSecure,
        maxAge: cookieMaxAge,
    });
    return cookie;
};

export const getCookie = async () => {
    const value = (await cookies()).get(cookieName)?.value;
    if (!value) return null;
    return await decrypt(value);
};

export const deleteCookie = async () => {
    return (await cookies()).delete(cookieName);
};