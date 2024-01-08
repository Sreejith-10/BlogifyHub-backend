const addPost = (req, res) => {
	console.log(req.body);
	console.log(req.file);
	res.json("Succes");
};

module.exports = {
	addPost,
};
