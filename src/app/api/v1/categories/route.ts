import { connectMongoDB } from "@/lib/mongodb";
import { CategoryService } from "@/services/categories.service";

export async function GET() {
    try {
        await connectMongoDB();

        const categories = await CategoryService
            .getAll();

        return Response.json({
            ok: true,
            message: "Categories fetched successfully",
            data: categories,
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};