var logger = require('log4js').getLogger("user");
function User(props){
	this.uuid = props.uuid;
	this.status = 'playing';

	this.updateStatus = function(){
		this.onlineTime = Math.floor(process.uptime());
	}.bind(this);

	this.checkOffline = function(interval){
		return this.onlineTime < process.uptime() - interval;
	}

	this.checkOpponentStatus = function(){
		let out = Math.floor(process.uptime());
		if(out < 2*60) return false;
		out -= 2*60;
		if(this.room && this.room.users.length > 1){
			let tUser = this.room.users[0];
			if(this.room.users[0].uuid === this.uuid){
				tUser = this.room.users[1];
			}
			if(tUser.onlineTime < out){
				tUser.status = 'offline';
				this.gameOver({
						status: 'over',
						winner: this.role,
						reason: 'D',
						});
				return true;
			}
		}
		return false;
	}.bind(this);

	this.switchRole = function(){
		this.role = (this.role === 'X' ? 'O' : 'X');
	}.bind(this);

	this.gameOver = function(data){
		this.status = 'gameover';
		this.room.currentRound.gameOver(data);
	}.bind(this);

	this.init = function(){
		logger.info('init uuid:'+this.uuid);
		this.status = 'connect';
	}.bind(this);

	this.init();
}
module.exports = User;
