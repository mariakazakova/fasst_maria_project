import { Request } from 'express';
import { ITortue } from '@entities/Tortue';


export const paramMissingError = 'One or more of the required parameters was missing.';

export interface IRequest extends Request {
    body: {
        user: ITortue;
    }
} 
