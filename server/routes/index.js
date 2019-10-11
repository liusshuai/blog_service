const Router = require('koa-router');

const article = require('./article');
const author = require('./author');
const channel = require('./channel');
const tweet = require('./tweet');
const comment = require('./comment');
const upload = require('./upload');
const follow = require('./follow');
const board = require('./board');
const forum = require('./forum');
const breadcast = require('./breadcast');
const album = require('./album');
const email = require('./email');
const blogComment = require('./blogComment');
const movie = require('./movie');

const f_app = require('./f_app');

let router = new Router();
router.use('/api', article.routes(), article.allowedMethods());
router.use('/api', author.routes(), author.allowedMethods());
router.use('/api', channel.routes(), channel.allowedMethods());
router.use('/api', tweet.routes(), tweet.allowedMethods());
router.use('/api', comment.routes(), comment.allowedMethods());
router.use('/api', upload.routes(), upload.allowedMethods());
router.use('/api', follow.routes(), follow.allowedMethods());
router.use('/api', board.routes(), board.allowedMethods());
router.use('/api', forum.routes(), forum.allowedMethods());
router.use('/api', album.routes(), album.allowedMethods());
router.use('/api', email.routes(), email.allowedMethods());
router.use('/api', breadcast.routes(), breadcast.allowedMethods());
router.use('/api', blogComment.routes(), blogComment.allowedMethods());
router.use('/api', movie.routes(), movie.allowedMethods());

router.use('/api/app', f_app.routes(), f_app.allowedMethods());

module.exports = router;