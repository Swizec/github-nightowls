
var db = require('./lib/db'),
    fetching = require('./lib/fetching');

var inc_timeout = function (timeout) {
    if (!timeout) {
        timeout = 1000;
    }else if (timeout < 3600) {
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
    db.models.repo.find({}, function (err, repos) {
        repos.map(function (repo) {
            var name = repo.owner+'/'+repo.name;
            fetching.punchcard(name, function (err, punchcard) {
                db.punchcards(name, punchcard, function () {
                    console.log("Saved punchcard "+name);
                });
            });
        });
    });
};

({repos: function () { scrape_repos(1); },
  punchcards: punchcards})[process.argv[2]]();
