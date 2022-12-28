const express = require("express");
const router_DB = express.Router();
const DB = require("./DB");

//rotas de interação com a base de dados
router_DB.get("/getBooks", (req, res) => {
    var sql = DB.listaLivro;
    DB.query(sql, (err, result) => {
   		if (err) { res.status(500).json({ data: '0 results.' }); throw err; }
   		if (result) res.status(200).json({ data: result });
        else res.status(500).json({ data: '0 results.' });
	});
});
router_DB.post("/create", (req, res) => {
    var sql = `SELECT ID FROM ${req.body["Tabela"]} ORDER BY ID ASC;`;
    DB.query(sql, (err, result) => {
        if (err) { res.status(500).json({ message: '0 results.' }); throw err; }
        else {
            var id = 0;
            for (id = 1; id - 1 < Object.keys(result).length; id++) if (result[id - 1]["ID"] != id) break;
            sql = `INSERT INTO ${req.body["Tabela"]} VALUES `;
            if (req.body["Tabela"] == "Livro") {
                sql += `(${id}, '${req.body["Titulo"]}', '${req.body["ISBN"]}', ${req.body["Numero_Paginas"]}, ${req.body["IDEditora"]}, '${req.body["Capa"]}');`;
                var message = `Database row inserted! [Query: ${sql}]\n`;

                DB.query(sql, function(err, result) {
                    if (err) { res.status(500).json({ message: '0 results.' }); throw err; }
                    else {
                        sql = "";
                        req.body["IDAutores"].forEach(IDAutor => {
                            sql += `INSERT INTO Livro_Autor VALUES (${id}, ${IDAutor}); `;
                        });
                        message += `Database row inserted! [Query: ${sql}]\n`;

                        DB.query(sql, function(err, result) {
                            if (err) { res.status(500).json({ message: '0 results.' }); throw err; }
                            else {
                                sql = "";
                                req.body["IDCategorias"].forEach(IDCategoria => {
                                    sql += `INSERT INTO Livro_Categoria VALUES (${id}, ${IDCategoria}); `;
                                });
                                message += `Database row inserted! [Query: ${sql}]`;

                                DB.query(sql, (err, result) => {
                                    if (err) { res.status(500).json({ message: '0 results.' }); throw err; }
                                    else res.status(200).json({ message: message });
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
                DB.query(sql, (err, result) => {
                    if (err) { res.status(500).json({ message: '0 results.' }); throw err; }
                    else res.status(200).json({ message: `Database row inserted! [Query: ${sql}]` });
                });
            }
        }
    });
});
router_DB.put("/edit", (req, res) => {
    var sql = `UPDATE ${req.body["Tabela"]} SET `;
    if (req.body["Tabela"] == "Livro") {
        sql += `Titulo = '${req.body["Titulo"]}', ISBN = '${req.body["ISBN"]}', Numero_Paginas = ${req.body["Numero_Paginas"]}, IDEditora = ${req.body["IDEditora"]}, Capa = '${req.body["Capa"]}' WHERE ID = ${req.body["ID"]};`;
        var message = `Database row updated! [Query: ${sql}]\n`;
        
        DB.query(sql, function(err, result) {
            if (err) { res.status(500).json({ message: '0 results.' }); throw err; }
            else {
                sql = `DELETE FROM Livro_Autor WHERE IDLivro = ${req.body["ID"]};`;
                message += `Database rows deleted! [Query: ${sql}]\n`;

                DB.query(sql, function(err, result) {
                    if (err) { res.status(500).json({ message: '0 results.' }); throw err; }
                    else {
                        sql = "";
                        req.body["IDAutores"].forEach(IDAutor => {
                            sql += `INSERT INTO Livro_Autor VALUES (${req.body["ID"]}, ${IDAutor}); `;
                        });
                        message += `Database rows inserted! [Query: ${sql}]\n`;
        
                        DB.query(sql, function(err, result) {
                            if (err) { res.status(500).json({ message: '0 results.' }); throw err; }
                            else {
                                sql = `DELETE FROM Livro_Categoria WHERE IDLivro = ${req.body["ID"]};`;
                                message += `Database rows deleted! [Query: ${sql}]\n`;

                                DB.query(sql, function(err, result) {
                                    if (err) { res.status(500).json({ message: '0 results.' }); throw err; }
                                    else {
                                        sql = "";
                                        req.body["IDCategorias"].forEach(IDCategoria => {
                                            sql += `INSERT INTO Livro_Categoria VALUES (${req.body["ID"]}, ${IDCategoria}); `;
                                        });
                                        message += `Database rows inserted! [Query: ${sql}]`;
                
                                        DB.query(sql, (err, result) => {
                                            if (err) { res.status(500).json({ message: '0 results.' }); throw err; }
                                            else res.status(200).json({ message: message });
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        switch (req.body["Tabela"]) {
            case "Autor":
            case "Editora": sql += `Nome = '${req.body["Nome"]}', Pais = '${req.body["Pais"]}'`; break;
            default: sql += `Nome = '${req.body["Nome"]}'`; break;
        }
        sql += ` WHERE ID = ${req.body["ID"]};`

        DB.query(sql, (err, result) => {
            if (err) { res.status(500).json({ message: '0 results.' }); throw err; }
            else res.status(200).json({ message: `Database row updated! [Query: ${sql}]` });
        });
    }
});
router_DB.delete("/delete", (req, res) => {
    var sql = `DELETE FROM ${req.body["Tabela"]} WHERE ID = ${req.body["ID"]};`;
    DB.query(sql, (err, result) => {
        if (err) { res.status(500).json({ message: '0 results.' }); throw err; }
        else res.status(200).json({ message: `Database row deleted! [Query: ${sql}]` });
    });
});

module.exports = router_DB;