import { hashValue } from "@/lib/bcrypt";
import { setCookie } from "@/lib/cookie";
import { validateCredentials } from "@/lib/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import { validateTurnstile } from "@/lib/turnstile";
import { UserService } from "@/services/users.service";

interface RegisterProps {
    email: string;
    username: string;
    password: string;
};

export async function POST(request: Request) {
    try {
        const { email, username, password }: RegisterProps = await request.json();

        if (
            !email ||
            !username ||
            !password
        ) {
            return Response.json({
                ok: false,
                message: "These 'email' & 'username' & 'password' fields are required",
            });
        };

        const validatedCredentials = await validateCredentials({
            email,
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

        const isEmailExisted = await UserService
            .getByEmail(email);

        if (isEmailExisted) {
            return Response.json({
                ok: false,
                message: "This email is already existed",
            });
        };

        const isUsernameExisted = await UserService
            .getByUsername(username);

        if (isUsernameExisted) {
            return Response.json({
                ok: false,
                message: "This username is already existed",
            });
        };

        const hashedPassword = await hashValue(password);

        const user = await UserService
            .create({
                email,
                username,
                password: hashedPassword,
            });

        if (!user) {
            return Response.json({
                ok: false,
                message: "Unable to create account",
            });
        };

        await setCookie({
            userId: user.id,
            username: user.username,
            role: user.role,
        });

        return Response.json({
            ok: true,
            message: "Account created successfully",
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};