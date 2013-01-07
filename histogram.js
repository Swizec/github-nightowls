
var db = require('./lib/db'),
    _ = require('underscore');

var normalise = function (histogram) {
    var max = _.max(histogram);

    _.keys(histogram).forEach(function (key) {
        histogram[key] = histogram[key]/max;
    });

    return histogram;
};

var histogram = function (callback) {

    var histogram = {};

    db.models.punchcard.find({}, function (err, punchcards) {
        punchcards.forEach(function (punchcard) {
            punchcard.data.forEach(function (entry) {
                var hour = entry[1],
                    count = entry[2];

                histogram[hour] = histogram[hour] ? histogram[hour]+count : count;
            });
        });

        callback(histogram);
    });

};

histogram(console.log);
