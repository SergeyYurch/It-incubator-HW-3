import {MongoClient} from 'mongodb';

const mongoUri = process.env.mongoURI || 'mongodb+srv://itkamadmin:1itkam26@cluster0.cq8g0m6.mongodb.net/?retryWrites=true&w=majority';

export const client = new MongoClient(mongoUri)

export async function runDB() {
    try{
        await client.connect();
        await client.db('guild').command({ping: 1})
        console.log("Mongo server connected successfully");
    } catch {
        console.log("Can't connect to DB");
        await client.close()
    }
}