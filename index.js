const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const {createServer} = require("http");
const {Server} = require("socket.io");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const tagRoute = require("./routes/tagRoute");
const notificationRoute = require("./routes/notificationRoute");

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
	},
});

//middleware
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static("./public"));

//mongo connection
mongoose
	.connect("mongodb://127.0.0.1:27017/blog")
	.then(() => console.log("connected to db"))
	.catch((err) => console.log(err));

//socket.io
io.on("connection", (socket) => {
	console.log("user connect");

	socket.on("disconnet", () => {
		console.log("user disconnet");
	});

	socket.on("join_room", (authorId) => {
		socket.join(authorId);
	});
	socket.on("leave-room", (authorId) => {
		socket.leave(authorId);
	});
	socket.on("like_post", (authorId) => {
		io.to(authorId).emit("notify", "Someone likes your post");
	});
});

//route
app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);
app.use("/tag", tagRoute);
app.use("/notification", notificationRoute);

server.listen(3001, () => {
	console.log("Server started");
});
