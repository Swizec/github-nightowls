
var chai = require('chai'),
    mocha = require('mocha'),
    should = chai.should();

var fetching = require('../lib/fetching.js');

describe("Fetching", function () {

    it("gets a page of repositories", function (done) {
        fetching.repos(1, function (err, data) {
            data.should.be.an.instanceof(Array);
            data.length.should.equal(100);

            done();
        });
    });

    it("gets a punchcard", function (done) {
        fetching.punchcard('Swizec/nightowls', function (err, punchcard) {
            punchcard.should.be.an.instanceof(Array);

            done();
        });
    });

});
