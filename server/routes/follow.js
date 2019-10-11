const Router = require('koa-router');
const followController = require('../app/controller/followController');
const blogFollowController = require('../app/controller/blogFollowController');

let router = new Router();
let name = followController.name;

router.get('/' + name + '/getFollowList', followController.getFollowList);
router.get('/' + name + '/getConcernList', followController.getConcernList);
router.get('/' + name + '/getChannelConcerns', followController.getConcernChannels);
router.get('/' + name + '/getChannelFollowType', followController.getChannelFollowType);
router.get('/' + name + '/getAuthorFollowType', followController.getUserFollowType);
router.post('/' + name + '/deleteFollow', followController.deleteFollow);
router.post('/' + name + '/addFollow', followController.addFollow);
router.post('/' + name + '/unFollowChannel', followController.unFollowChannel);
router.post('/' + name + '/followChannel', followController.followChannel);

router.post('/' + name + '/follow', blogFollowController.follow);
router.get('/' + name + '/getMyFollow', blogFollowController.getMyFollow);
router.post('/' + name + '/remove', blogFollowController.removeFollow);

module.exports = router;
