const express = require("express");
const router = express.Router();
const path = require("path");
const DB = require("./DB");



//rotas de interação com a base de dados
router.get("/getData", (req, res) => {
    
});
router.post("/create", (req, res) => {

});
router.put("/edit", (req, res) => {

});
router.post("/deleteData", (req, res) => {

});


//erro 404
router.get('*', (req, res) => {       
    res.json('Erro, URL inválido.');
});


module.exports = router;