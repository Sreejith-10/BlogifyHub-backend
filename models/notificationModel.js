const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
	userId: String,
	type: String,
	date: String,
	message: String,
	senderId: String,
});

const NotificationModel = mongoose.model("notification", notificationSchema);

module.exports = NotificationModel;
