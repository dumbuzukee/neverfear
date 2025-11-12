import CategoryModel, { CategoryInsert, CategoryUpdate } from "@/models/categories.model";

export abstract class CategoryService {
    static create = async (data: CategoryInsert) => {
        return await CategoryModel
            .create(data);
    };
    static delete = async (categoryId: string) => {
        return await CategoryModel
            .findByIdAndDelete(categoryId);
    };
    static getAll = async () => {
        return await CategoryModel
            .find();
    };
    static getById = async (categoryId: string) => {
        return await CategoryModel
            .findById(categoryId);
    };
    static update = async (categoryId: string, data: CategoryUpdate) => {
        return await CategoryModel
            .findByIdAndUpdate(categoryId, data);
    };
};