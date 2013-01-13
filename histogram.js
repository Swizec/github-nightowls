
var db = require('./lib/db'),
    mongo = require('mongodb'),
    format = require('util').format,
    _ = require('underscore');

var normalise = function (histogram) {
    var max = _.max(histogram);

    _.keys(histogram).forEach(function (key) {
        histogram[key] = histogram[key]/max;
    });

    return histogram;
};

var histogram = function (key, callback) {

    var histogram = {};

     mongo.Db.connect(
        format("mongodb://%s:%s/github-nightowls?w=1", 'localhost', 27017),
        function(err, _db) {
            
            var punchcards = _db.collection('punchcards');

            punchcards.find().each(function (err, punchcard) {
                if (!err && !punchcard) {
                    console.log("Done!");

                    callback(histogram);
                    return;
                }

                if (err || !punchcard.data) {
                    console.log('Error', err);
                    console.log(punchcard);
                    return;
                }
                
                punchcard.data.forEach(function (entry) {
                    var hour = entry[key],
                        count = entry[2];

                    histogram[hour] = histogram[hour] ? histogram[hour]+count : count;
                });

                console.log("Histogram'd "+punchcard.repo);
            });
        });

};

({days: function () { histogram(0, console.log); },
  hours: function () { histogram(1, console.log); }
})[process.argv[2]]();
