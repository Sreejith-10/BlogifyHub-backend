const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
	notificationType: String,
	date: {
		type: Date,
		default: Date.now(),
	},
	message: String,
	senderId: String,
});

const notificationSchema = new mongoose.Schema(
	{
		authorId: String,
		notifications: [subSchema],
	},
	{versionKey: false}
);

const NotificationModel = mongoose.model("notification", notificationSchema);

module.exports = NotificationModel;
