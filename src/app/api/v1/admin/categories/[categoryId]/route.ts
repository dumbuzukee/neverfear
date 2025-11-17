import { getAuth } from "@/lib/auth";
import { CategoryService } from "@/services/categories.service";
import { ProductService } from "@/services/products.service";

interface ParamsProps {
    categoryId: string;
};

interface UpdateProps {
    name?: string;
    description?: string;
    image?: string;
    recommended?: boolean;
    status?: "active" | "inactive";
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

        const { categoryId } = await params;

        const category = await CategoryService
            .getById(categoryId);

        if (!categoryId) {
            return Response.json({
                ok: false,
                message: "Category not found",
            });
        };

        const deletedCategory = await CategoryService
            .delete(categoryId);

        if (!deletedCategory) {
            return Response.json({
                ok: false,
                message: "Unable to delete category",
            });
        };

        const products = await ProductService
            .getAll(categoryId);

        const deletedProducts = (await Promise.all(
            products.map(
                async (product) =>
                    await ProductService.delete(product._id)
            )
        ));

        if (!deletedProducts) {
            return Response.json({
                ok: false,
                message: "Unable to delete category's products",
            });
        };

        return Response.json({
            ok: true,
            message: `Category (${category.name}) deleted successfully`,
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};

export async function GET(
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
            .getAll(categoryId);

        return Response.json({
            ok: true,
            message: `Products from category (${category.name}) fetched successfully`,
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

        const { name, description, image, recommended, status }: UpdateProps = await request.json();
        const { categoryId } = await params;

        const category = await CategoryService
            .getById(categoryId);

        if (!category) {
            return Response.json({
                ok: false,
                message: "Category not found",
            });
        };

        const updatedCategory = await CategoryService
            .update(categoryId, {
                name,
                description,
                image,
                recommended,
                status,
            });

        if (!updatedCategory) {
            return Response.json({
                ok: false,
                message: "Unable to update category",
            });
        };

        return Response.json({
            ok: true,
            message: `Category (${category.name}) updated successfully`,
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};