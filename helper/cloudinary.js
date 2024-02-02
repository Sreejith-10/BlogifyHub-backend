const cloudinary = require("cloudinary");
const dotenv = require("dotenv").config();

cloudinary.v2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.API_SECRET,
	secure: true,
});

const cloudinaryImageUploader = async (file) => {
	let data;
	await cloudinary.uploader
		.upload(file)
		.then((result) => {
			return (data = result);
		})
		.catch((err) => {
			return (data = err);
		});

	return data;
};

module.exports = cloudinaryImageUploader;
