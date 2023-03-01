import { Request, Response } from "express"
import { sign } from "jsonwebtoken"


const user = {
    user_id: '123456',
    name: 'Nadilson',
    email: 'nadilson@diobank.com',
    password: 'password'
}


export class LoginController {
    login = async (request: Request, response: Response) => {
        const tokenData = {
            name: user.name,
            email: user.email
        }

        const tokenKey = '01234567899876543210'

        const tokenOptions = {
            subject: user.user_id
        }
        const token = sign(tokenData, tokenKey, tokenOptions)
        return response.status(200).json({ token })
    }
}