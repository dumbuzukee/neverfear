
interface ValidateCredentialsProps {
    email?: string;
    username? :string;
    password?: string;
};

interface ValidateCredentialsResponse {
    success: boolean;
    message: string;
};

export const validateCredentials = async ({ email, username, password }: ValidateCredentialsProps): Promise<ValidateCredentialsResponse> => {
    if (email !== undefined) {
        if (!email.trim()) {
            return {
                success: false,
                message: "Email is required",
            };
        };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return {
                success: false,
                message: "Invalid email format",
            };
        };
    };

    if (username !== undefined) {
        if (!username.trim()) {
            return {
                success: false,
                message: "Username is required",
            };
        };
        if (username.length < 3) {
            return {
                success: false,
                message: "Username must include at least 3 characters",
            };
        };
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return {
                success: false,
                message: "Username can only contain letters, numbers, and underscores",
            };
        };
    };

    if (password !== undefined) {
        if (!password.trim()) {
            return {
                success: false,
                message: "Password is required",
            };
        };
        if (password.length < 6) {
            return {
                success: false,
                message: "Password must include at least 6 characters",
            };
        };
    };

    return {
        success: true,
        message: "Validated credentials successfully",
    };
};