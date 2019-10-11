const Router = require('koa-router');
const boardController = require('../app/controller/boardController');

let router = new Router();
let name = boardController.name;

router.get('/' + name + '/getboards', boardController.getBoards);
router.get('/' + name + '/getchildboards', boardController.getChildBoards);
router.post('/' + name + '/delete', boardController.deleteBoard);
router.post('/' + name + '/add', boardController.addBoard);

module.exports = router;
