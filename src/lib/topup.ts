import axios from "axios";

export const redeemGiftVoucher = async (voucherCode: string) => {
    let parts = voucherCode.split("v=");
    let match = (parts[1] || parts[0]).match(/[0-9A-Za-z]+/);

    const voucher = match ? match[0] : null;

    if (voucher?.length !== 35) {
        return {
            success: false,
            message: "Invalid gift voucher code"
        };
    };

    const response = await fetch(`https://gift.truemoney.com/campaign/vouchers/${voucher}/redeem`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            mobile: process.env.PHONE!,
            voucher_code: voucher,
        }),
    }).then((res) => res.json());


    if (response.status.code !== "SUCCESS") {
        return {
            success: false,
            message: response.status.message,
        };
    };

    return {
        success: true,
        message: "Redeemed gift voucher successfully",
        data: {
            ownerName: response.data.owner_profile.fullName,
            amount: response.data.my_ticket.amount_baht,
            voucher,
        },
    };
};