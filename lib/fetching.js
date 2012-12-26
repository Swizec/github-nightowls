
var github = require('octonode');

exports.repos = function (page, callback) {
    page = page || 1;

    var client = github.client();

    client.get('/legacy/repos/search/a?start_page='+page, function (err, status, body) {
        if (err) return callback(err);

        callback(null, body.repositories);
    });
};
