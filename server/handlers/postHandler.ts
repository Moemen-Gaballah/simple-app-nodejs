import {db} from "../datastore";
import {ExpressHandler, Post} from "../types";
import crypto from 'crypto';
import {CreatePostRequest, CreatePostResponse, ListPostsRequest, ListPostsResponse} from "../api";



export const listPostsHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = (request, response) => {
    // throw new Error('oops!');
    response.send({posts: db.listPosts()});
}


// export const listPostsHandler: RequestHandler = (request, response) => {
//     response.send({posts: db.listPosts()});
// }


export const createPostHandler: ExpressHandler<
    CreatePostRequest,
    CreatePostResponse
    > = (req, res) => {
    if(!req.body.title || !req.body.userId || !req.body.url){
        return res.sendStatus(400);
    };

    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: req.body.userId,
    };

    db.createPost(post);
    res.sendStatus(200);
}