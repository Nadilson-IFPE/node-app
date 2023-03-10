import { response } from "express";
import { UserService } from "./UserService";
import * as jwt from 'jsonwebtoken'

jest.mock('./../repositories/UserRepository')
jest.mock('./../database', () => {
    initialize: jest.fn()
})

jest.mock('jsonwebtoken')

const mockUserRepository = require('./../repositories/UserRepository')
describe('UserService', () => {
    const userService = new UserService(mockUserRepository)
    const mockUser = {
        user_id: '123456',
        name: 'Maria',
        email: 'maria@test.com',
        password: '123456'
    }

    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() =>
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



    it('Deve retornar um token do usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('maria@test.com', '123456')
        expect(token).toBe('token')
    })


    it('Deve retornar um erro caso não encontre um usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
        await expect(userService.getToken('nadilson@diobank.com', '123456')).rejects.toThrowError(new Error('E-mail ou senha inválidos'))
    })


})