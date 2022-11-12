import {PostEntity} from "../services/entities/post.entity";
import {BlogEntity} from "../services/entities/blog.entity";

export interface PostDbInterface extends PostEntity {
    id: string;
}

export interface BlogDbInterface extends BlogEntity {
    id: string;
}

export interface DataBaseType {
    posts: PostDbInterface[];
    blogs: BlogDbInterface[];
}

export interface RepositoryInterface {
    dataBaseClear: () => boolean;
    returnAllBlogs: () => BlogDbInterface[];
    createNewBlog: (inputBlog: BlogEntity) => BlogDbInterface;
    returnBlogById: (id: string) => BlogDbInterface | undefined;
    updateBlogById: (id: string, inputBlog: BlogEntity) => boolean;
    deleteBlogById: (id: string) => boolean;
    returnAllPosts: () => PostDbInterface[];
    createNewPost: (inputPost: PostEntity) => PostDbInterface;
    returnPostById: (id: string) => PostDbInterface | undefined;
    updatePostById: (id: string, inputPost: PostEntity) => boolean;
    deletePostById: (id: string) => boolean;
}