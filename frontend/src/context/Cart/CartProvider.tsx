import { FC, PropsWithChildren, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";


const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    
    const { token } = useAuth();

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState("");

    const addItemToCart = async (productId: string) => {
          
        try {
            const response = await fetch(`${BASE_URL}/cart/items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId,
                    quantity: 1
                }),
             });

             if(!response.ok) {
                 setError('Failed to add to cart');
             }

             const cart = await response.json();

             if(!cart) {
                setError("Failed to parse cart data")
             }

             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             const cartItemMapped = cart.items.map(({ product, quantity }: { product: any, quantity: number }) => ({
                   productId: product._id,
                   title: product.title,
                   image: product.image,
                   unitPrice: product.unitPrice,
                   quantity
             }))

             setCartItems([...cartItemMapped]);

             setTotalAmount(cart.totalAmount);

        } catch (error) {
               console.error(error)
        }
          
    };

    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart }}>
             {/* children here mean all app wrap in [AUTHprovider]*/}
              {children}
        </CartContext.Provider>
    )

}

export default CartProvider;