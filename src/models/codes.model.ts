import mongoose, { Document, Schema } from "mongoose";

export interface CodeDocument extends Document {
    code: string;
    amount: number;
    maxUses: number;
    usedBy: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
};

export interface CodeInsert {
    code: string;
    amount: number;
    maxUses?: number;
};


const CodeSchema = new Schema<CodeDocument>(
    {
        code: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        maxUses: {
            type: Number,
            default: 1,
        },
        usedBy: {
            type: [Schema.Types.ObjectId],
            ref: "users",
        },
    },
    {
        timestamps: true,
    },
);

const CodeModel = mongoose.models["codes"] || mongoose.model("codes", CodeSchema);

export default CodeModel;