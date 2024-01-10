const AuthModel = require("../models/authModel");
const {hashPassword, comparePassword} = require("../helper/hashHelper");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

//register user
const registerUser = async (req, res) => {
	try {
		const {name, email, password} = req.body;
		//checking if name is empty
		if (!name)
			return res.json({
				error: "Name is required",
			});
		//checking if password is empty or length is less than 1
		if (!password || password.length < 0)
			return res.json({
				error: "password is required and should be 6 charcters long",
			});
		//checking if already user exist with this email
		const emailExist = await AuthModel.findOne({email});
		if (emailExist)
			return res.json({
				error: "Email is taken",
			});
		//hashing password
		const hashedPass = await hashPassword(password);
		const user = await AuthModel.create({name, email, password: hashedPass});
		return res.json(user);
	} catch (err) {
		console.log(err);
	}
};

//login for user
const logInUser = async (req, res) => {
	try {
		const {email, password} = req.body;
		//checking if email is empty
		if (!email) return res.json({error: "Email is requried"});
		const user = await AuthModel.findOne({email});
		//checking if user exist with this email
		if (!user) return res.json({error: "No user found with this email"});
		//matching provided password with hash password
		const match = await comparePassword(password, user.password);
		if (!match) return res.json({error: "Password do not match"});
		const userAccoutOk = await UserModel.findOne({userId: user._id});
		if (match) {
			//setting jwt
			jwt.sign(
				{email: user.email, id: user._id, name: user.name},
				process.env.JWT_SECRET,
				{},
				(err, token) => {
					if (err) throw err;
					res.cookie("token", token).json({user, ok: userAccoutOk});
				}
			);
		}
	} catch (err) {
		console.log(err);
	}
};

//fetching user data
const getProfile = (req, res) => {
	const {token} = req.cookies;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
			if (err) throw err;
			const profile = await UserModel.findOne({userId: user.id});
			return res.json({user, profile});
		});
	} else return res.json(null);
};

//user logout
const logOutUser = (req, res) => {
	res.cookie("token", "").json("Log out");
};

module.exports = {
	registerUser,
	logInUser,
	getProfile,
	logOutUser,
};
