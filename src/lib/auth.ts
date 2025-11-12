import { UserService } from "@/services/users.service";
import { getCookie } from "./cookie";
import { connectMongoDB } from "./mongodb";

export const getAuth = async ({
    withAdminRole
}: {
    withAdminRole: boolean;
}) => {
    const payload = await getCookie();

    if (!payload) {
        return {
            success: false,
            message: "Token not found",
        };
    };

    await connectMongoDB();

    const user = await UserService
        .getById(payload.userId as string);

    if (!user) {
        return {
            success: false,
            message: "User not found",
        };
    };

    if (
        withAdminRole &&
        user.role !== "dev" &&
        user.role !== "admin"
    ) {
        return {
            success: false,
            message: "You are not allowed to use this function",
        };
    };

    const {
        username,
        balance,
        totalBalance,
        role,
    } = user.toObject();

    return {
        success: true,
        message: "Authorized",
        data: {
            username,
            balance,
            totalBalance,
            role,
        },
    };
};