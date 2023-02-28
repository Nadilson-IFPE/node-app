import { EntityManager } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from './../database/index';


export class UserRepository {
    private manager: EntityManager

    constructor(manager = AppDataSource.manager) {
        this.manager = manager;
    }

    createUser = async (user: User) => {
        return this.manager.save(user)
    }
}