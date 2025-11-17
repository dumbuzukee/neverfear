import { deleteCookie } from "@/lib/cookie";

export async function POST() {
    try {
        await deleteCookie();
        
        return Response.json({
            ok: true,
            message: "Logged out successful",
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};