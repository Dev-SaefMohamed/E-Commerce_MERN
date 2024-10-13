import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { BASE_URL } from "../constants/baseUrl";
import  Container from "@mui/material/Container";
import { Typography } from "@mui/material";

const CartPage = () => {
   
    const { token } = useAuth();
    const [cart, setCart] = useState();
    const [error, setError] = useState('');

    useEffect(() => {

        if(!token){
            return;
        }

        const fetchCart = async () => {

             const response = await fetch(`${BASE_URL}/cart`, {
                 headers: { 
                     Authorization: `Barer ${token}`,
                  },
             });

             if(!response.ok){
                 setError("Failed to fetch user cart, Please try again");
             }


             const data = await response.json();
             setCart(data)
        };

        fetchCart();
    }, [token]);
    
    
    
    return (
        <Container sx={{ mt: 2 }}>
             <Typography variant="h4">my cart</Typography>
        </Container>
    );
}

export default CartPage;