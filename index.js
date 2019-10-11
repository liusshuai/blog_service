const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path');
const session = require('koa-session');
const fs = require('fs');

// const checkLogin  = require('./middleware/checkLogin.js');

const staticPath = './';

const app = new Koa();
app.keys = ['blossom'];
const CONFIG = {
    key: 'blossom',
    maxAge: 315360000000
};
app.use(session(CONFIG, app));
// app.use(checkLogin());
app.use(bodyParser());

app.use(static(
    path.join(__dirname, staticPath)
));


const router = require('./server/routes');

router.get('/admin/*', async (ctx, next) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./admin/index.html');
});

router.get('*', async ctx => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./index.html');
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
    console.log('connetion!');
});
