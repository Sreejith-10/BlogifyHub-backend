const NotificationModel = require("../models/notificationModel");
const PostModel = require("../models/postModel");
const UserModel = require("../models/userModel");

const setNotifications = async (req, res) => {
	try {
		const {postId, userId, method} = req;
		const authorId =
			method === "reply"
				? postId
				: await PostModel.findOne({_id: postId});
		const user = await UserModel.findOne({userId});

		let Notification = "";

		if (method === "like") {
			Notification = `${user?.fname} ${user?.lname} liked your post`;
		} else if (method === "comment") {
			Notification = `${user?.fname} ${user?.lname} commented on your post`;
		} else if (method === "reply") {
			Notification = `${user?.fname} ${user?.lname} replied to your comment`;
		} else if (method === "follow") {
			Notification = `${user?.fname} ${user?.lname} started following you`;
		}
		const result = await NotificationModel.findOne({authorId: authorId.userId});
		if (!result) {
			await NotificationModel.create({
				authorId: method === "reply" ? authorId : authorId.userId,
				notifications: {
					date: new Date().toISOString(),
					notificationType: method,
					senderId: user.userId,
					message: Notification,
				},
			});
		} else {
			// console.log("test");
			await NotificationModel.findOneAndUpdate(
				{authorId},
				{
					$set: {
						notifications: {
							notificationType: method,
							senderId: user.userId,
							message: Notification,
							date: new Date().toISOString(),
						},
					},
				}
			);
			// result.notifications.set({
			// 	notificationType: method,
			// 	senderId: user.userId,
			// 	message: Notification,
			// 	date: new Date().toISOString(),
			// });
			// await result.save();
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
