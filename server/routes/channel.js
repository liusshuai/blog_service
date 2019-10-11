const Router = require('koa-router');
const channelController = require('../app/controller/channelController');

let router = new Router();
let name = channelController.name;

router.get('/' + name + '/getAllChannel', channelController.getAllChannel);
router.get('/' + name + '/getChannelById', channelController.getChannelById);
router.get('/' + name + '/getChannelByKey', channelController.getChannelByKey);
router.get('/' + name + '/getChannelCountByAuthor', channelController.getChannelCountByAuthor);
router.post('/' + name + '/addChannel', channelController.addChannel);
router.post('/' + name + '/deleteChannel', channelController.deleteChannel);
router.post('/' + name + '/updateChannel', channelController.updateChannelInfo);
router.get('/' + name + '/getChannelByAuthor', channelController.getChannelByAuthor);
router.get('/' + name + '/getChannelByType', channelController.getChannelByType);
router.get('/' + name + '/getArchive', channelController.getArchives);

module.exports = router;
