import { getAuth } from "@/lib/auth";
import { CategoryService } from "@/services/categories.service";

interface RequestProps {
    name: string;
    description?: string;
    image: string;
    recommended?: boolean;
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

        const { name, description, image, recommended }: RequestProps = await request.json();

        if (
            !name ||
            !image
        ) {
            return Response.json({
                ok: false,
                message: "These 'name' & 'image' fields are required",
            });
        };

        const category = await CategoryService
            .create({
                name,
                description,
                image,
                recommended,
            });

        if (!category) {
            return Response.json({
                ok: false,
                message: "Unable to create category",
            });
        };

        return Response.json({
            ok: true,
            message: "Category created successfully",
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};