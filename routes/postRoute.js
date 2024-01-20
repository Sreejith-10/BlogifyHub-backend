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
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/get-post", getPost);
router.get("/get-post-byId/:id", getPostById);
router.get("/get-post-count/:id", getPostCount);
router.get("/get-like-count/:id", getLikeCount);
router.post("/add-view", addViewer);
router.post("/add-post", upload.single("postImage"), addPost);
router.post("/get-user-post", getUserPost);
router.post("/like-post", updateLikecount);
router.post("/dislike-post", reduceLikeCount);
router.patch("/update-post", upload.single("postImage"), updatePost);
router.delete("/delete-post/:id", deletePost);

module.exports = router;
