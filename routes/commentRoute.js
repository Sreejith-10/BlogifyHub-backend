const express = require("express");
const {
	addComment,
	getAllComment,
	replyToComment,
} = require("../controllers/commentController");

const router = express.Router();

router.get("/get-all-comment/:id", getAllComment);
router.post("/add-comment", addComment);
router.post("/post-reply", replyToComment);

module.exports = router;
