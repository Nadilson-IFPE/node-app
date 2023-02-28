import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDB: User[] = []
    const userService = new UserService(mockDB);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log');
        userService.createUser('Maria', 'maria@dio.bank');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado:', mockDB);
    })
})