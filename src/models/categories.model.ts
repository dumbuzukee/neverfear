import mongoose, { Document, Schema } from "mongoose";

export interface CategoryDocument extends Document {
    name: string;
    description: string;
    image: string;
    recommended: boolean;
    products: number;
    status: "active" | "inactive";
    createdAt: Date;
    updatedAt: Date;
};

export interface CategoryInsert {
    name: string;
    description?: string;
    image: string;
    recommended?: boolean;
};

export interface CategoryUpdate {
    name?: string;
    description?: string;
    image?: string;
    recommended?: boolean;
    products?: number;
    status?: "active" | "inactive";
};

const CategorySchema = new Schema<CategoryDocument>(
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
        products: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    {
        timestamps: true,
    },
);

const CategoryModel = mongoose.models["categories"] || mongoose.model("categories", CategorySchema);

export default CategoryModel;