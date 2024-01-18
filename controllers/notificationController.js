const NotificationModel = require("../models/notificationModel");
const PostModel = require("../models/postModel");
const UserModel = require("../models/userModel");

const setNotifications = async (req, res) => {
	try {
		const {postId, senderId, notificationType} = req;
		let message = "";

		const post = await PostModel.findById(postId);
		const authorId = post.userId;
		const sender = await UserModel.findOne({userId: senderId});

		//checking type of notifcation to sent
		if (notificationType === "like") {
			message = `${sender.fname}  ${sender.lname} liked your post`;
		} else if (notificationType === "comment") {
			message = `${sender.fname} ${sender.lname} commented on your post`;
		} else if (notificationType === "reply") {
			message = `${sender.fname} ${sender.lname} replied to your comment`;
		}

		//checking if user already in notifications collection
		const result = await NotificationModel.findOne({authorId: authorId});
		if (!result) {
			const newResult = await NotificationModel.create({
				authorId,
				notifications: {
					notificationType,
					senderId,
					message,
					date: new Date(),
				},
			});
		} else {
			result.notifications.push({
				notificationType,
				senderId,
				message,
				date: new Date(),
			});
			await result.save();
		}
	} catch (err) {
		console.log(err);
	}
};

const getNotificatons = async (req, res) => {
	const id = req.params.id;
	console.log(id);
	const notifi = await NotificationModel.findOne({authorId: id});
	console.log(notifi);
};

module.exports = {
	setNotifications,
	getNotificatons,
};
