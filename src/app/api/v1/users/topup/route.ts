import { getAuth } from "@/lib/auth";
import { redeemGiftVoucher } from "@/lib/topup";
import { validateTurnstile } from "@/lib/turnstile";
import { TopupService } from "@/services/topups.service";
import { UserService } from "@/services/users.service";

export async function POST(request: Request) {
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

        const {
            voucherCode,
            turnstileToken,
        }: {
            voucherCode: string;
            turnstileToken: string;
        } = await request.json();

        /*

        if (!turnstileToken) {
            return Response.json({
                ok: false,
                message: "This 'turnstileToken' field is required",
            });
        };

        const validatedTurnstile = await validateTurnstile(turnstileToken);

        if (!validatedTurnstile.success) {
            return Response.json({
                ok: false,
                message: validatedTurnstile.message,
            });
        };

        */

        const redeemedGiftVoucher = await redeemGiftVoucher(voucherCode);

        if (!redeemedGiftVoucher.success) {
            return Response.json({
                ok: false,
                message: redeemedGiftVoucher.message,
            });
        };

        const {
            ownerName,
            amount,
            voucher,
        } = redeemedGiftVoucher.data as { ownerName: string, amount: number, voucher: string };

        const user = await UserService
            .getByUsername(auth.data?.username as string);

        if (!user) {
            return Response.json({
                ok: false,
                message: "User not found",
            });
        };

        const updatedUser = await UserService
            .update(user._id, {
                balance: Number(user.balance) + Number(amount),
                totalBalance: Number(user.totalBalance) + Number(amount),
                role: (user.balance === 0 && user.role === "guest")
                    ? "user"
                    : undefined,
            });

        if (!updatedUser) {
            return Response.json({
                ok: false,
                message: "Unable to update user",
            });
        };

        return Response.json({
            ok: true,
            message: "Topped-up successfully",
            data: {
                ownerName,
                voucher,
            },
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};
