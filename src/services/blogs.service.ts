import {repository} from "../repositories/repository";
import {BlogViewModelDto} from "../controllers/dto/blogViewModel.dto";
import {BlogsServiceInterface} from "./blogs.service.interface";
import {BlogInputModelDto} from "../controllers/dto/blogInputModel.dto";
import {BlogEntity} from "./entities/blog.entity";
import {BlogDbInterface} from "../repositories/repository.interface";

const {
    returnAllBlogs,
    createNewBlog,
    updateBlogById,
    returnBlogById,
    deleteBlogById
} = repository;

export const blogsService: BlogsServiceInterface = {

    getAllBlogs: (): BlogViewModelDto[] => {
        const blogsFromDb = returnAllBlogs();
        return blogsFromDb.map(p => ({
            id: p.id,
            name: p.name,
            youtubeUrl: p.youtubeUrl
        }));
    },

    createNewBlog: (blog: BlogInputModelDto): BlogViewModelDto | undefined => {
        const {name, youtubeUrl} = blog;
        const dateAt = new Date().toISOString();
        const newBlog: BlogEntity = {
            name, youtubeUrl, dateAt
        };
        const blogInDb = createNewBlog(newBlog);
        return {
            id: blogInDb.id,
            name: blogInDb.name,
            youtubeUrl: blogInDb.youtubeUrl
        };
    },

    getBlogById: (id: string): BlogViewModelDto | undefined => {
        const blogFromDb = returnBlogById(id);
        if (!blogFromDb) return;
        const {name, youtubeUrl} = blogFromDb;
        return {
            id,
            name,
            youtubeUrl
        };
    },

    editBlogById: (id: string, blog: BlogInputModelDto): boolean => {
        const {name, youtubeUrl} = blog;
        const oldBlog = returnBlogById(id);
        if (!oldBlog) return false;
        const blogToDb: BlogDbInterface = {
            id,
            name,
            youtubeUrl,
            dateAt: oldBlog.dateAt
        };
        return updateBlogById(id, blogToDb);
    },


    deleteBlogById: (id: string): boolean => {
        if (returnBlogById(id)) return false;
        return deleteBlogById(id);
    },
};