const {getAllTags, getTrendingTags} = require("../controllers/tagController");
const express = require("express");

const route = express.Router();

route.get("/get-tags", getAllTags);
route.get("/get-trending-tags", getTrendingTags);

module.exports = route;
