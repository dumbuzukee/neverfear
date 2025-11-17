import axios from "axios";

interface ValidateTurnstileResponse {
    success: boolean;
    message: string;
};

export const validateTurnstile = async (turnstileToken: string): Promise<ValidateTurnstileResponse> => {
    try {
        const response = await axios
            .post("https://challenges.cloudflare.com/turnstile/v0/siteverify", new URLSearchParams({
                secret: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY!,
                response: turnstileToken,
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

        if (!response.data.success) {
            return {
                success: false,
                message: "Invalid turnstile token",
            };
        };

        return {
            success: true,
            message: "Verified turnstile successfully",
        };
    }
    catch(error: any) {
        return {
            success: false,
            message: error.message,
        };
    };
};