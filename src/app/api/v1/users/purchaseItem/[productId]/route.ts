import { getAuth } from "@/lib/auth";
import { validateTurnstile } from "@/lib/turnstile";
import { ProductService } from "@/services/products.service";
import { PurchaseService } from "@/services/purchases.service";
import { UserService } from "@/services/users.service";

interface ParamsProps {
    productId: string;
};

interface PurchaseItemProps {
    quantity: number;
    turnstileToken: string;
};

export async function POST(
    request: Request,
    { params }: { params: Promise<ParamsProps> }
) {
    try {
        const auth = await getAuth({
            withAdminRole: false,
        });

        if (!auth.success) {
            return Response.json({
                ok: false,
                message: auth.message,
            });
        };

        const { quantity, turnstileToken }: PurchaseItemProps = await request.json();
        const { productId } = await params;

        if (!turnstileToken) {
            return Response.json({
                ok: false,
                message: "This 'turnstileToken' field is required",
            });
        };

        const validatedTurnstile = await validateTurnstile(turnstileToken);

        if (!validatedTurnstile.success) {
            return Response.json({
                ok: false,
                message: validatedTurnstile.message,
            });
        };

        if (!quantity) {
            return Response.json({
                ok: false,
                message: "This 'quantity' field is required",
            });
        };

        const user = await UserService
            .getByUsername(auth.data.username);

        if (!user) {
            return Response.json({
                ok: false,
                message: "User not found",
            });
        };

        const product = await ProductService
            .getById(productId);

        if (!product) {
            return Response.json({
                ok: false,
                message: "Product not found",
            });
        };

        if (product.stock === 0) {
            return Response.json({
                ok: false,
                message: "Product is out of stock",
            });
        };

        if (quantity > product.stock) {
            return Response.json({
                ok: false,
                message: "Insufficient stock",
            });
        };

        const productTotalAmount = product.price * quantity;

        if (user.balance < productTotalAmount) {
            return Response.json({
                ok: false,
                message: "Insufficient balance",
            });
        };

        const purchaseItems: string[] = [];

        switch (product.stockType) {
            case "mystery-box":
                for (let i = 0; i < quantity; i++) {
                    const randomIndex = Math.floor(Math.random() * product.stockValues.length);
                    const item = product.stockValues[randomIndex];
                    purchaseItems.push(item);
                    product.stockValues.splice(randomIndex, 1);
                };
                break;
            default:
                purchaseItems.push(...product.stockValues.splice(0, quantity));
                break;
        };

        user.balance -= productTotalAmount;
        product.stock = product.stockValues.length;

        await Promise.all([
            await user.save(),
            await product.save(),
        ]);

        const purchase = await PurchaseService
            .create({
                userId: user._id,
                productId: product._id,
                productName: product.name,
                productPrice: product.price,
                productQuantity: quantity,
                productTotalAmount,
                productType: product.stockType,
                productValue: purchaseItems,
            });

        if (!purchase) {
            return Response.json({
                ok: false,
                message: "Unable to create purchase history",
            });
        };

        return Response.json({
            ok: true,
            message: "Purchased successful",
        });
    }
    catch(error: any) {
        return Response.json({
            ok: false,
            message: error.message,
        });
    };
};