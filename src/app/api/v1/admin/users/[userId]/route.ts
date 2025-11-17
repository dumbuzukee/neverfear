import { getAuth } from "@/lib/auth";
import { UserService } from "@/services/users.service";

interface ParamsProps {
    userId: string;
};

interface UpdateProps {
    password?: string;
    balance?: number;
    totalBalance?: number;
    role?: "admin" | "user" | "guest";
};

export async function DELETE(
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

        const { userId } = await params;

        const target = await UserService
            .getById(userId);

        if (!target) {
            return Response.json({
                ok: false,
                message: "User not found",
            });
        };

        if (target.username === auth.data.username) {
            return Response.json({
                ok: false,
                message: "You are not allowed to delete your account",
            });
        };

        if (target.role === "dev") {
            return Response.json({
                ok: false,
                message: "You are not allowed to delete developer account",
            });
        };

        const deletedTarget = await UserService
            .delete(userId);

        if (!deletedTarget) {
            return Response.json({
                ok: false,
                message: "Unable to delete account",
            });
        };

        return Response.json({
            ok: true,
            message: `Account (${target.username}) deleted successfully`,
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

        const { password, balance, totalBalance, role }: UpdateProps = await request.json();
        const { userId } = await params;

        const target = await UserService
            .getById(userId);

        if (!target) {
            return Response.json({
                ok: false,
                message: "User not found",
            });
        };

        const updatedTarget = await UserService
            .update(userId, {
                password,
                balance,
                totalBalance,
                role,
            });

        if (!updatedTarget) {
            return Response.json({
                ok: false,
                message: "Unable to update account",
            });
        };

        return Response.json({
            ok: true,
            message: `Account (${target.username}) updated successfully`,
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};