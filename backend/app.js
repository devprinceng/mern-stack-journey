const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const PORT = process.env.PORT || 5000;


// mongodb connection
mongoose
    .connect()
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e))

// start server
app.listen(PORT, console.log(`Server is running at Port ${PORT}`))