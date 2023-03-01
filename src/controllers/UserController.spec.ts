
import { UserService } from '../services/UserService';
import { UserController } from './UserController';
import { makeMockResponse } from '../__mocks__/mockResponse.mock'
import { Request } from 'express';

const mockUserService = {
    createUser: jest.fn()
}

jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe('UserController', () => {

    const userController = new UserController();
    const mockResponse = makeMockResponse()

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Maria',
                email: 'maria@dio.bank',
                password: '123456'
            }
        } as Request;

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve retornar erro caso o usuário não informe o nome', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'maria@dio.bank',
                password: '123456'
            }
        } as Request;

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: Todos os campos são obrigatórios' })
    })

    it('Deve retornar erro caso o usuário não informe o e-mail', () => {
        const mockRequest = {
            body: {
                name: 'Maria',
                email: '',
                password: '123456'
            }
        } as Request;

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: Todos os campos são obrigatórios' })
    })

    it('Deve retornar erro caso o usuário não informe a senha', () => {
        const mockRequest = {
            body: {
                name: 'Maria',
                email: 'maria@dio.bank',
                password: ''
            }
        } as Request;

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: Todos os campos são obrigatórios' })
    })
})