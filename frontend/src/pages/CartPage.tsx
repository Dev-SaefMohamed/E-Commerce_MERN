import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import { BASE_URL } from "../constants/baseUrl";
import  Container from "@mui/material/Container";
import { Box, Typography } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";

const CartPage = () => {
   
    const { token } = useAuth();
    const { cartItems, totalAmount } = useCart();
    const [error, setError] = useState('');


    return (
        <Container sx={{ mt: 2 }}>
             <Typography variant="h4">my cart</Typography>
              {cartItems.map((item) => (
                    <Box>{item.title}</Box>
                ))}
        </Container>
    );
}

export default CartPage;