import { cartModel } from "../models/cartModel";
import productModel from "../models/productModel";

interface CreateCartForUser {
    userId: string;
}

// private function
const createCartForUser = async ({ userId }: CreateCartForUser) => {
    const cart = await cartModel.create({ userId, totalAmount: 0 });
    await cart.save();
    return cart;
};
/////////////////////////////////////////////////////////////////////

interface GetActiveCartForUser {
    userId: string;
}

export const getActiveCartForUser = async ({
    userId,
}: GetActiveCartForUser) => {
    let cart = await cartModel.findOne({ userId, status: "active" });

    if(!cart) {
        cart = await createCartForUser({ userId })
    }

    return cart;
};
/////////////////////////////////////////////////////////////////////
interface AddItemToCart {
    productId: any;
    quantity: number;
    userId: string;
}

export const addItemToCart = async ({
    productId,
    quantity,
    userId
}: AddItemToCart) => {
    const cart = await getActiveCartForUser({ userId });

    // does the item exist in the cart
    const existsInCart = cart.items.find((p) => p.product.toString() === productId);
    
    if(existsInCart) {
        return { data: "items already exists in cart", statusCode: 400 };
    }
    

    // fetch the product
    const product = await productModel.findById(productId);

    if(!product){
        return { data: "product not found!", statusCode: 400 };
    }
    if(product.stock < quantity) {
        return { data: "low stock for items", statusCode: 400 }
    }
    
    cart.items.push({
        product: productId,
        unitPrice: product.price,
        quantity
    });
// UPDATE the total amount for the cart
    cart.totalAmount += product.price * quantity;

    const updateCart = await cart.save();

    return { data: updateCart, statusCode: 201 };
};