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

postRouter.post('/login', passport.authenticate('local', { failureRedirect: "/login", failureMessage: true }), (req, res) => {
    // If authentication is successful, generate and send a JWT token
    const token = generateToken(req.user);
    res.json({ message: "Success", token: token });
});

postRouter.get('/login', (req, res) => {

    const sessions = req.sessionStore.sessions;
    const sessionKeys = Object.keys(sessions);

    if (sessionKeys.length > 0) {

        const lastSessionKey = sessionKeys[sessionKeys.length - 1];
        const lastSessionData = JSON.parse(sessions[lastSessionKey]);
        const lastMessages = lastSessionData.messages;
        res.json({ message: lastMessages[0]});

    } else {
        console.log("");
    }
});

//Create new user in database
postRouter.post("/register", async (req, res) => {
        bcrypt.genSalt(saltRounds, async function (err, salt) {
            if(err){console.log(err)}
            bcrypt.hash(req.body.password, salt, async function (err, hash) {
                if(err){console.log(err)}
                try {
                    await db.query("INSERT INTO users(username, password, nickname, location) VALUES ($1,$2,$3,$4);",
                    [req.body.username, hash, req.body.nickname, req.body.location]);

                    passport.authenticate("local")(req, res, function () {
                        const token = generateToken(req.user);
                        res.json({ message: "Success", token: token });
                    });
                    
                } catch (dberror) {
                    res.json({ message: "Email ili Nickname več postoji"});
                }
            });
        });
});

//get filtered posts
postRouter.post("/posts", authenticateToken, async (req, res) => {
    const userId = Number(req.user.id);
    const topic = req.body.topic;
    var data;
    try {
        if (topic == "All Posts") {
            data = await getPosts();
        }
        else if (topic == "My Posts") {
            const result = await db.query("SELECT posts.*,users.nickname FROM users INNER JOIN posts ON users.id=posts.userId WHERE userid=$1 ORDER BY id DESC;", [userId]);
            data = result;
        }
        else if (topic == "Other Posts") {
            const result = await db.query("SELECT posts.*,users.nickname FROM users INNER JOIN posts ON users.id=posts.userId WHERE userid!=$1 ORDER BY id DESC;", [userId]);
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

//add new post to database
postRouter.post("/add", authenticateToken, async (req, res) => {
    try {
        if (req.user.id == req.body.userid) {
            await db.query("INSERT INTO posts(title, topic, color, userId, text) VALUES ($1,$2,$3,$4,$5);",
                [req.body.title, req.body.topic, req.body.color, req.body.userid, req.body.text]);
        }
    } catch (error) {
        console.log(error);
    }
    res.send("success");
});

//edit post data
postRouter.post("/edit", authenticateToken, async (req, res) => {
    const id = req.body.id;
    try {
        if (req.user.id == req.body.userid) {
            await db.query("UPDATE posts SET title = ($1), text = ($2), topic = ($3), color = ($4) WHERE id = ($5)",
                [req.body.title, req.body.text, req.body.topic, req.body.color, id]);
        }
    } catch (error) {
        console.log(error);
    }
    res.send("success");
});

//delete post from database
postRouter.post("/delete", authenticateToken, async (req, res) => {
    try {
        if (req.user.id == req.body.userid) {
            await db.query("DELETE FROM posts WHERE id=$1;", [req.body.id]);
        }
    } catch (error) {
        console.log(error);
    }
    res.send("Success");
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