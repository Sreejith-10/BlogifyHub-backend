const express = require("express");
const {addComment, getAllComment} = require("../controllers/commentController");

const router = express.Router();

router.get("/get-all-comment/:id", getAllComment);
router.post("/add-comment", addComment);

module.exports = router;
