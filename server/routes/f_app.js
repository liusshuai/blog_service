const Router = require('koa-router');
const homeController = require('../app/flutter_controller/f_home_controller');
const commentController = require('../app/flutter_controller/f_comment_controller');
const userInfoChangeController = require('../app/flutter_controller/f_userinfo_change_controller');

const router = new Router();
const home = homeController.name;
const comment = commentController.name;
const change = userInfoChangeController.name;

// home
router.get('/' + home + '/getAppInfo', homeController.getAppVersion);
router.get('/' + home + '/getdata', homeController.getArticleAndAlbum);

// comment
router.get('/' + comment + '/getAlbumComments', commentController.getAlbumComments);
router.get('/' + comment + '/getArticleComments', commentController.getArticleComments);
router.get('/' + comment + '/getTweetComments', commentController.getTweetComments);
router.get('/' + comment + '/getChildComments', commentController.getChildComments);


// infochange
router.post('/' + change + '/changename', userInfoChangeController.changeNickname);
router.post('/' + change + '/changeintro', userInfoChangeController.changeIntro);

module.exports = router;
