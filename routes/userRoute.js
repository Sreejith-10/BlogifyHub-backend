const express = require("express");
const {addUser} = require("../controllers/userController");
const upload = require("../controllers/middleware/multer");

const router = express.Router();

router.post("/add", upload.single("img") ,addUser);

module.exports = router;
