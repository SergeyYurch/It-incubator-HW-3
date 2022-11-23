import {v4 as uuidv4} from 'uuid';
import {PostEntity} from "../services/entities/post.entity";
import {BlogEntity} from "../services/entities/blog.entity";
import {
    BlogDbInterface,
    PostDbInterface,
    RepositoryInterface
} from "./repository.interface";
import {blogsCollection, postsCollection} from "./db";
import {ObjectId} from "mongodb";
import {BlogEditEntity} from "../services/entities/blog-edit.entity";

export const repository  = {
    dataBaseClear:async (): Promise<boolean> => {
        const resultBlogs = await blogsCollection.deleteMany({});
        const resultPosts = await postsCollection.deleteMany({});
        return resultBlogs.acknowledged && resultPosts.acknowledged;
    },

    getAllBlogs: async (): Promise<BlogDbInterface[]> => {
        const result =blogsCollection.find({}).toArray();
        return result
    },

    createNewBlog: async (inputBlog: BlogEntity): Promise<BlogDbInterface | null>  => {
        const newBlog: BlogEntity = {
            name: inputBlog.name,
            websiteUrl: inputBlog.websiteUrl,
            description: inputBlog.description,
            createdAt: inputBlog.createdAt
        };
        const result  = await blogsCollection.insertOne(newBlog);
        const createdBlog = await blogsCollection.findOne({_id:result.insertedId})
        return createdBlog
    },

    getBlogById: async (id: string): Promise<BlogDbInterface | null> => {
        return await blogsCollection.findOne({_id:new ObjectId(id)});
    },
    //
    updateBlogById: async (id: string, inputBlog: BlogEditEntity): Promise<boolean> => {
       const result = await blogsCollection.updateOne({_id:new ObjectId(id)}, {$set: inputBlog});
        return result.acknowledged;
    },
    deleteBlogById: async (id: string): Promise<boolean> => {
        const result = await blogsCollection.deleteOne({_id:new ObjectId(id)});
        return result.acknowledged;
    },

    getAllPosts: (): PostDbInterface[] | null=> {
        return null;
    },

    createNewPost: (inputPost: PostEntity): PostDbInterface|null  => {
        const id: string = uuidv4();
        // const newPost: PostDbInterface = {id, ...inputPost};
        // dataBase.posts.push(newPost);
        return null;
    },

    getPostById: async (id: string): Promise<PostDbInterface| null>  => {
        return null
    },

    updatePostById: (id: string, inputPost: PostEntity): boolean => {
        // const newPost: PostDbInterface = {id, ...inputPost};
        // dataBase.posts = dataBase.posts.map(p => p.id === id ? newPost : p);
        return true;
    },

    deletePostById: (id: string): boolean => {
        // dataBase.posts = dataBase.posts.filter(p => p.id !== id);
        return true;
    }
};