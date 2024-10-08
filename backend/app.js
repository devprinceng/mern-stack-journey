require("dotenv").config()
const express = require("express");
const { default: mongoose } = require("mongoose");
const usersRouter = require("./routes/UsersRouter");
const courseRouter = require("./routes/CourseRouter");
const courseSectionRouter = require("./routes/CourseSectionRouter");
const progressRouter = require("./routes/ProgressRouter");
const app = express();

const PORT = process.env.PORT || 5000;

// mongodb connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));

// middlewares
app.use(express.json()); // to parse received data into json

// Routes
app.use("/", usersRouter) //usersRouter
app.use("/", courseRouter) //courseRouter
app.use("/", courseSectionRouter) //courseRouter
app.use("/", progressRouter) //progress Router
// start server
app.listen(PORT, console.log(`Server is running at Port ${PORT}`))