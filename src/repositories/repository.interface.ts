import {PostEntity} from "../services/entities/post.entity";
import {BlogEntity} from "../services/entities/blog.entity";
import {ObjectId} from "mongodb";

export interface PostDbInterface extends PostEntity {
    _id: ObjectId;

}

export interface BlogDbInterface extends BlogEntity {
    _id: ObjectId;
}

export interface DataBaseType {
    posts: PostDbInterface[];
    blogs: BlogDbInterface[];
}

export interface RepositoryInterface {
    dataBaseClear: () => Promise<boolean>;
    getAllBlogs: () => Promise<BlogDbInterface[]>;
    createNewBlog: (inputBlog: BlogEntity) => Promise<BlogDbInterface | null>;
    getBlogById: (id: string) => Promise<BlogDbInterface | null>;
    updateBlogById: (id: string, inputBlog: BlogEntity) => Promise<boolean>;
    deleteBlogById: (id: string) => Promise<boolean>;
    getAllPosts: () => Promise<PostDbInterface[]>;
    createNewPost: (inputPost: PostEntity) => Promise<PostDbInterface>;
    getPostById: (id: string) => Promise<PostDbInterface | null>;
    updatePostById: (id: string, inputPost: PostEntity) => Promise<boolean>;
    deletePostById: (id: string) => Promise<boolean>;
}