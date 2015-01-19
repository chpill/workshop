
var koa = require('koa');
var jade = require('jade');
var path = require('path');
var thunkify = require('thunkify');

var app = module.exports = koa();

app.use(function* () {
  var filename = path.join(__dirname, 'homepage.jade'),
      renderThunk = thunkify(jade.renderFile);

  this.response.body = yield renderThunk(filename, {});
});
