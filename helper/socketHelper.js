const io = require("../index");

const setNotification = (authorId, notification) => {
	io.to(authorId).emit("notify", notification);
};

module.exports = setNotification;
