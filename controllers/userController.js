const UserModel = require("../models/userModel");

const addUser = async (req, res) => {
	const filename = req.file.filename;
	const {fname, lname, profession, age, userId} = req.body;
	try {
		const result = await UserModel.create({
			userId,
			profileImg: filename,
			fname,
			lname,
			profession,
			age,
		});
		if (result) return res.json("Success");
	} catch (err) {
		console.log(err);
	}
};

const getSingleUser = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await UserModel.findOne({userId: id});
		if (user) return res.json(user);
	} catch (err) {
		console.log(err);
	}
};

const followUser = async (req, res) => {
	const {authorId, userId} = req.body;
	const result = await UserModel.findOne({userId: authorId});
	result.followers.push(userId);
	result.save();
	res.json(result);
};

const unFollowUser = async (req, res) => {
	const {authorId, userId} = req.body;
	const result = await UserModel.findOneAndUpdate(
		{userId: authorId},
		{$pull: {followers: userId}}
	);
	result.save();
	res.json(result);
};

const updateUserAccount = async (req, res) => {
	const file = req.file;
	const {fname, lname, age, profession} = req.body;
	if (file) {
		await UserModel.findOneAndUpdate(
			{userId: req.body.userId},
			{profileImg: file.filename}
		);
	}
	const db = await UserModel.findOneAndUpdate(
		{userId: req.body.userId},
		{fname, lname, age, profession}
	);
	return res.json("Prfile updated");
};

module.exports = {
	addUser,
	getSingleUser,
	followUser,
	unFollowUser,
	updateUserAccount,
};
