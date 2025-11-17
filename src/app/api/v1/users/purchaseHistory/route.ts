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
            .getByUsername(auth.data.username);

        const purchaseHistories = await PurchaseService
            .getAll(user._id);

        return Response.json({
            ok: true,
            message: "Purchased histories fetched successfully",
            data: purchaseHistories,
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};