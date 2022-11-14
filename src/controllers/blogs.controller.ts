import {Router, Request, Response} from "express";
import {validatorMiddleware} from "../middlewares/validator.middleware";
import {validationResult} from "express-validator";
import {blogsService} from "../services/blogs.service";
import {
    RequestWithBody,
    RequestWithId, RequestWithIdAndBody,
} from "../types/request.type";
import {BlogInputModelDto} from "./dto/blogInputModel.dto";
import {APIErrorResultModel} from "./dto/apiErrorResult.dto";

export const blogsRouter = Router();

const {validateBlogInputModel} = validatorMiddleware;
const {getAllBlogs, createNewBlog, editBlogById, getBlogById, deleteBlogById} = blogsService;

blogsRouter.get('/', (req: Request, res: Response) => {
    return res.status(200).json(getAllBlogs());
});

blogsRouter.post('/',
    validateBlogInputModel(),
    (req: RequestWithBody<BlogInputModelDto>, res: Response) => {
        const result = validationResult(req);
        const errors: APIErrorResultModel  = {
            errorsMessages: result.array().map(e => ({
                message: e.msg,
                field: e.param
            }))
        };
        if (!result.isEmpty()) return res.status(400).json(errors);
        const {name, youtubeUrl} = req.body;
        const blogFromDb = createNewBlog({name, youtubeUrl});
        return blogFromDb ? res.status(201).json(blogFromDb) : res.sendStatus(500);
    });

blogsRouter.get('/:id', (req: RequestWithId, res: Response) => {
    const id = req.params.id;
    const result = getBlogById(id);
    return result ? res.status(200).json(result) : res.sendStatus(404);
});

blogsRouter.put('/:id',
    validateBlogInputModel(),
    (req: RequestWithIdAndBody<BlogInputModelDto>, res: Response) => {
        const id = req.params.id;
        const isExistBlog = getBlogById(id);
        if (!isExistBlog) return res.sendStatus(404);
        const result = validationResult(req);
        const errors: APIErrorResultModel = {
            errorsMessages: result.array().map(e => ({
                message: e.msg,
                field: e.param
            }))
        };
        if (!result.isEmpty()) return res.status(400).json(errors);
        const {name, youtubeUrl} = req.body;
        const inputBlog: BlogInputModelDto = {name, youtubeUrl};
        return !editBlogById(id, inputBlog) ? res.sendStatus(500) : res.sendStatus(204);
    });

blogsRouter.delete('/:id', (req: RequestWithId, res: Response) => {
    const id = req.params.id;
    return deleteBlogById(id) ? res.sendStatus(204) : res.sendStatus(404);
});
