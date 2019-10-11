const Router = require('koa-router');
const emailController = require('../app/controller/emailController');

let router = new Router();
let name = emailController.name;

router.post('/' + name + '/sendmess', emailController.sendMessage);
router.get('/' + name + '/getmysend', emailController.getMySend);
router.get('/' + name + '/getmyrecieve', emailController.getMyRecieve);
router.get('/' + name + '/getnotread', emailController.getNotReadCount);
router.get('/' + name + '/readmail', emailController.readMail);

module.exports = router;
