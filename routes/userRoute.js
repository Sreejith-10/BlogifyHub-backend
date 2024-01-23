const express = require("express");
const {
	addUser,
	getSingleUser,
	followUser,
	unFollowUser,
	updateUserAccount,
	getAllFollowers,
} = require("../controllers/userController");
const upload = require("../middleware/multer");

const router = express.Router();

router.get("/get-user/:id", getSingleUser);
router.get("/get-followers/:id", getAllFollowers);
router.post("/add", upload.single("img"), addUser);
router.post("/follow-user", followUser);
router.post("/unfollow-user", unFollowUser);
router.patch("/update-user", upload.single("profileImage"), updateUserAccount);

module.exports = router;
