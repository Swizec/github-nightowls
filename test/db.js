
var chai = require('chai'),
    mocha = require('mocha'),
    should = chai.should();

var db = require('../lib/db.js');


describe("DB", function () {

    beforeEach(function (done) {
        db.models.repo.remove({}, function () {
            done();
        });
    });
    
    it("stores a list of repos", function (done) {
        db.repos(repos_fixture, function (err) {
            db.models.repo.find({}, function (err, repos) {
                repos.length.should.equal(repos_fixture.length);
                
                done();
            });
        });
        
    });

    it("returns a list of repos", function (done) {
        db.repos(repos_fixture, function (err) {
            db.repos(function (err, repos) {
                repos.length.should.be.above(0);

                done();
            });
        });
    });
        
});

var repos_fixture = [{
    "type": "repo",
    "pushed_at": "2012-02-07T07:33:15-08:00",
    "pushed": "2012-02-07T07:33:15-08:00",
    "forks": 0,
    "owner": "lb1a",
    "description": "import of existing avfs projekt into github",
    "created": "2012-02-07T07:32:13-08:00",
    "language": "C",
    "fork": false,
    "followers": 1,
    "size": 1068,
    "created_at": "2012-02-07T07:32:13-08:00",
    "name": "avfs",
    "private": false,
    "watchers": 1,
    "username": "lb1a"
},{
    "type": "repo",
    "pushed_at": "2012-04-21T04:27:19-07:00",
    "pushed": "2012-04-21T04:27:19-07:00",
    "forks": 0,
    "owner": "testxyzx",
    "description": "i can see",
    "created": "2012-04-21T04:27:19-07:00",
    "language": null,
    "fork": false,
    "followers": 1,
    "size": 0,
    "created_at": "2012-04-21T04:27:19-07:00",
    "name": "app",
    "private": false,
    "watchers": 1,
    "username": "testxyzx"
}];
