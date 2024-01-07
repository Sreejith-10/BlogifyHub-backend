const UserModel = require("../models/userModel");
const {hashPassword, comparePassword} = require("../helper/hashHelper");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
	try {
		const {name, email, password} = req.body;
		if (!name)
			return res.json({
				error: "Name is required",
			});
		if (!password || password.length < 0)
			return res.json({
				error: "password is required and should be 6 charcters long",
			});
		const emailExist = await UserModel.findOne({email});
		if (emailExist)
			return res.json({
				error: "Email is taken",
			});
		const hashedPass = await hashPassword(password);
		const user = UserModel.create({name, email, password: hashedPass});
		return res.json(user);
	} catch (err) {
		console.log(err);
	}
};

const logInUser = async (req, res) => {
	try {
		const {email, password} = req.body;
		if (!email) return res.json({error: "Email is requried"});
		const user = await UserModel.findOne({email});
		if (!user) return res.json({error: "No user found with this email"});
		const match = await comparePassword(password, user.password);
		if (!match) return res.json({error: "Password do not match"});
		if (match) {
			jwt.sign(
				{email: user.email, id: user._id, name: user.name},
				process.env.JWT_SECRET,
				{},
				(err, token) => {
					if (err) throw err;
					res.cookie("token", token).json(user);
				}
			);
		}
	} catch (err) {
		console.log(err);
	}
};

const getProfile = (req, res) => {
	const {token} = req.cookies;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
			if (err) throw err;
			res.json(user);
		});
	} else return res.json(null);
};

const logOutUser = (req, res) => {
	res.cookie("token","").json("Log out");
};

module.exports = {
	registerUser,
	logInUser,
	getProfile,
	logOutUser,
};
