const NotificationModel = require("../models/notificationModel");
const PostModel = require("../models/postModel");
const UserModel = require("../models/userModel");

const setNotifications = async (req, res) => {
	try {
		const {postId, userId, method} = req;
		const authorId =
			method === "reply" ? postId : await PostModel.findOne({_id: postId});
		const user = await UserModel.findOne({userId});
		let Notification = "";
		if (method === "like") {
			Notification = `${user.fname} ${user.lname} liked your post`;
		} else if (method === "comment") {
			Notification = `${user?.fname} ${user?.lname} commented on your post`;
		} else if (method === "reply") {
			Notification = `${user?.fname} ${user?.lname} replied to your comment`;
		}
		const result = await NotificationModel.findOne({authorId});
		if (!result) {
			await NotificationModel.create({
				authorId: method === "reply" ? authorId : authorId.userId,
				notifications: {
					notificationType: method,
					senderId: user.userId,
					message: Notification,
				},
			});
		} else {
			result.notifications.push({
				notificationType: method,
				senderId: user.userId,
				message: Notification,
			});
			await result.save();
		}
	} catch (err) {
		console.log(err);
	}
};

const getNotificatons = async (req, res) => {
	try {
		const id = req.params.id;
		const notifi = await NotificationModel.findOne({authorId: id});
		if (!notifi) return res.json({error: "something went wrong"});
		return res.json(notifi);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	setNotifications,
	getNotificatons,
};

