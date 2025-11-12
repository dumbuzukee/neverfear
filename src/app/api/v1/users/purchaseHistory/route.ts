import { getAuth } from "@/lib/auth";
import { PurchaseService } from "@/services/purchases.service";
import { UserService } from "@/services/users.service";

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

        const user = await UserService
            .getByUsername(auth.data?.username as string);

        const purchaseHistory = await PurchaseService
            .getAll(user._id);

        return Response.json({
            ok: true,
            message: "Purchases History fetched successfully",
            data: purchaseHistory,
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};