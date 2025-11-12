import mongoose, { Document, Schema } from "mongoose";

export interface TopupDocument extends Document {
    userId: Schema.Types.ObjectId;
    ownerName: string;
    amount: number;
    voucherCode: string;
    status: "success" | "failed";
    createdAt: Date;
};


export interface TopupInsert {
    userId: string;
    ownerName: string;
    amount: number;
    voucherCode: string;
    status: "success" | "failed";
};

export interface TopupResponse {
    userId: string;
    ownerName: string;
    amount: number;
    voucherCode: string;
    status: "success" | "failed";
    createdAt: Date;
};

const TopupSchema = new Schema<TopupDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        ownerName: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        voucherCode: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["success", "failed"],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const TopupModel = mongoose.models["topups"] || mongoose.model("topups", TopupSchema);

export default TopupModel;