import { CategoryService } from "@/services/categories.service";
import { ProductService } from "@/services/products.service";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ categoryId: string }> }
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
            .getAll(categoryId, false);
        
        return Response.json({
            ok: true,
            message: "Products fetched successfully",
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