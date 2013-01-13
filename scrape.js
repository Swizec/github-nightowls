
var db = require('./lib/db'),
    mongo = require('mongodb'),
    redis = require('redis').createClient(),
    format = require('util').format,
    fetching = require('./lib/fetching');

var inc_timeout = function (timeout) {
    if (!timeout) {
        timeout = 1000;
    }else if (timeout < 3600000) {
        timeout *= 60;
    }else{
        timeout *= 2;
    }
    
    return timeout;
};

var scrape_repos = function (page, timeout) {
    console.log("Fetching page: "+page);
    fetching.repos(page, function (err, repos) {
        if (err) {
            if (err.status == 403) {
                timeout = inc_timeout(timeout);

                console.log("API limit");
                console.log("Timing out for ", timeout/1000);

                setTimeout(function () {
                    scrape_repos(page, timeout);
                }, timeout);
            }
        }else{
            db.repos(repos, function (err) {
                console.log("Stored "+repos.length+" repos.");
                scrape_repos(page+1, 0);
            });
        }
    });
};

var punchcards = function () {

    mongo.Db.connect(
        format("mongodb://%s:%s/github-nightowls?w=1", 'localhost', 27017),
        function(err, _db) {
            
            var repos = _db.collection('repos'),
                punchcards = _db.collection('punchcards');
            
            repos.find().each(function (err, repo) {
                if (err || !repo) {
                    console.log("Error at "+(new Date()));
                    console.log(err);
                    return;
                }

                var name = repo.owner+'/'+repo.name;

                redis.sismember('processed', name, function (err, ismember) {
                    if (!ismember) {
                        
                        fetching.punchcard(name, function (err, punchcard) {
                            punchcards.insert({repo: name, data: punchcard}, function (err) {
                                if (err) {
                                    console.log("Error saving at "+(new Date()));
                                    console.log(err);
                                    return;
                                }

                                redis.multi()
                                    .sadd('processed', name)
                                    .incr('N_processed')
                                    .exec(function (err) {
                                        console.log((new Date())+" punchcard "+name);
                                    });      
                            });
                        });

                    }else{
                        console.log("skipped "+name);
                    }
                });
            });
        });
};

// used to fix state in redis
var count_cards = function () {
    redis.multi()
        .del('processed')
        .del('N_processed').exec(function () {
            mongo.Db.connect(
                format("mongodb://%s:%s/github-nightowls?w=1", 'localhost', 27017),
                function(err, _db) {
                    
                    var punchcards = _db.collection('punchcards');
                    
                    punchcards.find().each(function (err, punchcard) {
                        if (!err && !punchcard) {
                            console.log("Done!");
                            return;
                        }
                        
                        redis.multi()
                            .sadd('processed', punchcard.repo)
                            .incr('N_processed')
                            .exec(function (err) {
                                console.log((new Date())+" counted "+punchcard.repo);
                            });
                    });
                });
        });
};

({repos: function () { scrape_repos(1); },
  punchcards: punchcards,
  count: count_cards})[process.argv[2]]();
