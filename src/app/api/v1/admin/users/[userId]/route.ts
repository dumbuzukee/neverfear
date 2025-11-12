import { getAuth } from "@/lib/auth";
import { UserService } from "@/services/users.service";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
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

        const { userId } = await params;

        const user = await UserService
            .getById(userId);

        if (!user) {
            return Response.json({
                ok: false,
                message: "User not found",
            });
        };

        if (user.username === auth.data?.username) {
            return Response.json({
                ok: false,
                message: "You are not allowed to delete your account",
            });
        };

        if (
            auth.data?.role !== "dev" &&
            user.role === "admin"
        ) {
            return Response.json({
                ok: false,
                message: "You are not allowed to delete administrator",
            });
        };

        const deletedUser = await UserService
            .delete(userId);

        if (!deletedUser) {
            return Response.json({
                ok: false,
                message: "Unable to delete account",
            });
        };

        return Response.json({
            ok: true,
            message: "Account deleted successfully",
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
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
            password,
            balance,
            totalBalance,
            role,
        }: {
            password?: string;
            balance?: number;
            totalBalance?: number;
            role?: "admin" | "user" | "guest";
        } = await request.json();

        const { userId } = await params;

        const user = await UserService
            .getById(userId);

        if (!user) {
            return Response.json({
                ok: false,
                message: "User not found",
            });
        };

        const updatedUser = await UserService
            .update(userId, {
                password,
                balance,
                totalBalance,
                role,
            });

        if (!updatedUser) {
            return Response.json({
                ok: false,
                message: "Unable to update account",
            });
        };

        return Response.json({
            ok: true,
            message: "Account updated successfully",
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};