const {default: mongoose} = require("mongoose");
const alertUserLike = require("..");
const CommentModel = require("../models/commentModel");
const PostModel = require("../models/postModel");
const TagModel = require("../models/tagModel");
const UserModel = require("../models/userModel");
const {setNotifications} = require("./notificationController");

const addPost = async (req, res) => {
	try {
		const f = req.file.filename;
		const {postTitle, postDescription, tag, userId} = req.body;
		const postResult = await PostModel.create({
			postTitle,
			postDescription,
			postTags: tag,
			postImage: f,
			userId,
		});
		await TagModel.insertMany({tagArray: tag});
		postResult
			? res.json("Succerfully posted")
			: res.json({error: "Something went wrong"});
	} catch (err) {
		console.log(err);
	}
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
	try {
		const id = req.body.id;
		const userPost = await PostModel.find({userId: id});
		if (!userPost) return res.json("No post found");
		return res.json(userPost);
	} catch (err) {
		console.log(err);
	}
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
	try {
		const fileUpload = req.file;
		const result = await PostModel.findByIdAndUpdate(req.body.postId, {
			postTitle: req.body.postTitle,
			postDescription: req.body.postDescription,
			postTags: req.body.tag,
			postImage: fileUpload && fileUpload.filename,
			userId: req.body.userId,
		});
		if (result) return res.json("Updated");
	} catch (err) {
		console.log(err);
	}
};

const updateLikecount = async (req, res) => {
	try {
		const {userId, postId} = req.body;
		const post = await PostModel.findById(postId);
		post.postLikes.push(userId);
		post.save();
		const author = await PostModel.findById(postId);
		const user = await UserModel.findOne({userId});
		if (post) {
			setNotifications({postId, userId, method: "like"});
			return res.json(post);
		}
		return res.json({error: "Something went wrong"});
	} catch (err) {
		console.log(err);
	}
};

const reduceLikeCount = async (req, res) => {
	try {
		const {userId, postId} = req.body;
		const post = await PostModel.findById(postId);
		const like = post.postLikes;
		post.postLikes = like.filter((item) => item != userId);
		post.save();
		if (!post) return res.json({error: "Something went wrong"});
		return res.json(post);
	} catch (err) {
		console.log(err);
	}
};

const getPostCount = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await PostModel.find({userId: id});
		const count = result.length;
		return res.json(count);
	} catch (err) {
		console.log(err);
	}
};

const getLikeCount = async (req, res) => {
	try {
		const id = req.params.id;
		const result = await PostModel.find({userId: id});
		let likes = 0;
		for (postLikes in result) {
			likes = postLikes.length + likes;
		}
		res.json(likes);
	} catch (err) {
		console.log(err);
	}
};

const addViewer = async (req, res) => {
	try {
		const {currentUser, postId} = req.body;
		const post = await PostModel.findById(postId);
		const found = post.postViews.includes(currentUser);
		if (!found) {
			post.postViews.push(currentUser);
			post.save();
			return res.json("success");
		}
	} catch (err) {
		console.log(err);
	}
};

const getPostById = async (req, res) => {
	try {
		const {postId, postTitle} = req.body;
		const post = await PostModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(postId),
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "postLikes",
					foreignField: "userId",
					as: "likedUsers",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "postViews",
					foreignField: "userId",
					as: "postViewers",
				},
			},
			{
				$addFields: {
					_u: {$toString: "$_id"},
				},
			},
			{
				$lookup: {
					from: "comments",
					localField: "_u",
					foreignField: "postId",
					as: "userComment",
				},
			},
		]);
		if (!post) return res.json({error: "No post found with this id"});
		res.json(post);
	} catch (err) {
		console.log(err);
	}
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
	addViewer,
	getPostById,
};
