const AuthModel = require("../models/authModel");
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
		console.log(id);
		const user = await UserModel.findOne({userId: id});
		console.log(user);
		if (user) return res.json(user);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	addUser,
	getSingleUser,
};
