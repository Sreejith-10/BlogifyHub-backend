const express = require("express");
const {
	addPost,
	getPost,
	getUserPost,
	deletePost,
	updatePost,
	updateLikecount,
	reduceLikeCount,
	getPostCount,
	getLikeCount,
	addViewer,
	getPostById,
} = require("../controllers/postController");
const parseForm = require("../middlewares/formParser");

const router = express.Router();

router.get("/get-post", getPost);
router.get("/get-post-count/:id", getPostCount);
router.get("/get-like-count/:id", getLikeCount);
router.post("/add-view", addViewer);
router.post("/add-post", parseForm, addPost);
router.post("/get-user-post", getUserPost);
router.post("/like-post", updateLikecount);
router.post("/dislike-post", reduceLikeCount);
router.post("/get-post-byId", getPostById);
router.patch("/update-post", parseForm, updatePost);
router.delete("/delete-post/:id", deletePost);

module.exports = router;
