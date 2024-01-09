import express from "express";
import db from "../database/database.js";
import { GetWeather } from "../data/weatherFunction.js";
import { getPosts, GetPostData } from "../data/dataFunctions.js";
import topics from "../data/topics.js";
import passport from "passport";

const getRouter = express.Router();

//Get weather info


//logout
getRouter.get('/logout', function (req, res, next) {
  if (req.isAuthenticated()) {
    req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});


export default getRouter;