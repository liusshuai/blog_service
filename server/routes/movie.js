const Router = require('koa-router');
const movieController = require('../app/controller/movieController');

let router = new Router();
let name = movieController.name;

router.get('/' + name + '/getAll', movieController.getList);
router.get('/' + name + '/detail', movieController.getDetail);
router.post('/' + name + '/add', movieController.addMovie);
router.post('/' + name + '/update', movieController.updateMovie);
router.post('/' + name + '/remove', movieController.removeMovie);

module.exports = router;
