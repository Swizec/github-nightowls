
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

var histogram = function (key, filter, callback) {
    if (arguments.length < 3) {
        callback = arguments[1];
        filter = null;
    }

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

                if (!punchcard.data.forEach) {
                    console.log('Strange error');
                    console.log(punchcard);
                    return;
                }

                if(filter && !filter(punchcard)) {
                    console.log('Filtering out', punchcard.repo);
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

var weekend_commits = function (punchcard) {
    return punchcard.filter(function (entry) { // get weekend days with N > 0
        var day = entry[0], hour = entry[1], N = entry[2];

        return (day == 0 || day == 6) && N > 0;
    }).length > 0;
};

var no_weekend_commits = function (punchcard) {
    return !weekend_commits(punchcard);
};



({days: function () { histogram(0, console.log); },
  hours: function () { histogram(1, console.log); },
  weekends: function () { histogram(1, weekend_commits, console.log); },
  noweekends: function () { histogram(1, no_weekend_commits, console.log); }
})[process.argv[2]]();
