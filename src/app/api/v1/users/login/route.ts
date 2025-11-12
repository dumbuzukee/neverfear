import { compareValues } from "@/lib/bcrypt";
import { setCookie } from "@/lib/cookie";
import { validateCredentials } from "@/lib/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import { validateTurnstile } from "@/lib/turnstile";
import { UserService } from "@/services/users.service";

export async function POST(request: Request) {
    try {
        const {
            username,
            password,
            turnstileToken,
        }: {
            username: string;
            password: string;
            turnstileToken: string;
        } = await request.json();

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

        if (
            !username ||
            !password
        ) {
            return Response.json({
                ok: false,
                message: "These 'username' & 'password' fields are required",
            });
        };

        const validatedCredentials = await validateCredentials({
            username,
            password,
        });

        if (!validatedCredentials.success) {
            return Response.json({
                ok: false,
                message: validatedCredentials.message,
            });
        };

        await connectMongoDB();

        const user = await UserService
            .getByUsername(validatedCredentials.credentials?.username as string);

        if (!user) {
            return Response.json({
                ok: false,
                message: "Username not found",
            });
        };

        const comparedPassword = await compareValues(
            validatedCredentials.credentials?.password as string,
            user.password
        );

        if (!comparedPassword) {
            return Response.json({
                ok: false,
                message: "Incorrect password",
            });
        };

        await setCookie({
            userId: user.id,
            username: user.username,
            role: user.role,
        });

        return Response.json({
            ok: true,
            message: "Logged in successfully",
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};