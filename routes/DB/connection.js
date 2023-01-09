const fs = require("fs");
const mysql = require('mysql');

//criação da conexão ao servidor mysql
exports.start = () => {
    var dbconfig = {
        //credenciais do servidor mysql
        connectionLimit: 100,
        host: "sql7.freemysqlhosting.net",
        port: 3306,
        database: "sql7589168",
        user: "sql7589168",
        password: "SN9tWqqBQP",
        multipleStatements: true
    };

    pool = mysql.createPool(dbconfig);
    pool.getConnection((err, con) => {
		if (err) console.log('Error in DB connection (start): ' + err);
        console.log("Connected to DB!");
        con.release();
	});
};

//faz uma query à base de dados (select, update, insert and delete)
exports.query = (sql, callback) => {
    pool.getConnection((err, con) => {
		if (err) {
			con.release();
	  		console.log('Error in DB connection (query): ' + err);
	  	}
        else {
            con.query(sql, (err2, result) => {
                if (err) console.log('Error in DB query (query): ' + err2);
                if (JSON.stringify(sql).includes("INSERT")) {
                    console.log(`Database row inserted! [Query: ${sql}]`);
                    callback(null, result);
                }
                else if (JSON.stringify(sql).includes("UPDATE")) {
                    console.log(`Database row updated! [Query: ${sql}]`);
                    callback(null, null);
                }
                else if (JSON.stringify(sql).includes("DELETE")) {
                    console.log(`Database row deleted! [Query: ${sql}]`);
                    callback(null, null);
                }
                else {
                    console.log(`Database queried! [Query: ${sql}]`);
                    callback(null, result);
                }
                con.release();
            });
        }
	});
};

//fim da conexão ao servidor mysql
exports.end = () => {
    pool.end((err) => {
        if (err) console.log('Error in DB connection (end): ' + err);
        console.log("Connection closed!");
    });
};

exports.listaTudo = `SELECT * FROM Autor ORDER BY ID ASC; 
SELECT * FROM Categoria ORDER BY ID ASC;
SELECT * FROM Editora ORDER BY ID ASC;
SELECT * FROM Livro ORDER BY ID ASC; 
SELECT * FROM Livro_Autor ORDER BY IDLivro ASC, IDAutor ASC;
SELECT * FROM Livro_Categoria ORDER BY IDLivro ASC, IDCategoria ASC;`.replace(/\s+/g, ' ').split("\r\n").join('');