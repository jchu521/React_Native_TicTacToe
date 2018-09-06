var User = require('./user.js');
var logger = require('log4js').getLogger("room");
var User = require('./user.js');
var Round = require('./round.js');
var dbTool = require('./db/db_tool.js');
function Room(propsRoom){
	this.index = propsRoom.index;
	this.server = propsRoom.server;
	this.name = 'r' + this.index;
	this.users = new Array();
	this.roundIndex = 0;
	this.db_id = 0;
	this.currentRound = new Round({
				room: this,
				index: ++this.roundIndex,
			});

	this.saveData = function(){
		dbTool.saveRoom({
				uuid1: this.users[0].uuid,
				uuid2: this.users[1].uuid,
			},function(id){
				this.db_id = id;
				this.currentRound.saveData();
			}.bind(this));
	}.bind(this);

	this.addUser = function(user){
		logger.debug('room: ' + this.name + ', users count:' + this.users.length);
		if(this.users.length > 1) {
			return false;
		}
		user.room = this;
		user.role = (this.users.length === 0 ? 'X' : 'O');
		this.users[this.users.length] = user;
		if(this.users.length === 2){
			this.saveData();
		}
		return true;
	}.bind(this);

	this.switchRole = function(){
		this.users.forEach(function(user){
				user.switchRole();
			});
	}.bind(this);
}

module.exports = Room;
