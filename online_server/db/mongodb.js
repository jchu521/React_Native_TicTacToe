//https://blog.csdn.net/Dear_Mr/article/details/76407606

var mongoClient = require('dbMongo').MongoClient;


function dbMongo(url) {
	this.url = url;
	this.db = null;
}

function connect(url, callback) {
	if(!url) {
		throw new Error('url');
		return;
	}

	mongoClient.connect(url, function(err, db) {
			callback(err, db);
			db.close();
		});
}

//
dbMongo.prototype.insert = function(collectionName, data) {
	if(!typeof collectionName == 'string' || !typeof data == 'object') {
		throw new Error('');
	}

	connect(this.url, function(err, db) {
		if(Array.isArray(data)) {
			db.collection(collectionName).insertMany(data).then(function(result) {
				if(result) {
					console.log('');
				}else {
					console.log('');
				}
			});
		}else {
			db.collection(collectionName).insertOne(data).then(function(result) {
				if(result) {
					console.log('');
				}else {
					console.log('');
				}
			});
		}
	});
}

//falg=true,false
dbMongo.prototype.update = function(flag, collectionName, condition, data) {
	if(typeof collectionName != 'string') {
		throw new Error('');
	}

	connect(this.url, function(err, db) {

			if(flag) {
				db.collection(collectionName).updateOne(condition, data).then(function(result) {
					console.log('');
				});
			}else {
				db.collection(collectionName).updateMany(condition, data).then(function(result) {
					console.log('');
				});
			}
		});
}

//(falg=trueflag=false)
dbMongo.prototype.delete = function(flag, collectionName, condition) {
	if(arguments.length != 3) {
		throw new Error('3');
	}

	connect(this.url, function(err, db) {

			if(flag) {
				db.collection(collectionName).deleteOne(condition).then(function(result) {
					console.log("");
				});
			}else {
				db.collection(collectionName).deleteMany(condition).then(function(result) {
					console.log("");
				});
			}
			});
}

// 
dbMongo.prototype.find = function(collectionName, condition, callback) {
	var result;
	if(arguments.length != 3) {
		throw new Error('');
	}
	connect(this.url, function(err, db) {
			var cursor = db.collection(collectionName).find(condition);

			cursor.each(function(err, doc) {
					if(err) {
						callback(err, null);
					}
					if(doc != null) {
						result.push(doc);
					}else {
						callback(null, result);
					}
				})
			});
}

module.exports = dbMongo;
