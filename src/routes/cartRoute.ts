import express from "express";
import { getActiveCartForUser } from "../services/cartService";
import validateJWT, { ExtendRequest } from "../middlewares/validateJWT";

const router = express.Router();
                                // By extending the Request interface 
                                // with the user property, you're telling TypeScript
                                // that the Request objects passed to your route 
                                // handlers will have a user property. This will resolve
                                // the type error and allow you to access the user
                                // property without causing compilation errors.
                                // we can use (any) or (ExtendRequest)
router.get("/", validateJWT, async (req: ExtendRequest, res) => {
    const userId = req.user._id;
    // 
    const cart = await getActiveCartForUser({ userId })
    res.status(200).send(cart);
})

export default router;