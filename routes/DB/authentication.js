const express = require("express");
const router_auth = express.Router();
const DB = require("./connection");

const JWT = require('jsonwebtoken');
const JWT_Key = 'chave_secreta_JWT';
const JWT_Seconds = 300; //5 minutos

//rotas de autenticação do administrador utilizando JSON Web Tokens
router_auth.post("/login", (req, res) => {
    var sql = "SELECT * FROM Administrador ORDER BY ID ASC;";
    DB.query(sql, (err, result) => {
        if (err) { res.status(500).json({ data: '0 results.' }); throw err; }
        
        let hash = require('crypto').createHash('md5').update(req.body["Password"]).digest("hex");

        let i = 0;
        for (i = 0; i < result.length; i++) if (result[i]["Numero_Conta"] == req.body["Numero_Conta"]) break;

        if (i >= result.length) res.status(400).json({ message: 'Número de Conta está errado.' });
        else {
            if (result[i]["Password"] != hash) res.status(400).json({ message: 'Password está errada.' });
            else {
                const token = JWT.sign({ "Nome": result[i]["Nome"] }, JWT_Key, {
                    algorithm: 'HS256',
                    expiresIn: JWT_Seconds
                });
                res.cookie('token', token, { maxAge: JWT_Seconds * 1000 })
                res.status(200).json({ message: `Cool, ${result[i]["Nome"]} has logged in.`, name: result[i]["Nome"] });
            }
        }
	});
});
router_auth.get("/logout", checkAuth, (req, res) => {
    res.cookie('token', '', { maxAge: 0 })
    res.status(200).json({ message: `Cool, ${req.body["admin"]} has logged out.` });
});

//verifica se o administrador está autenticado
function checkAuth(req, res, next) {
    const token = req.cookies["token"];
    if (token == undefined) res.status(401).json({ message: 'Não tem acesso.\nNão está autenticado.' });
    else {
        var data;
        try { data = JWT.verify(token, JWT_Key); } 
        catch (error) {
            if (error instanceof JWT.JsonWebTokenError) res.status(401).json({ message: error });
            else res.status(500).json({ message: error });
        }
        if (data["Nome"] != "") {
            refreshToken(data, res);
            req.body["admin"] = data["Nome"];
            next();
        }
        else res.status(401).json({ message: 'A sua sessão expirou.\nToken da sessão expirou.' });
    }
}

//cria novo token e cookie com uma nova data de validade, se estiver a 30 segundos de expirar
function refreshToken(data, res) {
    var exp_seconds = data["exp"] - Math.round(Number(new Date()) / 1000);

    if (exp_seconds < 30) {
        const newToken = JWT.sign({ "Nome": data["Nome"] }, JWT_Key, {
            algorithm: 'HS256',
            expiresIn: JWT_Seconds
        });
        res.cookie('token', newToken, { maxAge: JWT_Seconds * 1000 });
    }
}

module.exports = {
    router_auth: router_auth,
    checkAuth: checkAuth
};