import express, {RequestHandler} from 'express';
import {createPostHandler, listPostsHandler} from "./handlers/postHandler";

const  app = express();

app.use(express.json());

const requestloggerMiddleware: RequestHandler = (req, res, next) => {

    console.log(req.method , req.path, '- body: ',req.body);
    next();
}

app.use(requestloggerMiddleware);

app.get('/posts', listPostsHandler);

app.post('/posts', createPostHandler);

app.listen(3000);