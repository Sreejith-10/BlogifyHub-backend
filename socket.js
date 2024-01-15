const socketIO = require("socket.io");

const intializeSocket = (server) => {
	const io = socketIO(server);

	io.on("connection", (socket) => {
		console.log("user connect");

		socket.on("disconnet", () => {
			console.log("user disconnet");
		});

		socket.on("join_room", (authorId) => {
			socket.join(authorId);
		});
	});
};

module.exports = intializeSocket;
