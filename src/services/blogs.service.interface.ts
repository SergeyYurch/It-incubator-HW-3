import {BlogViewModelDto} from "../controllers/dto/blogViewModel.dto";
import {BlogInputModelDto} from "../controllers/dto/blogInputModel.dto";


export interface BlogsServiceInterface {
    getAllBlogs: () => BlogViewModelDto[];
    createNewBlog: (post: BlogInputModelDto) => BlogViewModelDto | undefined;
    getBlogById: (id: string) => BlogViewModelDto | undefined;
    editBlogById: (id: string, post:BlogInputModelDto) => boolean;
    deleteBlogById: (id: string) => boolean;
}