var log4js = require('log4js');
log4js.configure('conf/log4js.json'); //https://blog.csdn.net/wangdan_2013/article/details/78851153
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'trace' }));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

var server = require('http').createServer(app);
var SocketServer = require('./server.js');
var sserv = new SocketServer();

app.get('/', function (req, res) {
    res.writeHead(200); 
    res.end('');
});

app.post('/round', function (req, res) {
	const {uuid, status, winner, reason, lastStep} = req.body;
	user = sserv.gameOver({
			uuid:uuid,
			status: status,
			winner: winner,
			reason: reason,
			lastStep: lastStep,
		});
	let rtn = JSON.stringify({
			result:	1,
		});

    res.writeHead(200); 
    res.end(rtn);
});

app.get('/round', function (req, res) {
	const {uuid, status, winner, reason, lastStep} = req.query;
	user = sserv.gameOver({
			uuid:uuid,
			status: status,
			winner: winner,
			reason: reason,
			lastStep: lastStep,
		});
	let rtn = JSON.stringify({
			result:	1,
		});

    res.writeHead(200); 
    res.end(rtn);
});
app.get('/steps', function (req, res) {
	const { uuid } = req.query;
	if(!uuid || uuid==='null'){
		res.writeHead(200);
		res.end(JSON.stringify({error:'Wrong uuid'}));
		return;
	}
	user = sserv.getSteps({uuid:uuid});
	let rtn = JSON.stringify({
			steps:	user.room.currentRound.steps,
			role:	user.role,
			start:	user.room.users.length > 1,
			oppoDisc: user.checkOpponentStatus(),
			online: user.onlineTime,
		});
    res.writeHead(200); 
    res.end(rtn);
});

app.post('/addstep', function (req, res) {
	const {uuid, index, position, piece} = req.body;
	if(!uuid || uuid==='null'){
		res.writeHead(200);
		res.end(JSON.stringify({error:'Wrong uuid'}));
		return;
	}
	user = sserv.addStep({
			uuid:uuid,
			index: index,
			position: position,
			piece: piece,
		});
	let rtn = JSON.stringify({
			result:	1,
		});
    res.writeHead(200); 
    res.end(rtn);
});

app.get('/addstep', function (req, res) {
	const {uuid, index, position, piece} = req.query;
	if(!uuid || uuid==='null'){
		res.writeHead(200);
		res.end(JSON.stringify({error:'Wrong uuid'}));
		return;
	}
	user = sserv.addStep({
			uuid:uuid,
			index: index,
			position: position,
			piece: piece,
		});
	let rtn = JSON.stringify({
			result:	1,
		});
    res.writeHead(200); 
    res.end(rtn);
});

app.post('/computer', function (req, res) {
	sserv.saveDataForAI(req.body);
	let rtn = JSON.stringify({
			result:	1,
		});
    res.writeHead(200); 
    res.end(rtn);
});
server.listen(8082);
