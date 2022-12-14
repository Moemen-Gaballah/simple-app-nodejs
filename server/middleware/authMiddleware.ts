import { ExpressHandler } from "../../shared/src/types";
import { db } from '../datastore';
import {verifyJwt} from "../auth";

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const payload = verifyJwt(token);
        const user = await db.getUserById(payload.userId);
        if (!user) {
            throw 'not found';
        }

        res.locals.userId = user.id;

        next();
    } catch {
        return res.status(401).send({error: 'Bad token'});
    }

};