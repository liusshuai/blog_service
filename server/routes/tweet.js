const Router = require('koa-router');
const tweetController = require('../app/controller/tweetController');

let router = new Router();
let name = tweetController.name;

router.get('/' + name + '/getTweetByPage', tweetController.getTweetByPage);
router.get('/' + name + '/getTweetByUser', tweetController.getTweetByUser);
router.get('/' + name + '/getTweetDetail', tweetController.getTweetDetail);
router.get('/' + name + '/getMyTweet', tweetController.getMyTweet);
router.get('/' + name + '/getMyConcernAuthorTweet', tweetController.getMyConcernAuthorsTweet);
router.post('/' + name + '/addTweet', tweetController.addTweet);
router.post('/' + name + '/likeTweet', tweetController.likeTweet);
router.post('/' + name + '/deleteTweet', tweetController.deleteTweet);


module.exports = router;
