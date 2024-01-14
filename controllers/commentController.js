const {findOneAndUpdate} = require("../models/authModel");
const CommentModel = require("../models/commentModel");

const getAllComment = async (req, res) => {
	const postId = req.params.id;
	const response = await CommentModel.find({postId: postId});
	if (!response) return res.json({error: "No comments found"});
	return res.json(response);
};

const addComment = async (req, res) => {
	try {
		const {userId, postId, message} = req.body;
		const result = await CommentModel.create({
			senderId: userId,
			postId: postId,
			senderMessage: message,
			time: new Date().toLocaleString(),
		});
		if (!result) return res.json({error: "Error try again"});
		return res.json(result);
	} catch (err) {
		console.log(err);
	}
};

const replyToComment = async (req, res) => {
	const {reply, commentId, currentUser} = req.body;
	const result = await CommentModel.findByIdAndUpdate(commentId, {
		$push: {
			replies: {
				replierId: currentUser,
				replierMessage: reply,
				time: new Date().toLocaleString(),
			},
		},
	});
	return res.json(result);
};

module.exports = {
	addComment,
	getAllComment,
	replyToComment,
};
