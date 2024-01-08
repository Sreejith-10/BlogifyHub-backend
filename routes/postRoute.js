const express = require("express");
const {addPost} = require("../controllers/postController");
const upload = require("../controllers/middleware/multer");

const router = express.Router();

router.post("/add-post", upload.single("postImage"), addPost);

module.exports = router;
