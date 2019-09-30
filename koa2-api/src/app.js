const Koa = require('koa');
const config = require('config');
const cors = require('kcors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

// middleware
app.use(cors({ credentials: true }));
app.use(bodyParser())

app.listen(config.get('app.port'));

exports.module = app;
