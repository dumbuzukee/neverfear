import generatePayload from "promptpay-qr"


export const generatePromptPayQRCode = (amount: number) => {
    return generatePayload(process.env.NEXT_PUBLIC_PROMPTPAY_ID!, { amount });
};

