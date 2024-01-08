const mongoose = require("mongoose");

//authentication schema
const authSchema = new mongoose.Schema(
	{
		name: String,
		email: {
			type: String,
			unique: true,
		},
		password: String,
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{versionKey: false}
);

const AuthModel = mongoose.model("auth", authSchema);

module.exports = AuthModel;
