const e = require("express");
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const PORT = process.env.PORT || 5000;


// mongodb connection
mongoose
    .connect('mongodb+srv://remotedev0:2cuaZREuNGa9jOZN@devprince-mern-journey.degdoxp.mongodb.net/devprince-mern-journey?retryWrites=true&w=majority&appName=devprince-mern-journey')
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e))

// start server
app.listen(PORT, console.log(`Server is running at Port ${PORT}`))