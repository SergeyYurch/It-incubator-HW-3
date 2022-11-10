import {Router, Request, Response, NextFunction} from "express";
export const testingRouter = Router();

testingRouter.use((req: Request, res: Response, next: NextFunction) => {
    next();
});

//////////////////////
const clearDb = ()=>true;

testingRouter.delete('/all-data', (req: Request, res: Response): void => {
        const result = clearDb();
        if (result) {
            res.sendStatus(204);
        } else {
            res.sendStatus(500);
        }
    }
);
