const express = require("express");
const router_auth = express.Router();
const DB = require("./connection");

//rotas de autenticação do administrador
router_auth.get("/login", (req, res) => {
    var sql = "SELECT * FROM Administrador ORDER BY ID ASC;";
    DB.query(sql, (err, result) => {
        if (err) { res.status(500).json({ data: '0 results.' }); throw err; }
        
        result["Numero_Conta"]
        result["Password"]

        var pass = false;
        req.body["Numero_Conta"]
        req.body["Password"]

   		if (pass == true) res.status(200).json({ data: result });
        else res.status(500).json({ data: '0 results.' });
	});
});

//verifica se o administrador está autenticado
export function checkAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) res.status(401).json({ message: 'Não está autenticado.' });
    else next();
}

module.exports = router_auth;