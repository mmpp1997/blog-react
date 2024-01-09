import 'dotenv/config';
import express from "express";
import bcrypt from "bcrypt";
import db from "../database/database.js";
import { getPosts } from "../data/dataFunctions.js";
import passport from "passport";
import { generateToken } from "../index.js";
import jwt from "jsonwebtoken";
import { GetWeather } from '../data/weatherFunction.js';

const postRouter = express.Router();
const saltRounds = 10;

//test post method
postRouter.post('/user', (req, res) => {
    const user = req.body;
    res.send(user);
});


// JWT token verify
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        req.user = user;
        next();
    });
};



postRouter.post('/login', passport.authenticate('local'), (req, res) => {
    // If authentication is successful, generate and send a JWT token
    const token = generateToken(req.user);
    res.json({ message: "Success", token: token});
});


//Create new user in database
postRouter.post("/register", async (req, res) => {
    try {
        bcrypt.genSalt(saltRounds, async function (err, salt) {
            bcrypt.hash(req.body.password, salt, async function (err, hash) {
                await db.query("INSERT INTO users(username, password, nickname, location) VALUES ($1,$2,$3,$4);",
                    [req.body.username, hash, req.body.nickname, req.body.location]);
                if (err) {
                    res.send(err);
                } else {
                    passport.authenticate("local")(req, res, function () {
                        const token = generateToken(req.user);
                        res.json({ message: "Success", token: token });
                    });
                }
            });
        });

    } catch (error) {
        res.send(error)
    }
});

//add new post to database
postRouter.post("/add", async (req, res) => {
    try {
        await db.query("INSERT INTO posts(title, topic, color, userId, text) VALUES ($1,$2,$3,$4,$5);",
            [req.body.title, req.body.topic, req.body.color, req.body.userid, req.body.text]);

    } catch (error) {
        console.log(error);
    }
    res.send("success");
});

//delete post from database
postRouter.post("/delete", async (req, res) => {
    try {
        await db.query("DELETE FROM posts WHERE id=$1;", [req.body.id]);
    } catch (error) {
        console.log(error);
    }
    res.send("Success");
});

//get filtered posts
postRouter.post("/posts", authenticateToken, async (req, res) => {
    const topic = req.body.topic;
    var data;
    try {
        if (topic == "All Posts") {
            data = await getPosts();
        }
        else if (topic == "My Posts") {
            const result = await db.query("SELECT posts.*,users.nickname FROM users INNER JOIN posts ON users.id=posts.userId WHERE userid=$1 ORDER BY id DESC;", [1]);
            data = result;
        }
        else if (topic == "Other People") {
            const result = await db.query("SELECT posts.*,users.nickname FROM users INNER JOIN posts ON users.id=posts.userId WHERE userid!=$1 ORDER BY id DESC;", [1]);
            data = result;
        }
        else {
            const result = await db.query("SELECT posts.*,users.nickname FROM users INNER JOIN posts ON users.id=posts.userId WHERE topic=$1 ORDER BY id DESC;", [topic]);
            data = result;
        }
    } catch (error) {
        console.log(error);
    }
    res.json({ data: data, user: req.user });
});

//edit post data
postRouter.post("/edit", async (req, res) => {
    const id = req.body.id;
    try {
        await db.query("UPDATE posts SET title = ($1), text = ($2), topic = ($3), color = ($4) WHERE id = ($5)",
            [req.body.title, req.body.text, req.body.topic, req.body.color, id]);
    } catch (error) {
        console.log(error);
    }
    res.send("success");
});

//weather data
postRouter.post("/weather", authenticateToken, async (req, res) => {
    const location = req.body.location;
    res.send(await GetWeather(location));
});

//logout route
postRouter.post('/logout', authenticateToken, function (req, res) {
    res.json("Success");
});


export default postRouter;