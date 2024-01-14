const TagModel = require("../models/tagModel");

const getAllTags = async (req, res) => {
	try {
		let tags = await TagModel.find();
		if (tags) {
			let allTags = tags.map((item) => item.tagArray).flatMap((item) => item);
			return res.json(allTags);
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	getAllTags,
};
