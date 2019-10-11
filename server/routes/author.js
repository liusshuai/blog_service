const Router = require('koa-router');
const authorController = require('../app/controller/authorController');

let router = new Router();
let name = authorController.name;

router.post('/' + name + '/login', authorController.login);
router.get('/' + name + '/logout', authorController.logout);
router.post('/' + name + '/register', authorController.register);
router.get('/' + name + '/getInfo', authorController.getInfo);
router.get('/' + name + '/getAdminInfo', authorController.getAdminInfo);
router.get('/' + name + '/getAll', authorController.getAllAuthor);
router.get('/' + name + '/getAdmin', authorController.getLoginType);
router.post('/' + name + '/updateInfo', authorController.updateInfo);
router.get('/' + name + '/getRec', authorController.getRecAuthor);
router.get('/' + name + '/searchAuthor', authorController.getAuthorByKey);
router.post('/' + name + '/sendIdentifyCode', authorController.SendIdentifyCode);
router.post('/' + name + '/recuser', authorController.recuser);
router.post('/' + name + '/lockuser', authorController.lockuser);
router.post('/' + name + '/changepassword', authorController.changePassword);
router.post('/' + name + '/changepassword_notforget', authorController.not_forget_changePassword);

module.exports = router;
