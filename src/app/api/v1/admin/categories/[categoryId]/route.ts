
import { getAuth } from "@/lib/auth";
import { CategoryService } from "@/services/categories.service";
import { ProductService } from "@/services/products.service";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ categoryId: string }> }
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

        const deletedCategory = await CategoryService
            .delete(categoryId);

        if (!deletedCategory) {
            return Response.json({
                ok: false,
                message: "Unable to delete category",
            });
        };

        return Response.json({
            ok: true,
            message: "Category deleted successfully",
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
    { params }: { params: Promise<{ categoryId: string }> }
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
            .getAll(categoryId, true);

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

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ categoryId: string }> }
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
            products,
            status,
        }: {
            name?: string;
            description?: string;
            image?: string;
            recommended?: boolean;
            products?: number;
            status?: "active" | "inactive";
        } = await request.json();

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
                products,
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
            message: "Category updated successfully",
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};