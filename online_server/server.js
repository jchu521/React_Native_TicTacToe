var logger = require('log4js').getLogger("server");
var User = require('./user.js');
var Room = require('./room.js');
var schedule = require('node-schedule');
var dbTool = require('./db/db_tool.js');

function SocketServer() {
	this.rooms = new Map();
	this.users = new Map();
	this.roomIndex = 0;

	this.checkDisconnect = function(){
		logger.info('Timer task start...');
		let out = Math.floor(process.uptime());
		if( out < 3 * 60) return ;
		out -= 3*60;
		this.rooms.forEach(function(room){
				room.users.forEach(function(user){
						if(user.onlineTime < out){
							user.room.currentRound.gameOver({
									status: 'over',
									winner: '=',
									reason: user.room.users.length > 1 ? 'DD' : 'D',
									});
							user.status = 'gameover';
							curUser = user.room.server.users.get(user.uuid);
							if(curUser && curUser.onlineTime < out){
								user.room.server.removeUser(user.uuid);
							}
						}
					});
				if(room.users.length > 1){
					if(room.users[0].onlineTime < out && room.users[1].onlineTime < out){
						room.server.removeRoom(room);
					}
				}
				if(room.users.length === 1){
					if(room.users[0].onlineTime < out){
						room.server.removeRoom(room);
					}
				}
				});
	}.bind(this);

	this.timer = schedule.scheduleJob('*/5 * * * *', this.checkDisconnect);

	this.newRoom = function(){
		this.rooms.set(this.roomIndex, new Room({
				index: this.roomIndex,
				server: this,
			}));
		logger.debug('new room index:'+this.roomIndex);
		return this.rooms.get(this.roomIndex++);
	}.bind(this);

	this.newRoom();

	this.getUser = function(uuid){
		logger.info('getUser:' + uuid);
		let user = this.users.get(uuid);
		if(!user){
			user = new User({uuid:uuid});
			this.users.set(uuid,user);
			let room = this.rooms.get(this.roomIndex-1);

			if((room.users.length === 1 && room.users[0].uuid === uuid ))
			{
				room.users = new Array();
			}
			else if(room.users.length > 1 || (room.users.length === 1 && room.users[0].onlineTime < process.uptime() - 1*60 )){
				room = this.newRoom();
			}
			room.addUser(user);
		}
		logger.debug('getUser user count:'+user.room.users.length);
		user.room.users.forEach(function(user){
				logger.debug('uuid : '+user.uuid);
				});
		user.updateStatus();
		return user;
	}.bind(this);

	this.removeUser = function(uuid){
		logger.info('removeUser:' + uuid);
		this.users.delete(uuid);
	}

	this.removeRoom = function(room){
		if(room.index === this.roomIndex - 1){
			this.newRoom();
		}
		this.rooms.delete(room.index);
	}.bind(this);

	this.addStep = function(data){
		logger.info('addStep:' + data.uuid);
		let user = this.getUser(data.uuid);
		user.room.currentRound.addStep(data);
		return user;
	}.bind(this);

	this.getSteps = function(data){
		logger.info('getSteps:' + data.uuid);
		let user = this.getUser(data.uuid);
		if(user.status === 'gameover'){
			this.removeUser(data.uuid);
			user = this.getUser(data.uuid);
		}
		if(user.status === 'offline'){
			user.status = 'gameover';
		}
		return user;
	}.bind(this);

	this.gameOver = function(data){
		logger.info('gameOver:' + data.uuid);
		let user = this.getUser(data.uuid);
		user.gameOver(data);
		return user;
	}.bind(this);

	this.saveDataForAI = function(data){
		dbTool.saveRoundForAi(data,function(id){
				const {steps,uuid,role} = data;
				steps.forEach(function(step){
						dbTool.saveStep({
								round_id: id,
								index: step.index,
								position: step.position,
								piece: step.piece,
								x_uuid: role==='X'?uuid:'C-'+uuid,
								o_uuid: role==='O'?uuid:'C-'+uuid,
							});
					});
			});
	}.bind(this);

};
module.exports = SocketServer;
