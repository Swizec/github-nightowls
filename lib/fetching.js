
var github = require('octonode'),
    request = require('superagent');

exports.repos = function (page, callback) {
    page = page || 1;

    var client = github.client();

    client.get('/legacy/repos/search/a?start_page='+page, function (err, status, body) {
        if (err) return callback(err);

        callback(null, body.repositories);
    });
};

exports.punchcard = function (repo, callback) {
    var url = 'https://github.com/'+repo+'/graphs/punch-card-data';
    
    var handle_response = function (res) {
        if (res.status === 200) {
            callback(null, res.body);
        }else{
            // TODO: handle 202 
            if (res.status === 202) {
                setTimeout(function () { 
                    request.get(url, handle_response); 
                }, 1000);
            }else{
                console.log(res.status, url);
                if (res.status !== 404) {
                    callback(new Error('Punchcard problem'));
                }else{
                    callback(null);
                }
            }
        }
    };                      
    
    request.get(url, handle_response);
};
