import path from 'path';
import {Database, open as sqliteOpen} from 'sqlite';
import sqlite3 from 'sqlite3';

import {Datastore} from "../index";
import {Comment, Like, Post, User} from "../../../shared/src/types";
import {raw} from "express";

export class SqlDataStore implements Datastore {
    private db!: Database<sqlite3.Database, sqlite3.Statement>;

    public async openDb() {
        // open the database
        this.db = await sqliteOpen({
            filename: path.join(__dirname, 'codersquare.sqlite'),
            driver: sqlite3.Database,
        });

        // for use foreign key
        this.db.run('PRAGMA foreign_keys = ON;');

        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migrations'),
        });

        return this;
    }

    createComment(comment: Comment): Promise<void> {
        return Promise.resolve(undefined);
    }

    createLike(like: Like): Promise<void> {
        return Promise.resolve(undefined);
    }

    async createPost(post: Post): Promise<void> {
        await this.db.run('INSERT INTO posts (id, title, url, postedAt, userId) VALUES (?, ?, ?, ?, ?)',
            post.id,
            post.title,
            post.url,
            post.postedAt,
            post.userId
        );
        // return Promise.resolve(undefined);
    }

    async createUser(user: User): Promise<void> {
        await this.db.run('INSERT INTO users (id, email, password, firstName, lastName, userName) VALUES (?, ?, ?, ?, ?, ?)',
            user.id,
            user.email,
            user.password,
            user.firstName,
            user.lastName,
            user.username
        );
    }

    deleteComment(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    deletePost(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    getPost(id: string): Promise<Post | undefined> {
        return Promise.resolve(undefined);
    }

    getUserById(id: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT * FROM users where id = ?`, id);
    }

    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT *
                                  FROM users
                                  WHERE email = ?`, email)
    }

    getUserByUsername(username: string): Promise<User | undefined> {
        return this.db.get<User>(`SELECT *
                                  FROM users
                                  WHERE username = ?`, username)
    }

    listComments(postId: string): Promise<Comment[]> {
        return Promise.resolve([]);
    }

    listPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('SELECT * FROM posts');
    }


}