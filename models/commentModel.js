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
				time: {
					type: Date,
					default: Date.now(),
				},
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
						time: {
							type: Date,
							default: Date.now(),
						},
					},
				],
			},
		],
	},
	{versionKey: false}
);

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = CommentModel;
