const CommentModel = require("../models/commentModel");
const {setNotifications} = require("./notificationController");

const getAllComment = async (req, res) => {
	const postId = req.params.id;
	const response = await CommentModel.findOne({postId: postId});
	if (!response) return res.json({error: "No comments found"});
	return res.json(response);
};

const addComment = async (req, res) => {
	try {
		const {userId, postId, message} = req.body;
		const result = await CommentModel.findOne({postId});
		setNotifications({postId, senderId: userId, notificationType: "comment"});
		if (!result) {
			const createDb = await CommentModel.create({
				postId,
				comment: {
					senderId: userId,
					senderMessage: message,
					time: new Date(),
				},
			});
			if (!createDb) return res.json({error: "Error try again"});
			return res.json(createDb);
		} else {
			result.comment.push({
				senderId: userId,
				senderMessage: message,
				time: new Date(),
			});
			result.save();
			if (!result) return res.json({error: "Error try again"});
			return res.json(result);
		}
	} catch (err) {
		console.log(err);
	}
};

const deleteComment = async (req, res) => {
	try {
		const {postId, commenterId} = req.body;
		const comment = await CommentModel.findOne({postId});
		comment.comment.pull({_id: commenterId});
		comment.save();
		return res.json(comment);
	} catch (err) {
		console.log(err);
	}
};

const editComment = async (req, res) => {
	const {postId, commentId, editText} = req.body;
	const resp = await CommentModel.findOneAndUpdate(
		{
			postId,
			"comment._id": commentId,
		},
		{
			$set: {"comment.$.senderMessage": editText},
		}
	);
	const result = await CommentModel.findOne({postId});
	res.json(result);
};

const replyToComment = async (req, res) => {
	const {reply, commentId, postId, currentUser} = req.body;
	const comment = await CommentModel.findOneAndUpdate(
		{
			postId,
			"comment._id": commentId,
		},
		{
			$push: {
				"comment.$.replies": {
					replierId: currentUser,
					replierMessage: reply,
					time: new Date(),
				},
			},
		},
		{
			new: true,
		}
	);
	setNotifications({
		commentId,
		senderId: currentUser,
		notificationType: "reply",
	});
	return res.json(comment);
};

const deleteReply = async (req, res) => {
	try {
		const {postId, commenterId, replierId, id} = req.body;
		const result = await CommentModel.findOneAndUpdate(
			{
				postId,
				"comment._id": id,
			},
			{
				$pull: {"comment.$.replies": {_id: commenterId}},
			},
			{
				new: true,
			}
		);
		return res.json(result);
	} catch (err) {
		console.log(err);
	}
};

const editReply = async (req, res) => {
	console.log(req.body);
	try {
		const {postId, replyId, editText, postRef} = req.body;
		const result = await CommentModel.findOneAndUpdate(
			{postId: postId, "comment._id": postRef, "comment.replies._id": replyId},
			{
				$set: {
					"comment.$.replies.$[elem].replierMessage": editText,
				},
			},
			{
				arrayFilters: [
					{
						"elem._id": replyId,
					},
				],
			}
		);
		const comment = await CommentModel.findOne({postId});
		res.json(comment);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	addComment,
	getAllComment,
	deleteComment,
	replyToComment,
	deleteReply,
	editComment,
	editReply,
};
