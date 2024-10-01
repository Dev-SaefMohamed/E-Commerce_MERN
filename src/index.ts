import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute"
import productRoute from "./routes/productRoute"
import { seedInitialProduct } from "./services/productService";
import cartRoute from "./routes/cartRoute";

const app = express();
const port = 3001;

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => console.log('Mongo Connected!'))
  .catch((err) => console.log('Failed to connect!', err));

// 
app.use('/user', userRoute)
// seed the products to the DB
seedInitialProduct()
// 
app.use('/products', productRoute)
// 
app.use('/cart', cartRoute)
app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
    
})