import request from 'supertest';
import {app} from "../src";
import {blog1, blog2} from "./testData";


describe('DELETE: /testing/all-data', () => {

    it('should deleted all data and return code 204', async () => {
        await request(app)
            .delete('/testing/all-data')
            .auth('admin', 'qwerty', {type: "basic"})
            .expect(204);
    });

    it('should return code 401 "Unauthorized"', async () => {
        await request(app)
            .delete('/testing/all-data')
            .expect(401);
    });

});


describe('POST: /blogs create new blog', () => {

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
            .auth('admin', 'qwerty', {type: "basic"});
    });

    it('should return code 401 "Unauthorized" for unauthorized request', async () => {
        await request(app)
            .post('/blogs')
            .expect(401);
    });

    it('should return code 201 and newBlog for correct input data', async () => {
        const newBlog1 = await request(app)
            .post('/blogs')
            .auth('admin', 'qwerty', {type: "basic"})
            .send(blog1)
            .expect(201);

        expect(newBlog1.body).toEqual({
            id: expect.any(String),
            name: 'blog1',
            youtubeUrl: 'https://youtube1.com'
        });
    });

    it('should return code 400 and error with field name for blog without name ', async () => {
        const newBlog1 = await request(app)
            .post('/blogs')
            .auth('admin', 'qwerty', {type: "basic"})
            .send({
                youtubeUrl: 'https://youtube2.com'
            })
            .expect(400);

        expect(newBlog1.body).toEqual({
            errorsMessages: [{
                message: expect.any(String),
                field: 'name'
            }]
        });
    });

    it('should return code 400 and error with field name for blog with long name ', async () => {
        const newBlog1 = await request(app)
            .post('/blogs')
            .auth('admin', 'qwerty', {type: "basic"})
            .send({
                name: '123456789123456789',
                youtubeUrl: 'https://youtube2.com'
            })
            .expect(400);

        expect(newBlog1.body).toEqual({
            errorsMessages: [{
                message: expect.any(String),
                field: 'name'
            }]
        });
    });

    it('should return code 400 and error with field youtubeUrl for blog with incorrect youtubeUrl ', async () => {
        const newBlog1 = await request(app)
            .post('/blogs')
            .auth('admin', 'qwerty', {type: "basic"})
            .send({
                name: 'name',
                youtubeUrl: 'youtube2.com'
            })
            .expect(400);

        expect(newBlog1.body).toEqual({
            errorsMessages: [{
                message: expect.any(String),
                field: 'youtubeUrl'
            }]
        });
    });

    it('should return code 400 and error with field youtubeUrl for blog without youtubeUrl ', async () => {
        const newBlog1 = await request(app)
            .post('/blogs')
            .auth('admin', 'qwerty', {type: "basic"})
            .send({
                name: 'name',
                youtubeUrl: 'youtube2.com'
            })
            .expect(400);

        expect(newBlog1.body).toEqual({
            errorsMessages: [{
                message: expect.any(String),
                field: 'youtubeUrl'
            }]
        });
    });
});

describe('GET: /blogs get all blogs', () => {

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
            .auth('admin', 'qwerty', {type: "basic"});

        //create new blog
        await request(app)
            .post('/blogs')
            .auth('admin', 'qwerty', {type: "basic"})
            .send(blog1);

        //create new blog
        await request(app)
            .post('/blogs')
            .auth('admin', 'qwerty', {type: "basic"})
            .send(blog2);
    });


    it('should return code 200 and array with 2 elements', async () => {
        const blogs = await request(app)
            .get('/blogs')
            .auth('admin', 'qwerty', {type: "basic"})
            .expect(200);

        expect(blogs.body[0]).toEqual(
            {
                id: expect.any(String),
                name: 'blog1',
                youtubeUrl: 'https://youtube1.com'
            });

        expect(blogs.body[1]).toEqual(
            {
                id: expect.any(String),
                name: 'blog2',
                youtubeUrl: 'https://youtube2.com'
            });
    });
});


describe('GET:/blogs/id getBlogById', () => {
    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
            .auth('admin', 'qwerty', {type: "basic"});
    });

    it('should return code 404 for incorrect ID', async () => {
        await request(app)
            .get('/blogs/qwerty')
            .expect(404);
    });

    it('should return code 200 and equal blog for correct request', async () => {
        const newBlog1 = await request(app)
            .post('/blogs')
            .auth('admin', 'qwerty', {type: "basic"})
            .send(blog1)
            .expect(201);
        const id = newBlog1.body.id;

        const blog = await request(app)
            .get(`/blogs/${id}`)
            .expect(200);

        expect(blog.body).toEqual({
            id: expect.any(String),
            name: 'blog1',
            youtubeUrl: 'https://youtube1.com'
        });
    });
});

describe('DELETE:/blogs/id delete', () => {

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
            .auth('admin', 'qwerty', {type: "basic"});
    });

    it('should return code 401 "Unauthorized" for unauthorized request', async () => {
        await request(app)
            .delete('/blogs/1')
            .expect(401);
    });

    it('should return code 404 for incorrect ID', async () => {
        await request(app)
            .delete('/blogs/qwerty')
            .auth('admin', 'qwerty', {type: "basic"})
            .expect(404);
    });

    it('should return code 204 for correct request, and should return 404 for GET by id', async () => {
        const newBlog1 = await request(app)
            .post('/blogs')
            .auth('admin', 'qwerty', {type: "basic"})
            .send(blog1)
            .expect(201);
        const id = newBlog1.body.id;

        await request(app)
            .delete(`/blogs/${id}`)
            .auth('admin', 'qwerty', {type: "basic"})
            .expect(204);

        await request(app)
            .get(`/blogs/${id}`)
            .expect(404);
    });
});