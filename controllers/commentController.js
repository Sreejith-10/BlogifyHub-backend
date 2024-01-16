const {findOneAndUpdate} = require("../models/authModel");
const CommentModel = require("../models/commentModel");

const getAllComment = async (req, res) => {
	const postId = req.params.id;
	const response = await CommentModel.findOne({postId: postId});
	if (!response) return res.json({error: "No comments found"});
	return res.json(response);
};

const addComment = async (req, res) => {
	try {
		const {userId, postId, message} = req.body;
		// const result = await CommentModel.create({
		// 	senderId: userId,
		// 	postId: postId,
		// 	senderMessage: message,
		// 	time: new Date().toLocaleString(),
		// });
		// if (!result) return res.json({error: "Error try again"});
		// return res.json(result);
		const result = await CommentModel.findOne({postId});
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

const editComment = async (req, res) => {};

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

const editReply = async (req, res) => {};

module.exports = {
	addComment,
	getAllComment,
	deleteComment,
	replyToComment,
	deleteReply,
	editComment,
	editReply,
};
