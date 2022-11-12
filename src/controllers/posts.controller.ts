import {Router, Request, Response} from "express";
import {validatorMiddleware} from "../middlewares/validator.middleware";
import {validationResult} from "express-validator";
import {postsService} from "../services/postsService";

export const postsRouter = Router();
const {validatePostInputModel} = validatorMiddleware;
const {deletePostById, getAllPosts, editPostById, getPostById, createNewPost} = postsService;

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = getAllPosts();
    return res.status(200).json(posts);
});

postsRouter.post('/', validatePostInputModel(), (req: Request, res: Response) => {
    const result = validationResult(req);
    const errors = {errorsMessages: result.array().map(e => ({message: e.msg, field: e.param}))};
    if (!result.isEmpty()) return res.status(400).json(errors);
    const {title, shortDescription, content, blogId} = req.body;
    const createdPost = createNewPost({title, shortDescription, content, blogId});
    return createdPost ? res.status(201).json(createdPost) : res.sendStatus(500);
});

postsRouter.get('/:id', (req: Request, res: Response) => {
    const id  = req.params.id;
    if (!id) return res.sendStatus(404)
    const result = getPostById(id);
    return result ? res.status(200).json(result) : res.sendStatus(404);
});

postsRouter.put('/:id', validatePostInputModel(), (req: Request, res: Response) => {
    const id  = req.params.id;
    if (!id ||!getPostById(id)) return res.sendStatus(404);
    const result = validationResult(req);
    const errors = {errorsMessages: result.array().map(e => ({message: e.msg, field: e.param}))};
    if (!result.isEmpty()) return res.status(400).json(errors);
    const resultPut = editPostById(id, req.body);
    return resultPut ? res.sendStatus(204) : res.sendStatus(500);
});

postsRouter.delete('/:id', (req: Request, res: Response) => {
    const id  = req.params.id;
    if (!id || !getPostById(id)) return res.sendStatus(404);
    const result = deletePostById(id);
    return result ? res.sendStatus(204) :res.sendStatus(500);
});

