
var db = require('./lib/db'),
    fetching = require('./lib/fetching');

var scrape = function (page) {
    console.log("Fetching page: "+page);
    fetching.repos(page, function (err, repos) {
        db.repos(repos, function (err) {
            console.log("Stored "+repos.length+" repos.");
            scrape(page+1);
        });
    });
};

scrape(1);
