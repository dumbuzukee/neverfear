import { getAuth } from "@/lib/auth";

export async function GET() {
    try {
        const auth = await getAuth({
            withAdminRole: false,
        });

        if (!auth.success) {
            return Response.json({
                ok: false,
                message: auth.message,
            });
        };

        return Response.json({
            ok: true,
            message: auth.message,
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