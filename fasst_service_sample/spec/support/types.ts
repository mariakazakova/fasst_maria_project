import { Response } from 'supertest';
import { ITortue } from '@entities/Tortue';


export interface IResponse extends Response {
    body: {
        users: ITortue[];
        error: string;
    };
}

export interface IReqBody {
    user?: ITortue;
}
