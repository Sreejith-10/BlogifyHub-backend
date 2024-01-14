const {getAllTags} = require("../controllers/tagController");
const express = require("express");

const route = express.Router();

route.get("/get-tags", getAllTags);

module.exports = route;
