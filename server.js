const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/routes");
const DB = require("./routes/DB");
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.static(path.resolve("www")));



app.listen(PORT, () => {
    console.log("Server is on port: " + PORT);
});