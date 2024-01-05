import express from "express";
import bcrypt from "bcrypt";
import { GetWeather } from "../data/weatherFunction.js";
import db from "../database/database.js";
import { getPosts } from "../data/dataFunctions.js";
import topics from "../data/topics.js";
import passport from "passport";

const postRouter = express.Router();
const saltRounds = 10;

//test post method
postRouter.post('/user', (req, res) => {
    const user = req.body;
    res.send(user);
});

//login test
postRouter.post('/login',
    passport.authenticate('local', { failureMessage: true }),
    function (req, res) {
        res.send("Success");
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
                        res.send("Success");
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


export default postRouter;