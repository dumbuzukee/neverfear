import { connectMongoDB } from "@/lib/mongodb";
import { CategoryService } from "@/services/categories.service";
import { ProductService } from "@/services/products.service";

interface ParamsProps {
    categoryId: string;
};

export async function GET(
    request: Request,
    { params }: { params: Promise<ParamsProps> }
) {
    try {
        const { categoryId } = await params;

        const category = await CategoryService
            .getById(categoryId);

        if (!category) {
            return Response.json({
                ok: false,
                message: "Category not found",
            });
        };

        const products = await ProductService
            .getAllForUsers(categoryId);

        return Response.json({
            ok: true,
            message: `Products from category (${categoryId}) fetched successfully`,
            data: products,
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};