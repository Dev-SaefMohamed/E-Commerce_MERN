import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
// i export this interface to import it with validateJWT in cart route
export interface ExtendRequest extends Request {
    user?: any;
}

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
      const authorizationHeader = req.get('authorization');

      if(!authorizationHeader) {
          res.status(403).send("Authorization header was not provided");
          return;
      }

      const token = authorizationHeader.split(" ")[1];

      if(!token) {
         res.status(403).send("Bearer token not found");
         return;
      }

      jwt.verify(token, "73AA1277EED6AA789F478AE33488E", async (err, payload) => {
          if(err) {
              res.status(403).send("Invalid token");
              return;
          };
          
          if(!payload){
              res.status(403).send("Invalid token payload");
              return;
          };

          const userPayload = payload as {
             email: string;
             firstName: string;
             lastName: string;
          };

          const user = await userModel.findOne({ email: userPayload.email });
          req.user = user;
          next();
   });
}

export default validateJWT;