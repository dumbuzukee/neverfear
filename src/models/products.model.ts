import mongoose, { Document, Schema } from "mongoose";

export interface ProductDocument extends Document {
    name: string;
    description: string;
    image: string;
    recommended: boolean;
    price: number;
    stock: number;
    stockType: "account" | "keycode";
    stockValues: string[];
    status: "active" | "inactive";
    categoryId: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export interface ProductInsert {
    name: string;
    description?: string;
    image: string;
    recommended: boolean;
    price: number;
    stockType: "account" | "keycode";
    categoryId: string;
};

export interface ProductUpdate {
    name?: string;
    description?: string;
    image?: string;
    recommended?: boolean;
    price?: number;
    stock?: number;
    stockValues?: string[];
    status?: "active" | "inactive";
};

const ProductSchema = new Schema<ProductDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: true,
        },
        recommended: {
            type: Boolean,
            default: false,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
        stockType: {
            type: String,
            enum: ["account", "keycode"],
            required: true,
        },
        stockValues: {
            type: [String],
            default: [],
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "categories",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const ProductModel = mongoose.models["products"] || mongoose.model("products", ProductSchema);

export default ProductModel;


/*

export interface ProductDocument extends Document {
    name: string;
    description: string;
    image: string;
    recommended: boolean;
    price: number;
    stock: number;
    stockType: "account" | "key-code";
    stockValues: string[];
    status: "active" | "inactive";
    categoryId: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export interface ProductInsert {
    name:  string;
    description?: string;
    image: string;
    recommended?: boolean;
    price: number;
    stockType: "account" | "key-code";
    categoryId: string;
};

export interface ProductUpdate {
    name?: string;
    description?: string;
    image?: string;
    recommended?: boolean;
    price?: number;
    stock?: number;
    stockValues?: string[];
    status?: "active" | "inactive";
};

const ProductSchema = new Schema<ProductDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: true,
        },
        recommended: {
            type: Boolean,
            default: false,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
        stockType: {
            type: String,
            enum: ["account", "key-code"],
            required: true,
        },
        stockValues: {
            type: [String],
            default: [],
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "categories",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const ProductModel = mongoose.models["products"] || mongoose.model("products", ProductSchema);

export default ProductModel;

/*

export interface StockValue {
    key: string;
    value: string;
};

export interface ProductDocument extends Document {
    name: string;
    description: string;
    image: string;
    recommended: boolean;
    price: number;
    stock: number;
    stockValues: StockValue[];
    status: "active" | "inactive";
    categoryId: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export interface ProductInsert {
    name: string;
    description?: string;
    image: string;
    recommended?: boolean;
    price: number;
    categoryId: string;
};

export interface ProductUpdate {
    name?: string;
    description?: string;
    image?: string;
    recommended?: boolean;
    price?: number;
    stock?: number;
    stockValues?: string[];
    status?: "active" | "inactive";
};

const ProductSchema = new Schema<ProductDocument>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            required: true,
        },
        recommended: {
            type: Boolean,
            default: false,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
        stockValues: {
            type: [String],
            default: [],
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "categories",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const ProductModel = mongoose.models["products"] || mongoose.model("products", ProductSchema);

export default ProductModel;

*/