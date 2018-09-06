var dbTool = require('./db/db_tool.js');
var logger = require('log4js').getLogger("round");
function Round(propsRound){
	this.room = propsRound.room;
	this.roomIndex = propsRound.index;
	this.steps = new Array();
	this.index = 0;
	this.status = 'new';
	this.db_id = 0;

	this.saveData = function(){
		this.status = 'playing';
		dbTool.saveRound({
				room_index: this.room.db_id,
				x_uuid: this.room.users[0].uuid,
				o_uuid: this.room.users[1].uuid,
				status: this.status,
			},function(id){
				this.db_id = id;
			}.bind(this));
	}.bind(this);

	this.addStep = function(step){
		logger.info('addStep index:' + this.index);
		logger.debug(step)
		if(step.index <= this.index){
			return;
		}
		dbTool.saveStep({
				round_id: this.db_id,
				index: step.index,
				position: step.position,
				piece: step.piece,
				x_uuid: this.room.users[0].uuid,
				o_uuid: this.room.users[1].uuid,
			});
		this.steps[this.index++] = step;
	}.bind(this);

	this.gameOver = function(data){
		if(this.status !== 'playing'){
			return;
		}
		logger.info('round gameOver:');
		logger.debug(data.lastStep);
		if(data.lastStep){
			this.addStep(data.lastStep);
		}
		this.status = data.status;
		this.winner = data.winner;
		this.overReason = data.reason;
		dbTool.updateRound({
				round_id: this.db_id,
				winner: data.winner,
				reason: data.reason,
			});
		
	}.bind(this);
}

module.exports = Round;
