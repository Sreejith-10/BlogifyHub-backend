const multer = require("multer");
const storage = require("../../helper/uploader");

const upload = multer({
	storage: storage,
});

module.exports = upload;
