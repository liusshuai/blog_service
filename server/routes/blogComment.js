const Router = require('koa-router');
const commentController = require('../app/controller/blogCommentController');

let router = new Router();
let name = commentController.name;

router.get('/' + name + '/getByArticle', commentController.getCommentByArticle);
router.get('/' + name + '/getByTweet', commentController.getCommentByTweet);
router.get('/' + name + '/getByBoard', commentController.getCommentByBoard);
router.get('/' + name + '/getByMovie', commentController.getCommentByMovie);
router.post('/' + name + '/addComment', commentController.addComment);
router.post('/' + name + '/remove', commentController.removeComment);

module.exports = router;
