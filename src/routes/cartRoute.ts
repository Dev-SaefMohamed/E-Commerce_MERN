import express from "express";
import { addItemToCart,
         checkout,
         clearCart, 
         deleteItemInCart, 
         getActiveCartForUser, 
         updateItemInCart } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/ExtendRequest";

const router = express.Router();
                                // By extending the Request interface 
                                // with the user property, you're telling TypeScript
                                // that the Request objects passed to your route 
                                // handlers will have a user property. This will resolve
                                // the type error and allow you to access the user
                                // property without causing compilation errors.
                                // we can use (any) or (ExtendRequest)
router.get("/", validateJWT, async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      //
      const cart = await getActiveCartForUser({ userId });
      res.status(200).send(cart);
    } catch (err) {
        res.status(500).send("Something went wrong!")
    }
    
})
/////////////////////////////////////////////////////////////////////////////////////////////////
router.delete('/', validateJWT, async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const response = await clearCart({ userId });
      res.status(response.statusCode).send(response.data);
    } catch (err) {
      res.status(500).send("Something went wrong!");
    }
    
})
///////////////////////////////////////////////////////////////////////////////////////////////// 
router.post('/items', validateJWT, async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId, quantity } = req.body;
      const response = await addItemToCart({ userId, productId, quantity });
      res.status(response.statusCode).send(response.data);
    } catch (err) {
      res.status(500).send("Something went wrong!");
    }
    
})
/////////////////////////////////////////////////////////////////////////////////////////////////

router.put('/items', validateJWT, async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;
      const { productId, quantity } = req.body;
      const response = await updateItemInCart({ userId, productId, quantity });
      res.status(response.statusCode).send(response.data);
    } catch (err) {
      res.status(500).send("Something went wrong!");
    }
    
})
/////////////////////////////////////////////////////////////////////////////////////////////////

router.delete('/items/:productId', validateJWT, async (req: ExtendRequest, res) => {
   try {
     const userId = req?.user?._id;
     const { productId } = req.params;
     const response = await deleteItemInCart({ userId, productId });
     res.status(response.statusCode).send(response.data);
   } catch (err) {
     res.status(500).send("Something went wrong!");
   }
    
})
/////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/checkout", validateJWT, async (req: ExtendRequest, res) => {
    try {
      const userId = req?.user?._id;

      const { address } = req.body;

      const response = await checkout({ userId, address });
      res.status(response.statusCode).send(response.data);
    } catch (err) {
      res.status(500).send("Something went wrong!");
    }
    
})
export default router;