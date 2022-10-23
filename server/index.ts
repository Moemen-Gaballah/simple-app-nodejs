import express, {ErrorRequestHandler, RequestHandler} from 'express';
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

const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log('Uncaught exception:', err);
    res.status(500).send('Oops, an unexpected error occurred, please try again');
};

app.use(errHandler);

app.listen(3000);