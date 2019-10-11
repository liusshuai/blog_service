const userInfoChangeServer = require('../flutter_server/f_userinfo_change_server');
const CONSTANTS = require('../constants');

class UserInfoChangeController {
    constructor() {
        this.name = 'change';
    }

    async changeNickname(ctx) {
        let result = new Map();
        try {
            const data = await userInfoChangeServer.changeNickname(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            console.log(err)
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }


    async changeIntro(ctx) {
        let result = new Map();
        try {
            const data = await userInfoChangeServer.changeIntro(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            console.log(err)
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }
}

module.exports = new UserInfoChangeController();
