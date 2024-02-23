const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv").config();

cloudinary.config({
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
			data = result;
		})
		.catch((err) => {
			data = err;
		});
	return data;
};

module.exports = cloudinaryImageUploader;
