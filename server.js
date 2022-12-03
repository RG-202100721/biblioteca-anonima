const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.static(path.resolve("www")));

//---------developer commands (to delete in final delivary)---------//
app.get('/RESET', (req, res) => { 
    server.emit("RESET");
    res.sendFile(path.resolve("./www/index.html"));
});
app.get('/STOP', (req, res) => { 
    server.emit("STOP");
});
//-----------------------------------------------------------------//

const router = require("./routes/routes");
app.use("/", router);

const DB = require("./routes/DB");
DB.start();

const server = app.listen(PORT, () => {
    console.log("Server is on port: " + PORT);
});

//---------developer commands (to delete in final delivary)---------//
server.on('RESET', () => {
    console.log("Resetting database...");
    DB.create();
});
server.on('STOP', () => {
    DB.end();
    console.log("Closing server...");
    server.close();
});