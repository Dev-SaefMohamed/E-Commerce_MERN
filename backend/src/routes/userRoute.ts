import express, { request, response } from "express";
import { getMyOrders, login, register } from "../services/userService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/ExtendRequest";

const router = express.Router();

//user > register & login -> POST functionalities 
// register
router.post('/register', async (request, response) => {
    try {
        const { 
            firstName,
            lastName,
            email,
            password
         } = request.body;
    
        const { statusCode, data } = await register({
            firstName,
            lastName,
            email,
            password
        });
    
        response.status(statusCode)
                .json(data)
        
    } catch (err) {
        response.status(500).send("Something went wrong!");
    }
    

})

// login
router.post('/login',async (request, response) => {
    try {
      const { email, password } = request.body;

      const { statusCode, data } = await login({
        email,
        password,
      });

      response.status(statusCode).json(data);
    } catch (err) {
      response.status(500).send("Something went wrong!");
    }
})

// my-orders
router.get('/my-orders', validateJWT, async (request: ExtendRequest, response) => {
  try {
    const userId = request?.user?._id;
    const { statusCode, data } = await getMyOrders({ userId });
    response.status(statusCode).send(data);
  } catch (err) {
    response.status(500).send("Something went wrong!")
  }
})

export default router;