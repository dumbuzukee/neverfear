import TopupModel, { TopupInsert } from "@/models/topups.model";
import UserModel from "@/models/users.model";

export abstract class TopupService {
    static create = async (data: TopupInsert) => {
        return await TopupModel
            .create(data);
    };
    static getAll = async (userId?: string) => {
        return userId !== undefined
            ? await UserModel
                .find({ userId })
            : await UserModel
                .find();
    };
};