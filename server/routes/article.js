const Router = require('koa-router');
const articleController = require('../app/controller/articleController');

let router = new Router();
let name = articleController.name;

router.get('/' + name + '/getAllByPage', articleController.getArticleList);
router.get('/' + name + '/getOneById', articleController.getOneArticle);
router.post('/' + name + '/save', articleController.saveArticle);
router.post('/' + name + '/delete', articleController.deleteArticle);
router.post('/' + name + '/update', articleController.updateArticle);
router.get('/' + name + '/getByAuthor', articleController.getArticleByAuthor);
router.get('/' + name + '/getByChannel', articleController.getArticleByChannel);
router.get('/' + name + '/getAdjacent', articleController.getAdjacentArticle);
router.get('/' + name + '/getByKeyword', articleController.getArticleByKeyword);
router.get('/' + name + '/like', articleController.likeArticle);
router.get('/' + name + '/getCount', articleController.getArticleCount);
router.get('/' + name + '/getArticles', articleController.getArticles);
router.get('/' + name + '/getAll', articleController.getAllArticles);
router.post('/' + name + '/recArticle', articleController.recArticle);
router.get('/' + name + '/getArticleRec', articleController.getArticleAboutRec);
router.get('/' + name + '/getHomeTopRec', articleController.getHomeRecArticleAndAlbum);
router.get('/' + name + '/getArchiveArticleByChannel', articleController.getByChannelAndAuthorNoLimit);
router.get('/' + name + '/getArchiveArticleByTag', articleController.getByTagAndAuthorNoLimit);

module.exports = router;
