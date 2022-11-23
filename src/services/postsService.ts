import {PostViewModelDto} from "../controllers/dto/postViewModel.dto";
import {PostInputModelDto} from "../controllers/dto/postInputModel.dto";
import {repository} from "../repositories/repositoryMongo";
import {PostEntity} from "./entities/post.entity";
import {PostDbInterface} from "../repositories/repository.interface";
import {PostsServiceInterface} from "./posts.service.interface";

const {
    getAllPosts,
    createNewPost,
    getPostById,
    updatePostById,
    deletePostById,
    getBlogById
} = repository;


export const postsService = {
    getAllPosts: (): PostViewModelDto[] | null => {
        const postsFromDb = getAllPosts();
        const result: PostViewModelDto[] = [];
        // postsFromDb.forEach(p => {
        //     const blogName = getBlogById(p.blogId)?.name;
        //     if (blogName) {
        //         result.push({
        //             id: p.id,
        //             title: p.title,
        //             shortDescription: p.shortDescription,
        //             content: p.content,
        //             blogId: p.blogId,
        //             blogName: blogName
        //         });
        //     }
        // });
     //  return result;
        return null
    },
    createNewPost: (post: PostInputModelDto): PostViewModelDto | null => {
        const {title, shortDescription, content, blogId} = post;
        // const blogName = getBlogById(blogId)?.name;
        // if (!blogName) return null ;
        const createdAt = new Date().toISOString();
        const newPost: PostEntity = {
            title, shortDescription, content, blogId, createdAt
        };
        const postInDb = createNewPost(newPost);
        // return {
        //     id: postInDb.id,
        //     title: postInDb.title,
        //     shortDescription: postInDb.shortDescription,
        //     content: postInDb.content,
        //     blogId: postInDb.blogId,
        //     blogName: blogName
        // };
        return null;
    },
    getPostById: (id: string): PostViewModelDto | null => {
        const postFromDb = getPostById(id);
        if (!postFromDb) return null;
        // const {title, shortDescription, content, blogId} = postFromDb;
        // const blogName = getBlogById(blogId)?.name;
        // if (!blogName) return;
        // return {
        //     id,
        //     title,
        //     shortDescription,
        //     content,
        //     blogId,
        //     blogName
        // };
        return  null;
    },

    editPostById: (id: string, post: PostInputModelDto): boolean => {
        // const {title, shortDescription, content, blogId} = post;
        // const oldPost = getPostById(id);
        // if (!oldPost) return false;
        // const postToDb: PostEntity = {
        //     title,
        //     createdAt: oldPost.createdAt,
        //     blogId,
        //     content,
        //     shortDescription
        // };
        // return updatePostById(id, postToDb);
        return true
    },

    deletePostById: (id: string): boolean => {
        if (!getPostById) return false;
        return deletePostById(id);
    },
};