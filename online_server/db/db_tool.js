var dbMysql = require('./mysql');
var logger = require('log4js').getLogger("db_tool");

var dbTool = {};

dbTool.saveRoom = function(data, callbackForResult){
	let query = "INSERT INTO t3_tables(player1, player2, create_time) VALUES(?, ?, now())";
	const {uuid1, uuid2} = data;
	let query_params = [uuid1, uuid2];
	dbMysql.con(function(connect){
			connect.query(query,query_params, function (err, result) {
				if (err) {
					logger.error("saveRoom error, err:" + err);
					return -1;
				}
				//logger.debug(result);
				callbackForResult(result.insertId);
				return 0;
			});
		});
};

dbTool.saveRound = function(data, callbackForResult){
	let query = "INSERT INTO t3_round(table_id, player1, player2, status, create_time) VALUES(?,?,?,?,now())";
	const {room_index, x_uuid, o_uuid, status} = data;
	let query_params = [room_index, x_uuid, o_uuid, status];
	dbMysql.con(function(connect){
			connect.query(query,query_params, function (err, result) {
				if (err) {
					logger.error("saveRound error, err:" + err);
					return -1;
				}
				//logger.debug(result);
				callbackForResult(result.insertId);
				return 0;
			});
		});
};


dbTool.updateRound = function(data){
	let query = "UPDATE t3_round SET winner=?, game_result=?, over_reason=?, status='over', over_time=now() WHERE id=?";
	const { round_id, winner, reason } = data;
	var  over_reason;
	switch(reason) {
		case "DD":
			over_reason= "dual off";
			break;
		case "P":
			over_reason= "normal";
			break;
		case "D":
			if(winner === 'X'){
				over_reason= "player2 off";
			}
			else{
				over_reason= "player1 off";
			}
			break;
		default:
			over_reason= "normal";
	}
	let query_params = [ (reason==='P' && (winner==='X' || winner==='O'))?(winner==='X'?'player1':'player2'):'none', (reason==='P'&&winner==='=')?'draw':'not draw', over_reason, round_id ];
	dbMysql.con(function(connect){
			connect.query(query,query_params, function (err, result) {
				if (err) {
					logger.error("updateRound error, err:" + err);
					return -1;
				}
				return 0;
			});
		});
};


dbTool.saveStep = function(data){
	let query = "INSERT INTO t3_round_steps(round_id, idx, play_time, position, piece, player1, player2) VALUES(?, ?, now(), ?, ?, ?, ?)";
	const {round_id, index, position, piece, x_uuid, o_uuid} = data;
	let query_params = [round_id, index, position, piece, x_uuid, o_uuid];
	dbMysql.con(function(connect){
			connect.query(query,query_params, function (err, result) {
				if (err) {
					logger.error("saveStep error, err:" + err);
					return -1;
				}
				return 0;
			});
		});
};

dbTool.saveRoundForAi = function(data, callbackForResult){
	let query = "INSERT INTO t3_round(table_id, player1, player2, status, create_time, winner, game_result, over_reason, over_time) VALUES('0',?,?,'over',now(),?,?,'normal',now())";
	const {uuid, role, winner} = data;
	var player1, player2, game_winner, game_result;
	if(role === 'X')
	{
		player1 = uuid;
		player2 = 'C-'+uuid;
	}
	else
	{
		player2 = uuid;
		player1 = 'C-'+uuid;
	}
	game_winner = 'none';
	game_result = 'draw';
	if(winner !== '=')
	{
		game_winner = winner === 'X' ? 'player1' : 'player2';
		game_result = 'not draw';
	}
	let query_params = [ player1, player2, game_winner, game_result ];
	dbMysql.con(function(connect){
			connect.query(query,query_params, function (err, result) {
				if (err) {
					logger.error("saveRound error, err:" + err);
					return -1;
				}
				//logger.debug(result);
				callbackForResult(result.insertId);
				return 0;
			});
		});
};

module.exports = dbTool;
