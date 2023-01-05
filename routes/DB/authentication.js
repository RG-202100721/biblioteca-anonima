const express = require("express");
const router_auth = express.Router();
const DB = require("./connection");

const JWT = require('jsonwebtoken');
const JWT_Key = 'chave_secreta';
const JWT_Seconds = 600;

//rotas de autenticação do administrador utilizando JSON Web Tokens
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
router_auth.get("/refresh", checkAuth, (req, res) => {
    
});
router_auth.get("/logout", checkAuth, (req, res) => {
    res.cookie('token', '', { maxAge: 0 })
    res.status(200).json({ message: 'Cool, you\'ve logged out.' });
});

//verifica se o administrador está autenticado
function checkAuth(req, res, next) {
    const token = req.cookies.token;
    if (token == undefined) res.status(401).json({ message: 'Não tem acesso.\nNão está autenticado.' });
    else {
        if (req.url != "/refresh") {
            //request token
        }
        else next();
    }
}

module.exports = {
    router_auth: router_auth,
    checkAuth: checkAuth
};