const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
	tags: [String],
});

const TagModel = mongoose.model("tag", tagSchema);

module.exports = TagModel;
