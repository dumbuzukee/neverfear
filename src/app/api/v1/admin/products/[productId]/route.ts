import { getAuth } from "@/lib/auth";
import { CategoryService } from "@/services/categories.service";
import { ProductService } from "@/services/products.service";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ productId: string }> }
) {
    try {
        const auth = await getAuth({
            withAdminRole: true,
        });

        if (!auth.success) {
            return Response.json({
                ok: false,
                message: auth.message,
            });
        };

        const { productId } = await params;

        const product = await ProductService
            .getById(productId);

        if (!product) {
            return Response.json({
                ok: false,
                message: "Product not found",
            });
        };

        const category = await CategoryService
            .getById(product.categoryId);

        if (!category) {
            return Response.json({
                ok: false,
                message: "Category not found",
            });
        };

        const deletedProduct = await ProductService
            .delete(productId);

        if (!deletedProduct) {
            return Response.json({
                ok: false,
                message: "Unable to delete product",
            });
        };

        const products = await ProductService
            .getAll(product.categoryId, true);

        const updatedCategory = await CategoryService
            .update(product.categoryId, {
                products: products.length,
            });

        if (!updatedCategory) {
            return Response.json({
                ok: false,
                message: "Unable to update category stock",
            });
        };

        return Response.json({
            ok: true,
            message: "Product deleted successfully",
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ productId: string }> }
) {
    try {
        const auth = await getAuth({
            withAdminRole: true,
        });

        if (!auth.success) {
            return Response.json({
                ok: false,
                message: auth.message,
            });
        };

        const {
            name,
            description,
            image,
            recommended,
            price,
            stockValues,
            status,
        }: {
            name: string;
            description: string;
            image: string;
            recommended: boolean;
            price: number;
            stockValues: string[];
            status: "active" | "inactive";
        } = await request.json();

        const { productId } = await params;

        const product = await ProductService
            .getById(productId);

        if (!product) {
            return Response.json({
                ok: false,
                message: "Product not found",
            });
        };

        if (stockValues?.length > 0 && product.stockType === "account") {
            const invalidStockValues = stockValues?.filter((stockValue) => !/^[^:\s]+:[^:\s]+$/.test(stockValue));

            if (invalidStockValues.length > 0) {
                return Response.json({
                    ok: false,
                    message: `Invalid stock format found: ${invalidStockValues.join(", ")}`,
                });
            };
        };

        const stock = stockValues?.length;

        const updatedProduct = await ProductService
            .update(productId, {
                name,
                description,
                image,
                recommended,
                price,
                stock,
                stockValues,
                status,
            });

        if (!updatedProduct) {
            return Response.json({
                ok: false,
                message: "Unable to update product",
            });
        };

        return Response.json({
            ok: true,
            message: "Product updated successfully",
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};