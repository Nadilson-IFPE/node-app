import { response } from "express";
import { UserService } from "./UserService";

jest.mock('./../repositories/UserRepository')
jest.mock('./../database', () => {
    initialize: jest.fn()
})

const mockUserRepository = require('./../repositories/UserRepository')
describe('UserService', () => {
    const userService = new UserService(mockUserRepository)

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createuser = jest.fn().mockImplementation(() =>
            Promise.resolve({
                user_id: '123456',
                name: 'Maria',
                email: 'maria@test.com',
                password: '123456'
            })
        )
        const response = await userService.createUser('Maria', 'maria@test.com', '123456');
        expect(mockUserRepository.createUser).toHaveBeenCalled();
        expect(response).toMatchObject({
            user_id: '123456',
            name: 'Maria',
            email: 'maria@test.com',
            password: '123456'
        })
    })
})