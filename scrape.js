
var db = require('./lib/db'),
    fetching = require('./lib/fetching');

var scrape_repos = function (page) {
    console.log("Fetching page: "+page);
    fetching.repos(page, function (err, repos) {
        db.repos(repos, function (err) {
            console.log("Stored "+repos.length+" repos.");
            scrape_repos(page+1);
        });
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
