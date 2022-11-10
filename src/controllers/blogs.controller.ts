import {Router, Request, Response, NextFunction} from "express";
export const blogsRouter = Router();

blogsRouter.use((req: Request, res: Response, next: NextFunction) => {
    next();
});

blogsRouter.get('/', (req: Request, res: Response): void => {
            res.status(200).send('!!!!!!!!!!!!BLOGS!!!!!!!!!!!!');
    }
);
