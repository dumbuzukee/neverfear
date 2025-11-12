import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
    email: string;
    username: string;
    password: string;
    balance: number;
    totalBalance: number;
    role: "dev" | "admin" | "user" | "guest";
    createdAt: Date;
    updatedAt: Date;
};

export interface UserInsert {
    email: string;
    username: string;
    password: string;
};

export interface UserResponse {
    username: string;
    balance: number;
    totalBalance: number;
    role: string;
};

export interface UserUpdate {
    password?: string;
    balance?: number;
    totalBalance?: number;
    role?: "admin" | "user" | "guest";
};

const UserSchema = new Schema<UserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        balance: {
            type: Number,
            default: 0,
        },
        totalBalance: {
            type: Number,
            default: 0,
        },
        role: {
            type: String,
            enum: ["dev", "admin", "user", "guest"],
            default: "guest",
        },
    },
    {
        timestamps: true,
    },
);

const UserModel = mongoose.models["users"] || mongoose.model("users", UserSchema);

export default UserModel;