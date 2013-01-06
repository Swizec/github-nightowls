
var chai = require('chai'),
    mocha = require('mocha'),
    should = chai.should();

var db = require('../lib/db.js');


describe("DB", function () {

    beforeEach(function (done) {
        db.models.repo.remove({}, function () {
            db.models.punchcard.remove({}, function () {
                done();
            });
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
    

    it("stores a punchcard", function (done) {
        db.punchcards("Swizec/nightowls", punchcard_fixture, function (err) {
            db.models.punchcard.find({}, function (err, punchcards) {
                punchcards.length.should.equal(1);
                
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

var punchcard_fixture = [ [ 0, 0, 1 ],
  [ 0, 1, 0 ],
  [ 0, 2, 0 ],
  [ 0, 3, 0 ], 
  [ 0, 4, 0 ],
  [ 0, 5, 0 ],
  [ 0, 6, 0 ],
  [ 0, 7, 0 ],
  [ 0, 8, 0 ],
  [ 0, 9, 0 ],
  [ 0, 10, 0 ],
  [ 0, 11, 0 ],
  [ 0, 12, 1 ],
  [ 0, 13, 0 ],
  [ 0, 14, 2 ],
  [ 0, 15, 2 ],
  [ 0, 16, 1 ],
  [ 0, 17, 0 ],
  [ 0, 18, 1 ],
  [ 0, 19, 0 ],
  [ 0, 20, 0 ],
  [ 0, 21, 0 ],
  [ 0, 22, 0 ],
  [ 0, 23, 1 ],
  [ 1, 0, 1 ],
  [ 1, 1, 1 ],
  [ 1, 2, 0 ],
  [ 1, 3, 0 ],
  [ 1, 4, 0 ],
  [ 1, 5, 0 ],
  [ 1, 6, 0 ],
  [ 1, 7, 0 ],
  [ 1, 8, 0 ],
  [ 1, 9, 0 ],
  [ 1, 10, 0 ],
  [ 1, 11, 0 ],
  [ 1, 12, 2 ],
  [ 1, 13, 0 ],
  [ 1, 14, 0 ],
  [ 1, 15, 0 ],
  [ 1, 16, 0 ],
  [ 1, 17, 0 ],
  [ 1, 18, 0 ],
  [ 1, 19, 2 ],
  [ 1, 20, 0 ],
  [ 1, 21, 0 ],
  [ 1, 22, 0 ],
  [ 1, 23, 0 ],
  [ 2, 0, 0 ],
  [ 2, 1, 0 ],
  [ 2, 2, 0 ],
  [ 2, 3, 1 ],
  [ 2, 4, 0 ],
  [ 2, 5, 0 ],
  [ 2, 6, 0 ],
  [ 2, 7, 0 ],
  [ 2, 8, 0 ],
  [ 2, 9, 0 ],
  [ 2, 10, 0 ],
  [ 2, 11, 2 ],
  [ 2, 12, 1 ],
  [ 2, 13, 1 ],
  [ 2, 14, 0 ],
  [ 2, 15, 1 ],
  [ 2, 16, 0 ],
  [ 2, 17, 0 ],
  [ 2, 18, 1 ],
  [ 2, 19, 1 ],
  [ 2, 20, 0 ],
  [ 2, 21, 0 ],
  [ 2, 22, 0 ],
  [ 2, 23, 1 ],
  [ 3, 0, 0 ],
  [ 3, 1, 0 ],
  [ 3, 2, 0 ],
  [ 3, 3, 0 ],
  [ 3, 4, 0 ],
  [ 3, 5, 0 ],
  [ 3, 6, 0 ],
  [ 3, 7, 0 ],
  [ 3, 8, 0 ],
  [ 3, 9, 0 ],
  [ 3, 10, 0 ],
  [ 3, 11, 0 ],
  [ 3, 12, 0 ],
  [ 3, 13, 1 ],
  [ 3, 14, 0 ],
  [ 3, 15, 0 ],
  [ 3, 16, 0 ],
  [ 3, 17, 0 ],
  [ 3, 18, 0 ],
  [ 3, 19, 0 ],
  [ 3, 20, 0 ],
  [ 3, 21, 0 ],
  [ 3, 22, 1 ],
  [ 3, 23, 1 ],
  [ 4, 0, 1 ],
  [ 4, 1, 0 ],
  [ 4, 2, 0 ],
  [ 4, 3, 0 ],
  [ 4, 4, 0 ],
  [ 4, 5, 0 ],
  [ 4, 6, 0 ],
  [ 4, 7, 0 ],
  [ 4, 8, 0 ],
  [ 4, 9, 0 ],
  [ 4, 10, 0 ],
  [ 4, 11, 0 ],
  [ 4, 12, 0 ],
  [ 4, 13, 0 ],
  [ 4, 14, 0 ],
  [ 4, 15, 0 ],
  [ 4, 16, 0 ],
  [ 4, 17, 0 ],
  [ 4, 18, 0 ],
  [ 4, 19, 0 ],
  [ 4, 20, 2 ],
  [ 4, 21, 0 ],
  [ 4, 22, 1 ],
  [ 4, 23, 0 ],
  [ 5, 0, 0 ],
  [ 5, 1, 0 ],
  [ 5, 2, 1 ],
  [ 5, 3, 1 ],
  [ 5, 4, 0 ],
  [ 5, 5, 0 ],
  [ 5, 6, 0 ],
  [ 5, 7, 0 ],
  [ 5, 8, 0 ],
  [ 5, 9, 0 ],
  [ 5, 10, 0 ],
  [ 5, 11, 0 ],
  [ 5, 12, 1 ],
  [ 5, 13, 0 ],
  [ 5, 14, 0 ],
  [ 5, 15, 0 ],
  [ 5, 16, 0 ],
  [ 5, 17, 0 ],
  [ 5, 18, 0 ],
  [ 5, 19, 0 ],
  [ 5, 20, 0 ],
  [ 5, 21, 0 ],
  [ 5, 22, 0 ],
  [ 5, 23, 1 ],
  [ 6, 0, 0 ],
  [ 6, 1, 0 ],
  [ 6, 2, 0 ],
  [ 6, 3, 0 ],
  [ 6, 4, 0 ],
  [ 6, 5, 0 ],
  [ 6, 6, 0 ],
  [ 6, 7, 0 ],
  [ 6, 8, 0 ],
  [ 6, 9, 0 ],
  [ 6, 10, 0 ],
  [ 6, 11, 0 ],
  [ 6, 12, 0 ],
  [ 6, 13, 1 ],
  [ 6, 14, 0 ],
  [ 6, 15, 0 ],
  [ 6, 16, 0 ],
  [ 6, 17, 3 ],
  [ 6, 18, 0 ],
  [ 6, 19, 0 ],
  [ 6, 20, 1 ],
  [ 6, 21, 1 ],
  [ 6, 22, 0 ],
  [ 6, 23, 0 ] ];
