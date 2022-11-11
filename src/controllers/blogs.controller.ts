import {Router, Request, Response, NextFunction} from "express";
import {validatorMiddleware} from "../middlewares/validator.middleware";
import {validationResult} from "express-validator";

export const blogsRouter = Router();
const {validatePostInputModel} = validatorMiddleware;

blogsRouter.get('/', (req: Request, res: Response) => {
    return res.status(200).send('!!!!!!!!!!!!BLOGS!!!!!!!!!!!!');
});

blogsRouter.post('/', validatePostInputModel(), (req: Request, res: Response) => {
    const result = validationResult(req);
    const errors={errorsMessages: result.array().map(e=>({message: e.msg, field: e.param }))}
    if (!result.isEmpty())  return res.status(400).json(errors);
    return res.status(200).send('!!!!!!!!!!!!BLOGS!!!!!!!!!!!!');
});

blogsRouter.get('/:id', (req: Request, res: Response) => {
    return res.status(200).send('!!!!!!!!!!!!BLOGS!!!!!!!!!!!!');
});

blogsRouter.put('/:id', validatePostInputModel(), (req: Request, res: Response) => {
    const result = validationResult(req);
    const errors={errorsMessages: result.array().map(e=>({message: e.msg, field: e.param }))}
    if (!result.isEmpty())  return res.status(400).json(errors);
    return res.status(200).send('!!!!!!!!!!!!BLOGS!!!!!!!!!!!!');
});

blogsRouter.delete('/:id', (req: Request, res: Response) => {
    return res.status(200).send('!!!!!!!!!!!!BLOGS!!!!!!!!!!!!');
});
