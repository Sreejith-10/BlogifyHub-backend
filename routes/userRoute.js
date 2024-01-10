const express = require("express");
const {addUser, getSingleUser} = require("../controllers/userController");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/add", upload.single("img"), addUser);
router.get("/get-user/:id", getSingleUser);

module.exports = router;
