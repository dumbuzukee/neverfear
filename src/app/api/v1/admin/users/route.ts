import { getAuth } from "@/lib/auth";
import { UserService } from "@/services/users.service";

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

        const users = await UserService
            .getAll();

        return Response.json({
            ok: true,
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};