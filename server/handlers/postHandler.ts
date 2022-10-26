import {db} from "../datastore";
import {ExpressHandler, Post} from "../../shared/src/types";
import crypto from 'crypto';
import {CreatePostRequest, CreatePostResponse, ListPostsRequest, ListPostsResponse} from "../../shared/src/api";



export const listPostsHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = async (req, res) => {
    // throw new Error('oops!');
    console.log(req.headers.authorization);
    return res.send({posts: await db.listPosts()});
}


// export const listPostsHandler: RequestHandler = (request, response) => {
//     response.send({posts: db.listPosts()});
// }


export const createPostHandler: ExpressHandler<
    CreatePostRequest,
    CreatePostResponse> = async (req, res) => {
    if(!req.body.title || !req.body.url){
        return res.sendStatus(400);
    };

    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: res.locals.userId,
        // userId: req.body.userId,
    };

    await db.createPost(post);
    return res.sendStatus(200);
}