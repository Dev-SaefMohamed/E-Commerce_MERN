import { createContext, useContext } from "react";
import { CartItem } from "../../types/CartItem";

// defines the structure of the data that will be
// stored in the context. It has two properties:
interface CartContextType {
    
    cartItems: CartItem[];
    totalAmount: number;
    addItemToCart: (productId: string) => void;
    updateItemInCart : (productId: string, quantity: number) => void;
    removeItemInCart : (productId: string) => void;
    clearCart: () => void

}

//(*)Overall Purpose:
//  This code creates a context named AuthContext
//  that can be used to store and share 
//  authentication-related data (username and token) 
//  between different components in your React application.
//  The useAuth hook provides a convenient 
//  way to access this context data within your components.

export const CartContext = createContext<CartContextType>({
       cartItems: [],
       totalAmount: 0,
       addItemToCart: () => {},
       updateItemInCart: () => {},
       removeItemInCart: () => {},
       clearCart: () => {}
});

// useAuth. This hook uses the useContext hook to access the AuthContext created earlier.
export const useCart = () => useContext(CartContext);