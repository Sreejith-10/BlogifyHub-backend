const express = require("express");
const {
	addPost,
	getPost,
	getUserPost,
	deletePost,
	updatePost,
	updateLikecount,
	reduceLikeCount,
} = require("../controllers/postController");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/add-post", upload.single("postImage"), addPost);
router.get("/get-post", getPost);
router.post("/get-user-post", getUserPost);
router.delete("/delete-post/:id", deletePost);
router.patch("/update-post", upload.single("postImage"), updatePost);
router.post("/like-post", updateLikecount);
router.post("/dislike-post", reduceLikeCount);

module.exports = router;
