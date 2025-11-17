import { getAuth } from "@/lib/auth";
import { CategoryService } from "@/services/categories.service";
import { ProductService } from "@/services/products.service";

interface CreateProps {
    name: string;
    description?: string;
    image: string;
    recommended?: boolean;
    price: number;
    stockType: "account" | "redemption-code" | "mystery-box";
    status: "active" | "inactive";
    categoryId: string;
};

export async function GET() {
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

        const products = await ProductService
            .getAll();

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

export async function POST(request: Request) {
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

        const { name, description, image, recommended, price, stockType, status, categoryId }: CreateProps = await request.json();

        if (
            !name ||
            !image ||
            !price ||
            !stockType ||
            !status ||
            !categoryId
        ) {
            return Response.json({
                ok: false,
                message: "These 'name' & 'image' & 'price' & 'stockType' & 'status' & 'categoryId' fields are required",
            });
        };

        const category = await CategoryService
            .getById(categoryId);

        if (!category) {
            return Response.json({
                ok: false,
                message: "Category not found",
            });
        };

        const product = await ProductService
            .create({
                name,
                description,
                image,
                recommended,
                price,
                stockType,
                status,
                categoryId,
            });

        if (!product) {
            return Response.json({
                ok: false,
                message: "Unable to create product",
            });
        };

        const products = await ProductService
            .getAll(categoryId);

        const updatedCategory = await CategoryService
            .update(categoryId, {
                products: products.length
            });

        if (!updatedCategory) {
            return Response.json({
                ok: false,
                message: "Unable to update category's products",
            });
        };

        return Response.json({
            ok: true,
            message: "Product created successfully",
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};