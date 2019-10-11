const homeServer = require('../flutter_server/f_home_server');
const CONSTANTS = require('../constants');

class HomeController {
    constructor () {
        this.name = 'home';
    }

    async getArticleAndAlbum(ctx) {
        let result = new Map();
        try {
            const data = await homeServer.getArticleAndAlbum(ctx);
            result.set('data', data);
            result.set('code', CONSTANTS.SUCCESS_CODE);
            result.set('msg', CONSTANTS.SUCCESS_MSG);
        } catch (err) {
            console.log(err)
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            data: result.get('data'),
            code: result.get('code'),
            msg: result.get('msg')
        };
    }
}

module.exports = new HomeController();


