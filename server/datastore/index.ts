import {UserDao} from "./dao/UserDao";
import {PostDao} from "./dao/PostDao";
import {LikeDao} from "./dao/LikeDao";
import {CommentDao} from "./dao/CommentDao";
import {SqlDataStore} from "./sql";
// import {InMemoryDatastore} from "./memorydb";

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {}

export let db: Datastore;

export async function initDb() {
    // db = new InMemoryDatastore();
    db = await new SqlDataStore().openDb();
}
