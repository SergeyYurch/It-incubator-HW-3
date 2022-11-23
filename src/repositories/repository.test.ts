// import {BlogEntity} from "../services/entities/blog.entity";
// import {PostEntity} from "../services/entities/post.entity";
// import {repository, dataBase} from "./repository";
//
//
// const testBlogEntity1: BlogEntity = {
//     name: 'name1',
//     websiteUrl: 'websiteUrl1',
//     createdAt: '2022-11-11T07:56:46.550Z'
//
// };
// const testBlogEntity2: BlogEntity = {
//     name: 'name2',
//     websiteUrl: 'websiteUrl2',
//     createdAt: '2022-11-11T07:56:46.550Z'
//
// };
// const testBlogEntityUpdate: BlogEntity = {
//     name: 'name3',
//     websiteUrl: 'websiteUrl3',
//     createdAt: '2022-11-11T07:56:46.550Z'
//
// };
//
// const testPostEntity1: PostEntity = {
//     title: 'title1',
//     shortDescription: 'shortDescription1',
//     content: 'content 1',
//     blogId: 'blog1',
//     createdAt: '2022-11-11T07:56:46.550Z'
// };
// const testPostEntity2: PostEntity = {
//     title: 'title2',
//     shortDescription: 'shortDescription2',
//     content: 'content 2',
//     blogId: 'blog2',
//     createdAt: '2022-11-11T07:56:46.550Z'
// };
// const testPostEntityUpdate: PostEntity = {
//     title: 'title3',
//     shortDescription: 'shortDescription3',
//     content: 'content 3',
//     blogId: 'blog3',
//     createdAt: '2022-11-11T07:56:46.550Z'
// };
// const {
//     dataBaseClear,
//     getAllBlogs,
//     createNewBlog,
//     getBlogById,
//     updateBlogById,
//     deleteBlogById,
//     getAllPosts,
//     createNewPost,
//     getPostById,
//     updatePostById,
//     deletePostById
// } = repository;
//
//
// describe('repository.ts / blogs', () => {
//
//     beforeAll(() => dataBaseClear());
//
//     test('should wright new blog', () => {
//         createNewBlog(testBlogEntity1);
//         expect(dataBase.blogs[0]).toEqual({
//             id: expect.any(String),
//             name: 'name1',
//             websiteUrl: 'websiteUrl1',
//             createdAt: '2022-11-11T07:56:46.550Z'
//         });
//     });
//
//     test('should add blog to DB', () => {
//         createNewBlog(testBlogEntity2);
//         expect(dataBase.blogs).toEqual([
//             {
//                 id: expect.any(String),
//                 name: 'name1',
//                 websiteUrl: 'websiteUrl1',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//             },
//             {
//                 id: expect.any(String),
//                 name: 'name2',
//                 websiteUrl: 'websiteUrl2',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//
//             }
//         ]);
//     });
//
//     test('should return 2 blogs from DB', () => {
//         expect(getAllBlogs()).toEqual([
//             {
//                 id: expect.any(String),
//                 name: 'name1',
//                 websiteUrl: 'websiteUrl1',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//             },
//             {
//                 id: expect.any(String),
//                 name: 'name2',
//                 websiteUrl: 'websiteUrl2',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//
//             }
//         ]);
//     });
//
//
//     test('should return 1 blog from DB', () => {
//         const id = getAllBlogs()[1].id;
//         expect(getBlogById(id)).toEqual(
//                 {
//                     id: expect.any(String),
//                     name: 'name2',
//                     websiteUrl: 'websiteUrl2',
//                     createdAt: '2022-11-11T07:56:46.550Z'
//                 }
//
//         );
//     });
//
//     test('should return undefined by incorrect ID from DB', () => {
//         expect(getBlogById('any-id')).toBeUndefined();
//     });
//
//
//     test('should return 1 blog after deleting record by ID from DB & return true', () => {
//         const id = getAllBlogs()[0].id;
//         expect(deleteBlogById(id)).toBe(true);
//         expect(dataBase.blogs).toEqual([
//             {
//                 id: expect.any(String),
//                 name: 'name2',
//                 websiteUrl: 'websiteUrl2',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//             }
//         ]);
//     });
//
//     test('should change blog by ID in DB and return true', () => {
//         const id = getAllBlogs()[0].id;
//         expect(updateBlogById(id, testBlogEntityUpdate)).toBe(true);
//         expect(dataBase.blogs).toEqual([
//             {
//                 id: expect.any(String),
//                 name: 'name3',
//                 websiteUrl: 'websiteUrl3',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//             }
//         ]);
//     });
//
//
// });
//
//
// //  *********** Tests posts ******************
// describe('repository.ts / posts', () => {
//
//     beforeAll(() => dataBaseClear());
//
//     test('should wright new post', () => {
//         createNewPost(testPostEntity1);
//         expect(dataBase.posts[0]).toEqual({
//             id: expect.any(String),
//             title: 'title1',
//             shortDescription: 'shortDescription1',
//             content: 'content 1',
//             blogId: 'blog1',
//             createdAt: '2022-11-11T07:56:46.550Z'
//         });
//     });
//
//     test('should add post to DB', () => {
//         createNewPost(testPostEntity2);
//         expect(dataBase.posts).toEqual([
//             {
//                 id: expect.any(String),
//                 title: 'title1',
//                 shortDescription: 'shortDescription1',
//                 content: 'content 1',
//                 blogId: 'blog1',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//             },
//             {
//                 id: expect.any(String),
//                 title: 'title2',
//                 shortDescription: 'shortDescription2',
//                 content: 'content 2',
//                 blogId: 'blog2',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//             }
//         ]);
//     });
//
//     test('should return 2 posts from DB', () => {
//         expect(getAllPosts()).toEqual([
//             {
//                 id: expect.any(String),
//                 title: 'title1',
//                 shortDescription: 'shortDescription1',
//                 content: 'content 1',
//                 blogId: 'blog1',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//             },
//             {
//                 id: expect.any(String),
//                 title: 'title2',
//                 shortDescription: 'shortDescription2',
//                 content: 'content 2',
//                 blogId: 'blog2',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//
//             }
//         ]);
//     });
//
//
//     test('should return 1 post from DB', () => {
//         const id = getAllPosts()[1].id;
//         expect(getPostById(id)).toEqual(
//             {
//                 id: expect.any(String),
//                 title: 'title2',
//                 shortDescription: 'shortDescription2',
//                 content: 'content 2',
//                 blogId: 'blog2',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//             }
//
//         );
//     });
//
//     test('should return undefined by incorrect ID from DB', () => {
//         expect(getPostById('any-id')).toBeUndefined();
//     });
//
//
//     test('should return 1 post after deleting record by ID from DB', () => {
//         const id = getAllPosts()[0].id;
//         expect(deletePostById(id)).toBe(true);
//         expect(dataBase.posts).toEqual([
//             {
//                 id: expect.any(String),
//                 title: 'title2',
//                 shortDescription: 'shortDescription2',
//                 content: 'content 2',
//                 blogId: 'blog2',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//             }
//         ]);
//     });
//
//     test('should change post by ID in DB and return true', () => {
//         const id = getAllPosts()[0].id;
//         expect(updatePostById(id, testPostEntityUpdate)).toBe(true)
//         expect(dataBase.posts).toEqual([
//             {
//                 id: expect.any(String),
//                 title: 'title3',
//                 shortDescription: 'shortDescription3',
//                 content: 'content 3',
//                 blogId: 'blog3',
//                 createdAt: '2022-11-11T07:56:46.550Z'
//             }
//         ]);
//     });
//
//
// });