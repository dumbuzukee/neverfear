import UserModel, { UserInsert, UserUpdate } from "@/models/users.model";

export abstract class UserService {
    static create = async (data: UserInsert) => {
        return await UserModel
            .create(data);
    };
    static delete = async (userId: string) => {
        return await UserModel
            .findByIdAndDelete(userId);
    };
    static getAll = async () => {
        return await UserModel
            .find()
            .select("-password")
            .lean()
            .sort({ createdAt: -1 });
    };
    static getByEmail = async (email: string) => {
        return await UserModel
            .findOne({ email });
    };
    static getById = async (userId: string) => {
        return await UserModel
            .findById(userId);
    };
    static getByUsername = async (username: string) => {
        return await UserModel
            .findOne({ username });
    };
    static update = async (userId: string, data: UserUpdate) => {
        return await UserModel
            .findByIdAndUpdate(userId, data);
    };
};