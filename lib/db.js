
var mongoose = require('mongoose');

var db = exports._db = mongoose.createConnection('localhost', 'github-nightowls');

var models = exports.models = {
    'repo': db.model('repo', new mongoose.Schema({
        "type": String,
        "pushed_at": Date,
        "pushed": Date,
        "forks": Number,
        "owner": String,
        "description": String,
        "created": Date,
        "language": String,
        "fork": Boolean,
        "followers": Number,
        "size": Number,
        "created_at": Date,
        "name": String,
        "private": Boolean,
        "watchers": Number,
        "username": String
    }))
};

var repos = exports.repos = function (repos, callback) {
    callback = typeof repos == 'function' ? repos : callback ? callback : function () {};

    if (repos.map) {
        repos.map(function (repo) {
            var r = new models.repo(repo);
            
            r.save();
        });

        callback(null);
    }else{
        models.repo.find({}, callback);
    }
};