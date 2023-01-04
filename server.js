const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const path = require("path");
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.static(path.resolve("www")));
app.use(cookieParser());

const router = require("./routes/routes");
app.use("/", router);

const DB = require("./routes/DB/connection");
DB.start();

app.listen(PORT, () => {
    console.log("Server is on port: " + PORT);
});