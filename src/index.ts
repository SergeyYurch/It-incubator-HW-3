import express from 'express'
import * as dotenv from 'dotenv'
import {testingRouter} from "./controllers/testing.controller";
import {blogsRouter} from "./controllers/blogs.controller";
import {postsRouter} from "./controllers/posts.controller";
import {authGuardMiddleware} from "./middlewares/authGuard.middleware";
import cors from 'cors'
import {App} from "./app";
dotenv.config()

function bootstrap() {
    const app = new App();
    app.init().then();
}

bootstrap();