import {PostViewModelDto} from "../controllers/dto/postViewModel.dto";
import {PostInputModelDto} from "../controllers/dto/postInputModel.dto";
import {repository} from "../repositories/repository";
import {PostEntity} from "./entities/post.entity";
import {PostDbInterface} from "../repositories/repository.interface";
import {PostsServiceInterface} from "./posts.service.interface";

const {
    returnAllPosts,
    createNewPost,
    returnPostById,
    updatePostById,
    deletePostById,
    returnBlogById
} = repository;


export const postsService: PostsServiceInterface = {
    getAllPosts: (): PostViewModelDto[] => {
        const postsFromDb = returnAllPosts();
        const result: PostViewModelDto[] = [];
        postsFromDb.forEach(p => {
            const blogName = returnBlogById(p.blogId)?.name;
            if (blogName) {
                result.push({
                    id: p.id,
                    title: p.title,
                    shortDescription: p.shortDescription,
                    content: p.content,
                    blogId: p.blogId,
                    blogName: blogName
                });
            }
        });
        return result;
    },
    createNewPost: (post: PostInputModelDto): PostViewModelDto | undefined => {
        console.log('createNewPost');
        const {title, shortDescription, content, blogId} = post;
        const blogName = returnBlogById(blogId)?.name;
        if (!blogName) return;
        const dateAt = new Date().toISOString();
        const newPost: PostEntity = {
            title, shortDescription, content, blogId, dateAt
        };
        const postInDb = createNewPost(newPost);
        return {
            id: postInDb.id,
            title: postInDb.title,
            shortDescription: postInDb.shortDescription,
            content: postInDb.content,
            blogId: postInDb.blogId,
            blogName: blogName
        };
    },
    getPostById: (id: string): PostViewModelDto | undefined => {
        const postFromDb = returnPostById(id);
        if (!postFromDb) return;
        const {title, shortDescription, content, blogId} = postFromDb;
        const blogName = returnBlogById(blogId)?.name;
        if (!blogName) return;
        return {
            id,
            title,
            shortDescription,
            content,
            blogId,
            blogName
        };
    },

    editPostById: (id: string, post: PostInputModelDto): boolean => {
        const {title, shortDescription, content, blogId} = post;
        const oldPost = returnPostById(id);
        if (!oldPost) return false;
        const postToDb: PostDbInterface = {
            id,
            title,
            dateAt: oldPost.dateAt,
            blogId,
            content,
            shortDescription
        };
        return updatePostById(id, postToDb);
    },

    deletePostById: (id: string): boolean => {
        if (!returnPostById) return false;
        return deletePostById(id);
    },
};