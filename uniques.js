
var db = require('./lib/db'),
    redis = require('redis');


db.repos(function (err, repos) {
    console.log(repos.count());
});
