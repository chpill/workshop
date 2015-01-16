
var fs = require('fs'),
    thunkify = require('thunkify');

/**
 * Create a yieldable version of `fs.stat()`:
 *
 *   app.use(function* () {
 *     var stats = yield exports.stat(__filename);
 *   })
 *
 * Hint: you can return a yieldable.
 */

exports.stat = function (filename) {
  return function (done){
    fs.stat(filename, function(err, stats){
      done(err, stats);
    })
  };

};

// Let's check out thunkify... This works!
//exports.stat = thunkify(fs.stat);


/**
 * Create a yieldable version of `fs.exists()`:
 *
 *
 *   app.use(function* () {
 *     var exists = yield exports.exists(__filename);
 *   })
 *
 * Note that `fs.exists()` simply wraps `fs.stat()`.
 * If `fs.stat()` does not return an error, then the file exists!
 *
 * Hint: don't use fs.exists() as it's not a proper callback.
 * In other words, the first argument returned in its callback
 * is not an error object, unlike node callbacks.
 */

exports.exists = function (filename) {
  return function(done){
    fs.stat(filename, function(err, _){
      if (err)
        done (null, false);
      else
        done(null, true);
    });
  };
};

// This does not work, the previous notice was true...
//exports.exists = thunkify(fs.exists);
