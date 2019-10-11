const Router = require('koa-router');
const uploadController = require('../app/controller/uploadController');

let router = new Router();
let name = uploadController.name;

router.post('/' + name + '/upload', uploadController.uploadFile);

module.exports = router;
