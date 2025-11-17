import { getAuth } from "@/lib/auth";
import { UserService } from "@/services/users.service";

interface ParamsProps {
    userId: string;
};

interface AddBalanceProps {
    amount: number;
};

export async function PUT(
    request: Request,
    { params }: { params: Promise<ParamsProps> }
) {
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

        const { amount }: AddBalanceProps = await request.json();
        const { userId } = await params;

        const user = await UserService
            .getById(userId);

        if (!user) {
            return Response.json({
                ok: false,
                message: "User not found",
            });
        };

        user.balance += amount;
        user.totalBalance += amount;
        
        await user.save();

        return Response.json({
            ok: true,
            message: `Mannual topped-up successful, Account (${user.username}) received ${amount}฿ from ${auth.data.username}`
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};