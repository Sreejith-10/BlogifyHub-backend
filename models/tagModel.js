const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
	{
		tagArray: [String],
	},
	{_id: false, versionKey: false}
);

const TagModel = mongoose.model("tag", tagSchema);

module.exports = TagModel;
