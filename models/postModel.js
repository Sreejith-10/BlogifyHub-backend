const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	postImage: {
		type: String,
	},
	postTitle: {
		type: String,
		required: true,
	},
	postTags: {
		type: String,
		required: true,
	},
	postDescription: {
		type: String,
		required: true,
	},
});

const PostModel = mongoose.model("post", postSchema);
