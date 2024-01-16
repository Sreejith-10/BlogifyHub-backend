const express = require("express");
const {
	addComment,
	getAllComment,
	replyToComment,
	deleteComment,
	deleteReply,
} = require("../controllers/commentController");

const router = express.Router();

router.get("/get-all-comment/:id", getAllComment);
router.post("/add-comment", addComment);
router.post("/post-reply", replyToComment);
router.post("/delete-comment", deleteComment);
router.post("/delete-reply", deleteReply);

module.exports = router;
