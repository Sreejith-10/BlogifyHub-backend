const express = require("express");
const {setNotifications} = require("../controllers/notificationController");

const router = express.Router();

router.post("/set-notification", setNotifications);

module.exports = router;
