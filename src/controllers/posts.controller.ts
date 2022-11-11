import {Router, Request, Response, NextFunction} from "express";
import {validatorMiddleware} from "../middlewares/validator.middleware";
import {ValidationError, validationResult} from "express-validator";
import {APIErrorResultModel, FieldError} from "./dto/apiErrorResult.dto";

export const postsRouter = Router();
const {validatePostInputModel} = validatorMiddleware;

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = getAllPosts();
    return res.status(200).send('!!!!!!!!!!!!POSTS!!!!!!!!!!!!');
});

postsRouter.post('/', validatePostInputModel(), (req: Request, res: Response) => {
    const result = validationResult(req);
    const errors={errorsMessages: result.array().map(e=>({message: e.msg, field: e.param }))}
    if (!result.isEmpty())  return res.status(400).json(errors);

    return res.status(200).send('!!!!!!!!!!!!POSTS!!!!!!!!!!!!');
});

postsRouter.get('/:id', (req: Request, res: Response) => {
    return res.status(200).send('!!!!!!!!!!!!POSTS!!!!!!!!!!!!');
});

postsRouter.put('/:id', validatePostInputModel(), (req: Request, res: Response) => {
    const result = validationResult(req);
    const errors={errorsMessages: result.array().map(e=>({message: e.msg, field: e.param }))}
    if (!result.isEmpty())  return res.status(400).json(errors);
    return  res.status(200).send('!!!!!!!!!!!!POSTS!!!!!!!!!!!!');
});

postsRouter.delete('/:id', (req: Request, res: Response) => {
    return  res.status(200).send('!!!!!!!!!!!!POSTS!!!!!!!!!!!!');
});

