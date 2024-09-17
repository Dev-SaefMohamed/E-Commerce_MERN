import userModel from "../models/userModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

interface RegisterParams {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export const register = async ({ firstName, 
                                 lastName, 
                                 email, 
                                 password }: RegisterParams) => {
                           // email: email -> in js = email
    const findUser = await userModel.findOne({ email })
    
    if(findUser){
        return{ data: "User already exists!", statusCode: 400 } 
    }
    
    // bcrypt
    const hashPassword = await bcrypt.hash(password, 10)
    // else
    const newUser = new userModel({ firstName, 
                                    lastName, 
                                    email, 
                                    password: hashPassword })
    await newUser.save()

    return { data: generateJWT({ email, 
                                 firstName, 
                                 lastName }), statusCode: 200 };
}

interface LoginParams {
    email: string,
    password: string
}

export const login = async ({ email, password }: LoginParams) => {
    
    const findUser = await userModel.findOne({ email })
    
    if(!findUser){
        return{ data: "Incorrect email or password!", statusCode: 400 }
    }
    
    //bcrypt -> compare between the saved password in DB & the login (password)
    const passwordMatch = await bcrypt.compare(password, findUser.password)
    
    if(passwordMatch){
        return {data: generateJWT({ email, 
                                    firstName: findUser.firstName, 
                                    lastName: findUser.lastName }), statusCode: 200};
    }

    //else
    return{ data: "Incorrect email or password!", statusCode: 400 } 
}

// take the data and encrypt it in the form of TOKEN
const generateJWT = (data: any) => {
    //  (sign) take 2 things: 1-payload(data -> you need to encrypt it)
                           // 2-secrete key(secrete number we used it to encrypt the data)
                           // 3-options
        return jwt.sign(data, '73AA1277EED6AA789F478AE33488E', {})
       
}