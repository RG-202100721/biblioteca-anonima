const express = require("express");
const router = express.Router();
const path = require("path");
const DB = require("./DB");



//rotas de interação com a base de dados
router.get("/getBooks", (req, res) => {
    var sql = DB.listaLivro;
    DB.query(sql, (err, result) => {
   		if (err) throw err;
   		if (result) res.json({ data: result });
        else res.json({ data: '0 results.' });
	});
});
router.post("/create", (req, res) => {
    var sql = `SELECT ID FROM ${req.body["Tabela"]} ORDER BY ID ASC;`;
    dbcon.query(sql, (err, result) => {
        if (err) throw err;
        else {
            var id = 0;
            for (id = 1; id - 1 < Object.keys(result).length; id++) if (result[id - 1]["ID"] != id) break;
            sql = `INSERT INTO ${req.body["Tabela"]} VALUES `;
            if (req.body["Tabela"] == "Livro") {
                sql += `(${id}, '${req.body["Titulo"]}', '${req.body["ISBN"]}', ${req.body["Numero_Paginas"]}, ${req.body["IDEditora"]}, '${req.body["Capa"]}');`;
                var message = `Database row inserted! [Query: ${sql}]\n`;
                dbcon.query(sql, function(err, result) {
                    if (err) throw err;
                    else {
                        sql = "";
                        req.body["IDAutores"].forEach(IDAutor => {
                            sql += `INSERT INTO Livro_Autor VALUES (${id}, ${IDAutor});`;
                        });
                        message += `Database row inserted! [Query: ${sql}]\n`;
                        dbcon.query(sql, function(err, result) {
                            if (err) throw err;
                            else {
                                sql = "";
                                req.body["IDCategorias"].forEach(IDCategoria => {
                                    sql += `INSERT INTO Livro_Autor VALUES (${id}, ${IDCategoria});`;
                                });
                                message += `Database row inserted! [Query: ${sql}]`;
                                dbcon.query(sql, (err, result) => {
                                    if (err) { res.json({ message: '0 results.' }); throw err; }
                                    else res.json({ message: message });
                                });
                            }
                        });
                    }
                });
            }
            else {
                switch (req.body["Tabela"]) {
                    case "Autor":
                    case "Editora": sql += `(${id}, '${req.body["Nome"]}', '${req.body["Pais"]}');`; break;
                    default: sql += `(${id}, '${req.body["Nome"]}');`; break;
                }
                dbcon.query(sql, (err, result) => {
                    if (err) { res.json({ message: '0 results.' }); throw err; }
                    else res.json({ message: `Database row inserted! [Query: ${sql}]` });
                });
            }
        }
    });
});
router.put("/edit", (req, res) => {
    var sql = `UPDATE ${req.body["Tabela"]} SET `;
    switch (req.body["Tabela"]) {
        case "Categoria": sql += `Nome = '${req.body["Nome"]}'`; break;
        case "Autor": 
        case "Editora": sql += `Nome = '${req.body["Nome"]}', Pais = '${req.body["Pais"]}'`; break;
        default: sql += `Titulo = '${req.body["Titulo"]}', ISBN = '${req.body["ISBN"]}', Numero_Paginas = ${req.body["Numero_Paginas"]}, IDEditora = ${req.body["IDEditora"]}, Capa = '${req.body["Capa"]}'`; break;
    }
    sql += ` WHERE ID = ${req.body["ID"]};`

    dbcon.query(sql, (err, result) => {
   		if (err) { res.json({ message: '0 results.' }); throw err; }
        else res.json({ message: `Database row updated! [Query: ${sql}]` });
	});
});
router.delete("/delete", (req, res) => {
    var sql = `DELETE FROM ${req.body["Tabela"]} WHERE ID = ${req.body["ID"]};`;
    dbcon.query(sql, (err, result) => {
        if (err) { res.json({ message: '0 results.' }); throw err; }
        else res.json({ message: `Database row deleted! [Query: ${sql}]` });
    });
});


//erro 404
router.get('*', (req, res) => {       
    res.json({ message: 'Erro, URL inválido.' });
});


module.exports = router;