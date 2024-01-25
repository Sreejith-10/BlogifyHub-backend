const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const {createServer} = require("http");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");
const tagRoute = require("./routes/tagRoute");
const notificationRoute = require("./routes/notificationRoute");
const intializeSocket = require("./socket");

const app = express();
const server = createServer(app);

//middleware
app.use(
	cors({
		origin: process.env.FRONT_END || "http://localhost:5173",
		credentials: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static("./public"));

//mongo connection
mongoose
	.connect(
		"mongodb+srv://User1:user1@cluster0.f73be4d.mongodb.net/blog?retryWrites=true&w=majority" ||
			"mongodb://127.0.0.1:27017/blog"
	)
	.then(() => console.log("connected to db"))
	.catch((err) => console.log(err));

//socket.io
intializeSocket(server);

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
