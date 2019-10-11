const Router = require('koa-router');
const albumController = require('../app/controller/albumController');

let router = new Router();
let name = albumController.name;

router.get('/' + name + '/getRec', albumController.getRecAlbum);
router.get('/' + name + '/getDetail', albumController.getAlbumDetail);
router.get('/' + name + '/getAll', albumController.getAllAlbum);
router.get('/' + name + '/getByChannel', albumController.getAlbumByChannel);
router.get('/' + name + '/getByAuthor', albumController.getAlbumByAuthor);
router.get('/' + name + '/getByKey', albumController.getAlbumByKey);
router.get('/' + name + '/getAboutRec', albumController.getAlbumAbouRec);
router.get('/' + name + '/like', albumController.likeAlbum);
router.post('/' + name + '/add', albumController.addAlbum);
router.post('/' + name + '/delete', albumController.deleteAlbum);
router.post('/' + name + '/update', albumController.updateAlbum);

module.exports = router;
