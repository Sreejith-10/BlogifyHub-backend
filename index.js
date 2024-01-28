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
		origin: "http://localhost:5173" || process.env.FRONT_END,
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	})
);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static("./public"));

//mongo connection
mongoose
	.connect("mongodb://127.0.0.1:27017/blog" || process.env.MONGO_URI)
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
