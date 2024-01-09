const express = require("express");
const {addPost, getPost} = require("../controllers/postController");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/add-post", upload.single("postImage"), addPost);
router.get("/get-post", getPost);

module.exports = router;
