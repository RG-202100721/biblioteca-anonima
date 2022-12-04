const express = require("express");
const router = express.Router();
const path = require("path");
const DB = require("./DB");



//rotas de interação com a base de dados
router.get("/getBooks", (req, res) => {
    var sql = "SELECT * FROM 'Lista_Livros'";

    DB.query(sql, (err, result) => {
   		if (err) throw err;
   		if (result) res.json({ data: result });
        else res.json({ data: '0 results.' });
	});
});
router.post("/create", (req, res) => {
    var sql = `INSERT INTO ${req.body["Tabela"]} `;
    switch (req.body["Tabela"]) {
        case "Autor": 
            sql += `(Nome, Pais) VALUES ('${req.body["Nome"]}', '${req.body["Pais"]}');`;
            break;
    }
            
    dbcon.query(sql, (err, result) => {
       	if (err) { res.json({ data: '0 results.' }); throw err; }
        else res.json({ message: `Database row inserted! [Query: ${sql}]` });
	});
});
router.put("/edit", (req, res) => {
    var sql = `UPDATE ${req.body["Tabela"]} SET `;
    switch (req.body["Tabela"]) {
        case "Autor": 
            sql += `Nome = '${req.body["Nome"]}', Pais = '${req.body["Pais"]}'`;
            break;
    }
    sql += ` WHERE ID = ${req.body["ID"]};`

    dbcon.query(sql, (err, result) => {
   		if (err) { res.json({ data: '0 results.' }); throw err; }
        else res.json({ message: `Database row updated! [Query: ${sql}]` });
	});
});
router.post("/delete", (req, res) => {
    var sql = '';
    switch (req.body["Tabela"]) {
        case "Autor":
            sql = `DELETE FROM ${req.body["Tabela"]} WHERE ID = ${req.body["ID"]};`;
            break;
    }

    dbcon.query(sql, (err, result) => {
        if (err) { res.json({ data: '0 results.' }); throw err; }
        else res.json({ message: `Database row deleted! [Query: ${sql}]` });
    });
});


//erro 404
router.get('*', (req, res) => {       
    res.json({ data: 'Erro, URL inválido.' });
});


module.exports = router;