import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../Auth/AuthContext";


const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    
    const { token } = useAuth();

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState("");


        useEffect(() => {
          if (!token) {
            return;
          }

          const fetchCart = async () => {
            const response = await fetch(`${BASE_URL}/cart`, {
              headers: {
                Authorization: `Barer ${token}`,
              },
            });

            if (!response.ok) {
              setError("Failed to fetch user cart, Please try again");
            }

            const cart = await response.json();

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const cartItemMapped = cart.items.map(({ product, quantity, unitPrice }: { product: any; quantity: number; unitPrice: number }) => ({
                productId: product._id,
                title: product.title,
                image: product.image,
                unitPrice,
                quantity
          }))

            setCartItems(cartItemMapped)
            setTotalAmount(cart.totalAmount)
          };

          fetchCart();
        }, [token]);
    

    // add
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


    // update
     const updateItemInCart = async (productId: string, quantity: number) => {
       try {
         const response = await fetch(`${BASE_URL}/cart/items`, {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
           body: JSON.stringify({
             productId,
             quantity
           }),
         });

         if (!response.ok) {
           setError("Failed to update item in cart");
         }

         const cart = await response.json();

         if (!cart) {
           setError("Failed to parse cart data");
         }

         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const cartItemMapped = cart.items.map(
           ({ product, quantity, unitPrice }: { product: any; quantity: number; unitPrice: number }) => ({
             productId: product._id,
             title: product.title,
             image: product.image,
             unitPrice,
             quantity,
           })
         );

         setCartItems([...cartItemMapped]);

         setTotalAmount(cart.totalAmount);
       } catch (error) {
         console.error(error);
       }
     };

    //  delete
     const removeItemInCart = async (productId: string) => {
      try {
        const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        if (!response.ok) {
          setError("Failed to remove item in cart");
        }

        const cart = await response.json();

        if (!cart) {
          setError("Failed to parse cart data");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cartItemMapped = cart.items.map(
          ({ product, quantity, unitPrice }: { product: any; quantity: number; unitPrice: number }) => ({
            productId: product._id,
            title: product.title,
            image: product.image,
            unitPrice,
            quantity,
          })
        );

        setCartItems([...cartItemMapped]);

        setTotalAmount(cart.totalAmount);
      
      } catch (error) {
        console.error(error);
      }
    };

    const clearCart = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cart`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        if (!response.ok) {
          setError("Failed to clear cart");
        }

        const cart = await response.json();

        if (!cart) {
          setError("Failed to parse cart data");
        }

        setCartItems([]);

        setTotalAmount(0);
      
      } catch (error) {
        console.error(error);
      }
    }

    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart, updateItemInCart, removeItemInCart, clearCart }}>
             {/* children here mean all app wrap in [AUTHprovider]*/}
              {children}
        </CartContext.Provider>
    )

}

export default CartProvider;