const PostModel = require("../models/postModel");

const addPost = async (req, res) => {
	const f = req.file.filename;
	const {postTitle, postDescription, tag, userId} = req.body;
	const postResult = await PostModel.create({
		postTitle,
		postDescription,
		postTags: tag,
		postImage: f,
		userId,
	});
	postResult
		? res.json("Succerfully posted")
		: res.json({error: "Something went wrong"});
};

const getPost = async (req, res) => {
	try {
		const fetchData = await PostModel.find();
		if (!fetchData) return res.json({error: "No post found"});
		return res.json(fetchData);
	} catch (err) {
		res.json({error: "Something went wrong!"});
	}
};

module.exports = {
	addPost,
	getPost,
};
