const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			unique: true,
			required: true,
		},
		fname: String,
		lname: String,
		profileImg: {
			type: String,
			default: null,
		},
		profession: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			required: true,
		},
		followers: [String],
		verified: {
			type: Boolean,
			default: false,
		},
	},
	{versionKey: false}
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
