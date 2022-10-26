import express, {ErrorRequestHandler, RequestHandler} from 'express';
import {createPostHandler, listPostsHandler} from "./handlers/postHandler";
import asyncHandler from "express-async-handler";
import {initDb} from "./datastore";
import {signUpHandler, signInHandler} from "./handlers/authHandler";
import {requestLoggerMiddleware} from "./middleware/loggermiddleware";
import { errHandler } from "./middleware/errorMiddleware";
import dotenv from 'dotenv';
import {authMiddleware} from "./middleware/authMiddleware";
import cors from "cors";
(async () => {
    await initDb();
    dotenv.config();

    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(requestLoggerMiddleware);

    // public endpoints
    app.get('/healthz', (_, res) => res.send({status: 'OK'}));
    app.post('/api/v1/signup', asyncHandler(signUpHandler));
    app.post('/api/v1/signin', asyncHandler(signInHandler));

    // app.use(authMiddleware);

    // protected endpoints
    app.get('/api/v1/posts', asyncHandler(listPostsHandler));
    app.post('/api/v1/posts', asyncHandler(createPostHandler));





    app.use(errHandler);

    app.listen(process.env.PORT || 3000);
    // const port = process.env.PORT;
    // const env = process.env.ENV;

    // app.listen(port, () => console.log(`Listening on port ${port} on ${env} environment`));


})();

