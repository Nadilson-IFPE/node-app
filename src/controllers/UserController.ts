import { Request, Response } from 'express';
import { UserService } from '../services/UserService';



export class UserController {
    userService: UserService

    constructor(
        userService = new UserService()
    ) {
        this.userService = userService
    }


    createUser = (request: Request, response: Response): Response => {
        const user = request.body

        if (!user.name || !user.email || !user.password) {
            return response.status(400).json({ message: 'Bad request: Todos os campos são obrigatórios' })
        }

        this.userService.createUser(user.name, user.email, user.password)
        return response.status(201).json({ message: 'Usuário criado' })
    }

    getUser = async (request: Request, response: Response) => {
        const { userId } = request.params
        const user = await this.userService.getUser(userId)
        // Ñão pode revelar a senha do usuário na response
        // Modo errado (exibe a senha): return response.status(200).json(user)
        // Modo correto (exclui a senha dos dados retornados pelo response):
        return response.status(200).json({
            userId: user?.user_id,
            name: user?.name,
            email: user?.email
        })
    }

    deleteUser = (request: Request, response: Response) => {
        const user = request.body

        console.log('Deletando usuário', user)

        return response.status(200).json({ message: 'Usuário deletado' })
    }

}
