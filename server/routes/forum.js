const Router = require('koa-router');
const forumController = require('../app/controller/forumController');

let router = new Router();
let name = forumController.name;

router.get('/' + name + '/getForums', forumController.getForums);
router.get('/' + name + '/getDetail', forumController.getForumDetail);
router.post('/' + name + '/addForum', forumController.addForum);
router.post('/' + name + '/updateForum', forumController.updateForum);

module.exports = router;
