import {Router, Request, Response, NextFunction} from "express";

export const blogsRouter = Router();

blogsRouter.get('/', (req: Request, res: Response): void => {
    res.status(200).send('!!!!!!!!!!!!BLOGS!!!!!!!!!!!!');
});

blogsRouter.post('/', (req: Request, res: Response): void => {
    res.status(200).send('!!!!!!!!!!!!BLOGS!!!!!!!!!!!!');
});

blogsRouter.get('/:id', (req: Request, res: Response): void => {
    res.status(200).send('!!!!!!!!!!!!BLOGS!!!!!!!!!!!!');
});

blogsRouter.put('/:id', (req: Request, res: Response): void => {
    res.status(200).send('!!!!!!!!!!!!BLOGS!!!!!!!!!!!!');
});

blogsRouter.delete('/:id', (req: Request, res: Response): void => {
    res.status(200).send('!!!!!!!!!!!!BLOGS!!!!!!!!!!!!');
});
