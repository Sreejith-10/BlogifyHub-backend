const express = require("express");
const {
	addUser,
	getSingleUser,
	followUser,
	unFollowUser,
	updateUserAccount,
} = require("../controllers/userController");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/add", upload.single("img"), addUser);
router.get("/get-user/:id", getSingleUser);
router.post("/follow-user", followUser);
router.post("/unfollow-user", unFollowUser);
router.patch("/update-user", upload.single("img"), updateUserAccount);

module.exports = router;
