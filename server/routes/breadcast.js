const Router = require('koa-router');
const breadcastController = require('../app/controller/breadcastController');

let router = new Router();
let name = breadcastController.name;

router.get('/' + name + '/getbreadcast', breadcastController.getBreadcast);
router.post('/' + name + '/delete', breadcastController.delBreadcast);
router.post('/' + name + '/add', breadcastController.addBreadcast);

module.exports = router;
