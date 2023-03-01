import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export function verifyAuth(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization

    if (authToken) {
        const [, token] = authToken.split(' ')

        try {
            const { sub } = verify(token, '01234567899876543210')
            console.log("Token for the user", sub)
            return next()
        } catch (error) {
            return response.status(400).json({ message: 'Unauthorized' })
        }
    }

    return response.status(401).json({ message: 'Unauthorized' })
}