import express from "express";
import passport from "passport";
import { generateToken } from "../index.js";

const getRouter = express.Router();

//Google login
getRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

//Google redirect
getRouter.get('/auth/google/blog', passport.authenticate('google'), (req, res) => {
    // If authentication is successful, generate and send a JWT token
    const token = generateToken(req.user);
    res.cookie("token", token);
    res.redirect("http://localhost:3000/blog");
});

export default getRouter;