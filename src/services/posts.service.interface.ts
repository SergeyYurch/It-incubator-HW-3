import {PostViewModelDto} from "../controllers/dto/postViewModel.dto";
import {PostInputModelDto} from "../controllers/dto/postInputModel.dto";

export interface PostsServiceInterface {
    getAllPosts: () => PostViewModelDto[];
    createNewPost: (post: PostInputModelDto) => PostViewModelDto | undefined;
    getPostById: (id: string) => PostViewModelDto | undefined;
    editPostById: (id: string, post:PostInputModelDto) => boolean;
    deletePostById: (id: string) => boolean;
}