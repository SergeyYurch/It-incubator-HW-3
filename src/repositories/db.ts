import {MongoClient} from 'mongodb';
import {BlogEntity} from "../services/entities/blog.entity";
import {PostEntity} from "../services/entities/post.entity";

const mongoUri = process.env.mongoURI || 'mongodb+srv://itkamadmin:1itkam26@cluster0.cq8g0m6.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(mongoUri)
const db = client.db('guildDB');
export const blogsCollection = db.collection<BlogEntity>('blogs')
export const postsCollection = db.collection<PostEntity>('posts')

export async function runDB() {
    try{
        await client.connect();
        await client.db('guildDB').command({ping: 1})
        console.log("Mongo server connected successfully");
    } catch {
        console.log("Can't connect to DB");
        await client.close()
    }
}