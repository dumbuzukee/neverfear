import ProductModel, { ProductInsert, ProductUpdate } from "@/models/products.model";

export abstract class ProductService {
    static create = async (data: ProductInsert) => {
        return await ProductModel
            .create(data);
    };
    static delete = async (productId: string) => {
        return await ProductModel
            .findByIdAndDelete(productId);
    };
    static getAll = async (categoryId: string, withFullAccess: boolean) => {
        return (withFullAccess)
            ? await ProductModel
                .find({ categoryId })
                .sort({ createdAt: -1 })
            : await ProductModel
                .find({ categoryId })
                .select("-stockType -stockValues")
                .lean()
                .sort({ createdAt: -1 });
    };
    static getById = async (productId: string) => {
        return await ProductModel
            .findById(productId);
    };
    static update = async (productId: string, data: ProductUpdate) => {
        return await ProductModel
            .findByIdAndUpdate(productId, data);
    };
};