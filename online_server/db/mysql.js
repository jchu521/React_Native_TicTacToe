var logger = require('log4js').getLogger("mysql");
var mysql = require("mysql");
var pool = mysql.createPool({
		host: 'localhost',
		user: 'tectactoe',
		password: 'Tec1Tac@Toe#',
		port: '3306',
		database: 'tectactoe'
		});

var dbMysql = {};
dbMysql.con = function (callback) {
	pool.getConnection(function (err, connection) {
				logger.info("Mysql connect start...")
				if (err) {  
					logger.error(err);
				} else {
					callback(connection);
				}
				connection.release();
				logger.info("Mysql connect end...")
			});
}
module.exports = dbMysql;
