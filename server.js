const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.static(path.resolve("www")));

app.get("/", () => {
    
});

app.listen(PORT, () => {
    console.log("Server is on port: " + PORT);
});