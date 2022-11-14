import {Request, Response, NextFunction} from 'express';
import {encode} from 'js-base64';

const noneAuthMethods = ['GET', 'get'];
const login = 'admin';
const pass = 'qwerty';
const base64String = encode(`${login}:${pass}`);
const validAuthString = `Basic ${base64String}`;

export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {

    if (noneAuthMethods.includes(req.method) || validAuthString === req.headers.authorization) {

        console.log('Auth is ok!');
        return next();
    }
    console.log( noneAuthMethods.includes(req.method));
    console.log(validAuthString === req.headers.authorization);
    res.sendStatus(401);
};