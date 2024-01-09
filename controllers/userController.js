const AuthModel = require("../models/authModel");
const UserModel = require("../models/userModel");

const addUser = async (req, res) => {
	const filename = req.file.filename;
	const {fname, lname, profession, age, userId} = req.body;
	try {
		const result = await UserModel.create({
			profileImg: filename,
			fname,
			lname,
			profession,
			age,
			userId,
		});
		const update = await AuthModel.findById({_id: userId});
		update.verified = true;
		update.save();
		if (result) return res.json("Success");
	} catch (err) {
		console.log(err);
	}
};

const getSingleUser = async (req, res) => {
	const id = req.params.id;
	console.log(id);

	res.json("succes");
};

module.exports = {
	addUser,
	getSingleUser,
};
