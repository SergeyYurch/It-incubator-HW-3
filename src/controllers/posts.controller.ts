import {Router, Request, Response} from "express";
import {validatorMiddleware} from "../middlewares/validator.middleware";
import {validationResult} from "express-validator";
import {postsService} from "../services/postsService";
import {PostInputModelDto} from "./dto/postInputModel.dto";
import {
    RequestWithBody, RequestWithId,
    RequestWithIdAndBody
} from "../types/request.type";
import {blogsService} from "../services/blogs.service";
import {APIErrorResultModel, FieldError} from "./dto/apiErrorResult.dto";

export const postsRouter = Router();
const {validatePostInputModel} = validatorMiddleware;
const {deletePostById, getAllPosts, editPostById, getPostById, createNewPost} = postsService;
const {getBlogById} = blogsService;

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = getAllPosts();
    return res.status(200).json(posts);
});

postsRouter.post('/', validatePostInputModel(), (req: RequestWithBody<PostInputModelDto>, res: Response) => {
    const result = validationResult(req);
    const errors: APIErrorResultModel  = {
        errorsMessages: result.array().map(e => ({
            message: e.msg,
            field: e.param
        }))
    };
    console.log(errors);
    if (!result.isEmpty()) return res.status(400).json(errors);
    const {title, shortDescription, content, blogId} = req.body;
    // let validationError: FieldError[] = result.array().map(e => ({message: e.msg, field: e.param}));
    // const errors: FieldError[] = (blogId && !getBlogById(blogId))
    //     ? [...validationError, {
    //         message: 'Incorrect blogId',
    //         field: 'blogId'
    //     }] : [...validationError];
    // if (errors.length > 0) return res.status(400).json({errorsMessages: errors});
    const createdPost = createNewPost({title, shortDescription, content, blogId});
    return createdPost ? res.status(201).json(createdPost) : res.sendStatus(500);
});

postsRouter.get('/:id', (req: RequestWithId, res: Response) => {
    const id = req.params.id;
    const result = getPostById(id);
    return result ? res.status(200).json(result) : res.sendStatus(404);
});

postsRouter.put('/:id', validatePostInputModel(), (req: RequestWithIdAndBody<PostInputModelDto>, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    const result = validationResult(req);
    const errors: APIErrorResultModel = {
        errorsMessages: result.array().map(e => ({
            message: e.msg,
            field: e.param
        }))
    };
    if (!result.isEmpty()) return res.status(400).json(errors);
    const post: PostInputModelDto = {
        title: body.title,
        blogId: body.blogId,
        content: body.content,
        shortDescription: body.shortDescription
    };
    return editPostById(id, post) ? res.sendStatus(204) : res.sendStatus(404);
});

postsRouter.delete('/:id', (req: RequestWithId, res: Response) => {
    const id = req.params.id;
    if (!getPostById(id)) return res.sendStatus(404);
    return deletePostById(id) ? res.sendStatus(204) : res.sendStatus(500);
});

