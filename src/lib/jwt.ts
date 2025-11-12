import { jwtVerify, SignJWT } from "jose";

const key = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export const encrypt = async (payload: any) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1hour")
        .sign(key);
};

export const decrypt = async (value: string) => {
    const { payload } = await jwtVerify(value, key, {
        algorithms: ["HS256"],
    });
    return payload;
};