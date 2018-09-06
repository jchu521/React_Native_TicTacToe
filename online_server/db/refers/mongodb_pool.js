//http://www.nodeclass.com/articles/33518
//mongo.js:
var mongodb = require('mongodb'),
cache = {};
function connect (url, options) {
	var fns = [], status = 0, _db = cache[url];
	return function (f) {
		var args = arguments;
		if (_db !== null && typeof _db === 'object') {
			f.call(null, _db);
			return;
		}     
		fns.push(f);
		if (status === 0) {
			status = 1;
			mongodb.MongoClient.connect(url, options, function (err, db) {
				if (err) {
					throw err; 
				}
				_db = cache[url] = db;
				for (var i = 0, len = fns.length; i < len; i++) {
					fns.shift().call(null, _db);
				}
			});
		}
	};
}
module.connect = connect;

//database.json:
{
	"test" : {
		"url"     : "mongodb://root:123456@127.0.0.1:27017/test",
			"options" : {
				"server" : {
					"poolSize" : 10
				}
			}
	}
}

//usage:
var conf = require('./database.json');
var connect = require('mongo').connect(conf.test.url, conf.test.options);
connect(function (db) {
		});
connect(function (db) {
		});
