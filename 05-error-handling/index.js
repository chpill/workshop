
var koa = require('koa');

var app = module.exports = koa();

app.use(function* errorHandler(next) {
  try {
    yield next;
  } catch (err) {
    this.response.status = 500;
    this.response.body = 'internal server error';
    app.emit('error', err);
  }
});

app.use(function* () {
  throw new Error('boom!');
});
