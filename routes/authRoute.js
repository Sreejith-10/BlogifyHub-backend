const express = require("express");
const {
	registerUser,
	logInUser,
	getProfile,
	logOutUser,
} = require("../controllers/authController");

const router = express.Router();
//routes
router.post("/register", registerUser);
router.post("/login", logInUser);
router.get("/profile", getProfile);
router.get("/logout", logOutUser);

module.exports = router;
