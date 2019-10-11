const blogFollowServer = require('../server/blogFollowServer');
const CONSTANTS = require('../constants');

class BlogFollowController {

    async follow(ctx) {
        let result = new Map();
        try {
            let data = await blogFollowServer.follow(ctx);
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

    async getMyFollow(ctx) {
        let result = new Map();
        try {
            const res = await blogFollowServer.getMyFollow(ctx);
            result.set('code', res.code);
            result.set('msg', res.msg);
            result.set('data', res.data);
        } catch (err) {
            console.log(err)
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async removeFollow(ctx) {
        let result = new Map();
        try {
            let data = await blogFollowServer.removeFollow(ctx);
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

module.exports = new BlogFollowController();