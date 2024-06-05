const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;


// start server
app.listen(PORT, console.log(`Server is running at Port ${PORT}`))