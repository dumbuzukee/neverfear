import PurchaseModel, { PurchaseInsert } from "@/models/purchases.model";

export abstract class PurchaseService {
    static create = async (data: PurchaseInsert) => {
        return await PurchaseModel
            .create(data);
    };
    static getAll = async (userId?: string) => {
        return userId !== undefined
            ? await PurchaseModel
                .find({ userId })
                .sort({ createdAt: -1 })
            : await PurchaseModel
                .find()
                .sort({ createdAt: -1 });
    };
};