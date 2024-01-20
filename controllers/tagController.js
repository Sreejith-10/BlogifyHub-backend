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

const getTrendingTags = async (req, res) => {
	try {
		t = await TagModel.aggregate([
			{
				$unwind: "$tagArray",
			},
			{
				$group: {
					_id: "$tagArray",
					count: {
						$sum: 1,
					},
				},
			},
			{
				$sort: {
					count: -1,
				},
			},
			{
				$limit: 10,
			},
		]);
		res.json(t);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	getAllTags,
	getTrendingTags,
};
