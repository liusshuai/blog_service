const Router = require('koa-router');
const commentController = require('../app/controller/commentController');

let router = new Router();
let name = commentController.name;

router.get('/' + name + '/getboard', commentController.getBoardByUserAndPage);
router.get('/' + name + '/getArticleComment', commentController.getCommentByArticleAndPage);
router.get('/' + name + '/getTweetComment', commentController.getCommentByTweetAndPage);
router.get('/' + name + '/getForumComment', commentController.getCommentByForumAndPage);
router.get('/' + name + '/getAlbumComment', commentController.getCommentByAlbumAndPage);
router.get('/' + name + '/getChildComment', commentController.getChildComments);
router.post('/' + name + '/addComment', commentController.addComment);
router.post('/' + name + '/addChildComment', commentController.addChildComment);
router.post('/' + name + '/deleteComment', commentController.deleteComment);
router.post('/' + name + '/deleteChildComment', commentController.deleteChildComment);

module.exports = router;
