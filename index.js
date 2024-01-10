const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const commentRoute = require("./routes/commentRoute");

const app = express();

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

//route
app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);

app.listen(3001, () => {
	console.log("Server started");
});
