const homeServer = require('../flutter_server/f_home_server');
const CONSTANTS = require('../constants');
const fs = require('fs');
const path = require('path');

class HomeController {
    constructor () {
        this.name = 'home';
    }

    async getAppVersion(ctx) {
        let result = new Map();
        try {
            const appInfo = fs.readFileSync(path.join(__dirname, '../../config', 'app.json'), 'utf8');
            result.set('data', JSON.parse(appInfo));
            result.set('code', CONSTANTS.SUCCESS_CODE);
            result.set('msg', CONSTANTS.SUCCESS_MSG);
        } catch (error) {
            console.log(error);
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }

        ctx.body = {
            data: result.get('data'),
            code: result.get('code'),
            msg: result.get('msg')
        };
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


