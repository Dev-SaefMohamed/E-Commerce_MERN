import { Request } from "express";
// i export this interface to import it with validateJWT in cart route and any place i want
export interface ExtendRequest extends Request {
    user?: any;
}