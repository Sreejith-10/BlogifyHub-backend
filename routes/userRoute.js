const express = require("express");
const {
	addUser,
	getSingleUser,
	followUser,
	unFollowUser,
	updateUserAccount,
	getAllFollowers,
} = require("../controllers/userController");
const parseForm = require("../middlewares/formParser");

const router = express.Router();

router.get("/get-user/:id", getSingleUser);
router.get("/get-followers/:id", getAllFollowers);
router.post("/add", parseForm, addUser);
router.post("/follow-user", followUser);
router.post("/unfollow-user", unFollowUser);
router.patch("/update-user", parseForm, updateUserAccount);

module.exports = router;
