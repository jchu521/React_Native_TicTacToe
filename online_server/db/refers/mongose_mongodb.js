///https://www.cnblogs.com/yangjinjin/p/5371415.html
/**
 * mongoose??????(????mongodb)
 */

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('pomelo-logger').getLogger('mongodb-log');

var options = {
    db_user: "game",
    db_pwd: "12345678",
    db_host: "192.168.2.20",
    db_port: 27017,
    db_name: "dbname"
};

var dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name;
mongoose.connect(dbURL);

mongoose.connection.on('connected', function (err) {
    if (err) logger.error('Database connection failure');
});

mongoose.connection.on('error', function (err) {
    logger.error('Mongoose connected error ' + err);
});

mongoose.connection.on('disconnected', function () {
    logger.error('Mongoose disconnected');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        logger.info('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

var DB = function () {
    this.mongoClient = {};
    var filename = path.join(path.dirname(__dirname).replace('app', ''), 'config/table.json');
    this.tabConf = JSON.parse(fs.readFileSync(path.normalize(filename)));
};

/**
 * ??????mongoose model
 * @param table_name ??????(????????)
 */
DB.prototype.getConnection = function (table_name) {
    if (!table_name) return;
    if (!this.tabConf[table_name]) {
        logger.error('No table structure');
        return false;
    }

    var client = this.mongoClient[table_name];
    if (!client) {
        //??????????????????
        var nodeSchema = new mongoose.Schema(this.tabConf[table_name]);

        //????model
        client = mongoose.model(table_name, nodeSchema, table_name);

        this.mongoClient[table_name] = client;
    }
    return client;
};

/**
 * ????????
 * @param table_name ????
 * @param fields ??????
 * @param callback ????????
 */
DB.prototype.save = function (table_name, fields, callback) {
    if (!fields) {
        if (callback) callback({msg: 'Field is not allowed for null'});
        return false;
    }

    var err_num = 0;
    for (var i in fields) {
        if (!this.tabConf[table_name][i]) err_num ++;
    }
    if (err_num > 0) {
        if (callback) callback({msg: 'Wrong field name'});
        return false;
    }

    var node_model = this.getConnection(table_name);
    var mongooseEntity = new node_model(fields);
    mongooseEntity.save(function (err, res) {
        if (err) {
            if (callback) callback(err);
        } else {
            if (callback) callback(null, res);
        }
    });
};

/**
 * ????????
 * @param table_name ????
 * @param conditions ?????????????? {_id: id, user_name: name}
 * @param update_fields ???????????? {age: 21, sex: 1}
 * @param callback ????????
 */
DB.prototype.update = function (table_name, conditions, update_fields, callback) {
    if (!update_fields || !conditions) {
        if (callback) callback({msg: 'Parameter error'});
        return;
    }
    var node_model = this.getConnection(table_name);
    node_model.update(conditions, {$set: update_fields}, {multi: true, upsert: true}, function (err, res) {
        if (err) {
            if (callback) callback(err);
        } else {
            if (callback) callback(null, res);
        }
    });
};

/**
 * ????????????(??????????)
 * @param table_name ????????
 * @param conditions ???????? {_id: id, user_name: name}
 * @param update_fields ???????????? {$set: {id: 123}}
 * @param callback ????????
 */
DB.prototype.updateData = function (table_name, conditions, update_fields, callback) {
    if (!update_fields || !conditions) {
        if (callback) callback({msg: 'Parameter error'});
        return;
    }
    var node_model = this.getConnection(table_name);
    node_model.findOneAndUpdate(conditions, update_fields, {multi: true, upsert: true}, function (err, data) {
        if (callback) callback(err, data);
    });
};

/**
 * ????????
 * @param table_name ????
 * @param conditions ?????????????? {_id: id}
 * @param callback ????????
 */
DB.prototype.remove = function (table_name, conditions, callback) {
    var node_model = this.getConnection(table_name);
    node_model.remove(conditions, function (err, res) {
        if (err) {
            if (callback) callback(err);
        } else {
            if (callback) callback(null, res);
        }
    });
};

/**
 * ????????
 * @param table_name ????
 * @param conditions ????????
 * @param fields ??????????
 * @param callback ????????
 */
DB.prototype.find = function (table_name, conditions, fields, callback) {
    var node_model = this.getConnection(table_name);
    node_model.find(conditions, fields || null, {}, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * ????????????
 * @param table_name ????
 * @param conditions ????????
 * @param callback ????????
 */
DB.prototype.findOne = function (table_name, conditions, callback) {
    var node_model = this.getConnection(table_name);
    node_model.findOne(conditions, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * ????_id??????????????
 * @param table_name ????
 * @param _id ?????????????? ObjectId ??????
 * @param callback ????????
 */
DB.prototype.findById = function (table_name, _id, callback) {
    var node_model = this.getConnection(table_name);
    node_model.findById(_id, function (err, res){
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * ????????????????????
 * @param table_name ????
 * @param conditions ????????
 * @param callback ????????
 */
DB.prototype.count = function (table_name, conditions, callback) {
    var node_model = this.getConnection(table_name);
    node_model.count(conditions, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * ????????????????????????????????????????
 * @param table_name ????
 * @param field ????????????
 * @param conditions ????????
 * @param callback ????????
 */
DB.prototype.distinct = function (table_name, field, conditions, callback) {
    var node_model = this.getConnection(table_name);
    node_model.distinct(field, conditions, function (err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * ????????
 * @param table_name ????
 * @param conditions ???????? {a:1, b:2}
 * @param options ??????{fields: "a b c", sort: {time: -1}, limit: 10}
 * @param callback ????????
 */
DB.prototype.where = function (table_name, conditions, options, callback) {
    var node_model = this.getConnection(table_name);
    node_model.find(conditions)
        .select(options.fields || '')
        .sort(options.sort || {})
        .limit(options.limit || {})
        .exec(function (err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        });
};

module.exports = new DB();

/*
Usage:

//??????????
var MongoDB = require('./mongodb');

//????????????
MongoDB.findOne('user_info', {_id: user_id}, function (err, res) {
    console.log(res);
});

//????????????
MongoDB.find('user_info', {type: 1}, {}, function (err, res) {
    console.log(res);
});

//??????????????????????
MongoDB.updateData('user_info', {_id: user_info._id}, {$set: update_data}, function(err, user_info) {
      callback(null, user_info);
});

//????????
MongoDB.remove('user_data', {user_id: 1});

*/

/*
config/table.json:
{
	"user_stats_data": {
        "user_id": "Number",
        "platform": "Number",
        "user_first_time": "Number",
        "create_time": "Number"
    },
    "room_data": {
        "room_id": "String",
        "room_type": "Number",
        "user_id": "Number",
        "player_num": "Number",
        "diamond_num": "Number",
        "normal_settle": "Number",
        "single_settle": "Number",
        "create_time": "Number"
    },
    "online_data": {
        "server_id": "String",
        "pf": "Number",
        "player_num": "Number",
        "room_list": "String",
        "update_time": "Number"
    }
}
*/
