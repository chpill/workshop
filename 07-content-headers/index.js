
var koa = require('koa');

var app = module.exports = koa();

app.use(function* () {
  if (this.request.is('application/json')){
    var body = this.response.body = {message: 'hi!'};
    this.response.type = 'application/json';
    this.response.length = Buffer.byteLength(body);
  }
  else {
    this.response.body = 'ok';
  }
})
