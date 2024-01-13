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
		postDate: new Date().toLocaleString(),
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

const getUserPost = async (req, res) => {
	const id = req.body.id;
	const userPost = await PostModel.find({userId: id});
	if (!userPost) return res.json("No post found");
	return res.json(userPost);
};

const deletePost = async (req, res) => {
	try {
		const id = req.params.id;
		const data = await PostModel.findOneAndDelete({_id: id});
		if (data) return res.json(data);
	} catch (error) {
		console.log(error);
	}
};

const updatePost = async (req, res) => {
	const fileUpload = req.file;
	const result = await PostModel.findByIdAndUpdate(req.body.postId, {
		postTitle: req.body.postTitle,
		postDescription: req.body.postDescription,
		postTags: req.body.tag,
		postImage: req.body.postImage ? req.body.postImage : fileUpload.filename,
		userId: req.body.userId,
		postDate: new Date().toLocaleString(),
	});
	if (result) return res.json("Updated");
};

const updateLikecount = async (req, res) => {
	const {userId, postId} = req.body;
	const post = await PostModel.findOneAndUpdate(
		{_id: postId},
		{postLikes: userId}
	);
	if (post) return res.json(post);
	return res.json({error: "Something went wrong"});
};

const reduceLikeCount = async (req, res) => {
	const {userId, postId} = req.body;
	const post = await PostModel.findByIdAndUpdate(postId, {
		$pull: {postLikes: userId},
	});
	// post.postLikes.filter((item) => item != userId);
	// console.log(post);
	// post.save();
	if (!post) return res.json({error: "Something went wrong"});
	return res.json(post);
};

const getPostCount = async (req, res) => {
	const id = req.params.id;
	const result = await PostModel.find({userId: id});
	const count = result.length;
	return res.json(count);
};

const getLikeCount = async (req, res) => {
	const id = req.params.id;
	const result = await PostModel.find({userId: id});
	let likes = 0;
	for (postLikes in result) {
		likes = postLikes.length + likes;
	}
	res.json(likes);
};

module.exports = {
	addPost,
	getPost,
	getUserPost,
	deletePost,
	updatePost,
	updateLikecount,
	reduceLikeCount,
	getPostCount,
	getLikeCount,
};
