import {Router, Request, Response, NextFunction} from "express";
export const postsRouter = Router();

postsRouter.use((req: Request, res: Response, next: NextFunction) => {
    next();
});

postsRouter.get('/', (req: Request, res: Response): void => {
        res.status(200).send('!!!!!!!!!!!!POSTS!!!!!!!!!!!!');

    }
);
