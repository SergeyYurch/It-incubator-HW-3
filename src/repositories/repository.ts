import {v4 as uuidv4} from 'uuid';
import {PostEntity} from "../services/entities/post.entity";
import {BlogEntity} from "../services/entities/blog.entity";
import {
    BlogDbInterface,
    DataBaseType,
    PostDbInterface,
    RepositoryInterface
} from "./repository.interface";

const dataBase: DataBaseType = {
    posts: [],
    blogs: []
};

export const repository:RepositoryInterface =
    {
        dataBaseClear: (): boolean => {
            dataBase.posts = [];
            dataBase.blogs = [];
            return true;
        },

        returnAllBlogs: (): BlogDbInterface[] => {
            return dataBase.blogs;
        },

        createNewBlog: (inputBlog: BlogEntity): BlogDbInterface => {
            const id: string = uuidv4();
            const newBlog: BlogDbInterface = {
                id,
                name: inputBlog.name,
                youtubeUrl: inputBlog.youtubeUrl,
                dateAt: inputBlog.dateAt
            };
            dataBase.blogs.push(newBlog);
            return newBlog;
        },

        returnBlogById: (id: string): BlogDbInterface | undefined => {
            return dataBase.blogs.find(b => b.id === id);
        },

        updateBlogById: (id: string, inputBlog: BlogEntity): boolean => {
            const newBlog:BlogDbInterface ={id, ...inputBlog};
            dataBase.blogs = dataBase.blogs.map(b => b.id === id ? newBlog : b);
            return true;
        },

        deleteBlogById: (id: string):boolean => {
            dataBase.blogs = dataBase.blogs.filter(b => b.id !== id);
            return true;
        },

        returnAllPosts: (): PostDbInterface[] => {
            return dataBase.posts;
        },

        createNewPost: (inputPost: PostEntity): PostDbInterface => {
            const id: string = uuidv4();
            const newPost: PostDbInterface = {id, ...inputPost};
            dataBase.posts.push(newPost);
            return newPost;
        },

        returnPostById: (id: string): PostDbInterface | undefined => {
            return dataBase.posts.find(p => p.id === id);
        },

        updatePostById: (id: string, inputPost: PostEntity): boolean => {
            const newPost: PostDbInterface = {id, ...inputPost};
            dataBase.posts = dataBase.posts.map(p => p.id === id ? newPost : p);
            return true;
        },

        deletePostById: (id: string): boolean => {
            dataBase.posts = dataBase.posts.filter(p => p.id !== id);
            return true;
        }
    };