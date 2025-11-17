import { getAuth } from "@/lib/auth";
import { CategoryService } from "@/services/categories.service";
import { ProductService } from "@/services/products.service";

interface ParamsProps {
    productId: string;
};

interface UpdateProps {
    name: string;
    description: string;
    image: string;
    recommended: boolean;
    price: number;
    stockValues: string[];
    status: "active" | "inactive";
};

export async function DELETE(
    request: Request,
    { params }: { params: Promise<ParamsProps> }
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

        const deletedProduct = await ProductService
            .delete(productId);

        if (!deletedProduct) {
            return Response.json({
                ok: false,
                message: "Unable to delete product",
            });
        };

        const products = await ProductService
            .getAll(product.categoryId);

        const updatedCategory = await CategoryService
            .update(product.categoryId, {
                products: products.length,
            });

        if (!updatedCategory) {
            return Response.json({
                ok: false,
                message: "Unable to update category's products",
            });
        };

        return Response.json({
            ok: true,
            message: `Product (${product.name}) deleted successfully`,
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
    { params }: { params: Promise<ParamsProps> }
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

        const { name, description, image, recommended, price, stockValues, status }: UpdateProps = await request.json();
        const { productId } = await params;

        const product = await ProductService
            .getById(productId);

        if (!product) {
            return Response.json({
                ok: false,
                message: "Product not found",
            });
        };

        switch (product.stockType) {
            case "account":
                stockValues.forEach((value: string) => {
                    const [username, password] = value.split(":");
                    if (username === undefined || password === undefined) {
                        throw new Error("Invalid account stock format: expected 'username:password");
                    };
                });
                break;
            case "mystery-box":
                stockValues
                    .map((value) => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value);
                break;
            default:
                break;
        };

        const updatedProduct = await ProductService
            .update(productId, {
                name,
                description,
                image,
                recommended,
                price,
                stock: stockValues.length,
                stockValues: stockValues,
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
            message: `Product (${product.name}) updated successfully`,
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};