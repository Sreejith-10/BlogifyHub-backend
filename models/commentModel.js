const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		author: {
			type: Boolean,
			default: false,
		},
		postId: {
			type: String,
		},
		comment: [
			{
				senderId: {
					type: String,
				},
				senderMessage: String,
				time: String,
				replies: [
					{
						author: {
							type: Boolean,
							default: false,
						},
						replierId: {
							type: String,
						},
						replierMessage: String,
						time: String,
					},
				],
			},
		],
	},
	{versionKey: false}
);

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = CommentModel;
