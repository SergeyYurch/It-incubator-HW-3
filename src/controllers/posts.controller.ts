import {Router, Request, Response, NextFunction} from "express";
export const postsRouter = Router();

postsRouter.get('/', (req: Request, res: Response): void => {
        res.status(200).send('!!!!!!!!!!!!POSTS!!!!!!!!!!!!');
    });

postsRouter.post('/', (req: Request, res: Response): void => {
    res.status(200).send('!!!!!!!!!!!!POSTS!!!!!!!!!!!!');
});

postsRouter.get('/', (req: Request, res: Response): void => {
    res.status(200).send('!!!!!!!!!!!!POSTS!!!!!!!!!!!!');
});

postsRouter.put('/', (req: Request, res: Response): void => {
    res.status(200).send('!!!!!!!!!!!!POSTS!!!!!!!!!!!!');
});

postsRouter.delete('/', (req: Request, res: Response): void => {
    res.status(200).send('!!!!!!!!!!!!POSTS!!!!!!!!!!!!');
});

