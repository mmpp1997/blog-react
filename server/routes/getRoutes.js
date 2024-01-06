import express from "express";
import db from "../database/database.js";
import { GetWeather } from "../data/weatherFunction.js";
import { getPosts, GetPostData } from "../data/dataFunctions.js";
import topics from "../data/topics.js";
import passport from "passport";

const getRouter = express.Router();

//Get login page


getRouter.get("/weather", async (req, res) => {
  res.send(await GetWeather("London"));
});


export default getRouter;