import mongoose, { Document, Schema } from "mongoose";

export interface PurchaseDocument extends Document {
    userId: Schema.Types.ObjectId;
    productId: Schema.Types.ObjectId;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productTotalAmount: number;
    productType: "account" | "redemption-code" | "mystery-box";
    productValue: string[];
    createdAt: Date;
};

export interface PurchaseInsert {
    userId: string;
    productId: string;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productTotalAmount: number;
    productType: "account" | "redemption-code" | "mystery-box";
    productValue?: string[];
};

const PurchaseSchema = new Schema<PurchaseDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productQuantity: {
            type: Number,
            required: true,
        },
        productTotalAmount: {
            type: Number,
            required: true,
        },
        productType: {
            type: String,
            enum: ["account", "redemption-code", "mystery-box"],
            required: true,
        },
        productValue: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const PurchaseModel = mongoose.models["purchases"] || mongoose.model("purchases", PurchaseSchema);

export default PurchaseModel;


/*

export interface PurchaseDocument extends Document {
    userId: Schema.Types.ObjectId;
    productId: Schema.Types.ObjectId;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productTotalAmount: number;
    createdAt: Date;
};

export interface PurchaseInsert {
    userId: string;
    productId: string;
    productName: string;
    productPrice: number;
    productQuantity: number;
    productTotalAmount: number;
};

const PurchaseSchema = new Schema<PurchaseDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productQuantity: {
            type: Number,
            required: true,
        },
        productTotalAmount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const PurchaseModel = mongoose.models["purchases"] || mongoose.model("purchases", PurchaseSchema);

export default PurchaseModel;
*/