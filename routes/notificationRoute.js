const express = require("express");
const {
	setNotifications,
	getNotificatons,
} = require("../controllers/notificationController");

const router = express.Router();

router.post("/set-notification", setNotifications);
router.get("/get-notification/:id", getNotificatons);

module.exports = router;
