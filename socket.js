const socketIO = require("socket.io");

const intializeSocket = (server) => {
	const io = new socketIO.Server(server, {
		cors: {
			origin: "http://localhost:5173",
			methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
		console.log("user connect");

		socket.on("disconnet", () => {
			console.log("user disconnet");
		});

		socket.on("join_room", (authorId) => {
			console.log("Joined");
			socket.join(authorId);
		});

		socket.on("leave-room", (authorId) => {
			console.log("Left");
			socket.leave(authorId);
		});

		socket.on("like_post", (authorId) => {
			io.to(authorId).emit("notify", "Someone likes your post");
		});

		socket.on("comment_post", (authorId) => {
			io.to(authorId).emit("notify", "someone commented on you post");
		});

		socket.on("reply_comment", (authorId) => {
			io.to(authorId).emit("notify", "someone replied to your comment");
		});
	});
};

module.exports = intializeSocket;
