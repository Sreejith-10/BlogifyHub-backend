const formidable = require("formidable");

const parseForm = (req, res, next) => {
	const form = new formidable.IncomingForm();

	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err);
			return;
		}
		req.body = fields;
		req.file = files.postImage
			? files.postImage[0]
			: files.editPostImage
			? files.editPostImage[0]._writeStream.path
			: files.profileImage
			? files.profileImage[0]._writeStream.path
			: files.img
			? files.img[0]
			: null;
		next();
	});
};

module.exports = parseForm;
