import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { AppDataSource } from './database';
import { router } from './routes';

const server = express();

server.use(express.json())
server.use(router)

const port = 5000

server.get('/', (request: Request, response: Response) => {
    return response.status(200).json({ message: 'DioBank API' })
})

server.listen(port, () => console.log('Server is running on port', port))


