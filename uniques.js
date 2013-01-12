
var mongo = require('mongodb'),
    redis = require('redis').createClient(),
    format = require('util').format;


mongo.Db.connect(
    format("mongodb://%s:%s/github-nightowls?w=1", 'localhost', 27017),
    function(err, db) {
        
        var repos = db.collection('repos');

        repos.find().each(function (err, repo) {
            if (err) {
                console.log(err);
                return;
            }

            var name = format('%s/%s', repo.owner, repo.name);
            
            redis.sadd("repositories", name);
            redis.incr("N_repos");

            console.log(name+" added to set");
        });
              
});
