const fs = require("fs");
const mysql = require('mysql');

//criação da conexão ao servidor mysql
exports.start = () => {
    var dbconfig = {
        //credenciais do servidor mysql
        connectionLimit: 100,
        host: "remotemysql.com",
        port: 3306,
        database: "yOVZXrSpNL",
        user: "yOVZXrSpNL",
        password: "MvHQ1igl7N",
        multipleStatements: true
    };

    pool = mysql.createPool(dbconfig);
    pool.getConnection((err, con) => {
		if (err) console.log('Error in DB connection (start): ' + err);
        console.log("Connected to DB!");
        con.release();
	});
};

//---------developer command (to delete in final delivary)---------//
exports.create = () => {
    var sql = fs.readFile('./database.sql').toString().replace(/\s+/g, ' ').split("\r\n").join('');
    pool.getConnection((err, con) => {
		if (err) {
			con.release();
	  		console.log('Error in DB connection (create): ' + err);
	  	}
        else {
            con.query(sql, (err2, result) => {
                if (err) console.log('Error in DB query (create): ' + err2);
                console.log("Database created!");
                con.release();
            });
        }
	});
};
//-----------------------------------------------------------------//

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