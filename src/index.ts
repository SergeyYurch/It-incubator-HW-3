import express from 'express'
import * as dotenv from 'dotenv'
import {testingRouter} from "./controllers/testing.controller";
import {blogsRouter} from "./controllers/blogs.controller";
import {postsRouter} from "./controllers/posts.controller";
dotenv.config()

const app = express();
const port = process.env.PORT || 5001

app.use(express.json())

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing', testingRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})