import {PostInputModelDto} from "../controllers/dto/postInputModel.dto";
import {BlogInputModelDto} from "../controllers/dto/blogInputModel.dto";
import { v4 as uuidv4 } from 'uuid';

export interface PostInDataBaseDto extends PostInputModelDto {
    id:string
}

export interface BlogInDataBaseDto extends BlogInputModelDto {
    id:string
}

interface DataBaseType {
    posts: PostInDataBaseDto[];
    blogs: BlogInDataBaseDto[];
};

const dataBase: DataBaseType = {
    posts:[],
    blogs:[]
};

export const dataBaseClear = () => {
    dataBase.posts = [];
    dataBase.blogs=[];
};

const {posts, blogs} = dataBase;

export const returnAllBlogs = ()=> {
    return blogs;
};

export const createNewBlog = (inputBlog:BlogInputModelDto):BlogInDataBaseDto=> {
    const id:string = uuidv4();
    const blogToDataBase:BlogInDataBaseDto = {
        id,
        name: inputBlog.name,
        youtubeUrl: inputBlog.youtubeUrl
    }
    blogs.push(blogToDataBase);
    return blogToDataBase;
};
export const returnBlogById = (id:string)=> {

};
export const updateBlogById = (id:string, inputBlog:BlogInputModelDto)=> {};
export const deleteBlogById = (id:string)=> {};

export const returnAllPosts = ()=> {};
export const createNewPost = ()=> {};
export const returnPostById = (id:string)=> {};
export const updatePostById = (id:string, inputPost:PostInputModelDto)=> {};
export const deletePostById = (id:string)=> {};