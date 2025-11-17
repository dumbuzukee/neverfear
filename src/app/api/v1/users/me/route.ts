import { getAuth } from "@/lib/auth";

export async function GET() {
    try {
        const auth = await getAuth({
            withAdminRole: true,
        });

        if (!auth.success) {
            return Response.json({
                ok: false,
                message: auth.message,
            });
        };

        return Response.json({
            ok: true,
            message: "Authorized",
            data: auth.data,
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};