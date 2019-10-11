const forumServer = require('../server/forumServer');
const CONSTANTS = require('../constants');


class ForumController {
    constructor () {
        this.name = 'forum';
    }

    async getForums (ctx) {
        let result = new Map();
        try {
            let data = await forumServer.getForums(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
            result.set('data', data.data);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async getForumDetail (ctx) {
        let result = new Map();
        try {
            let data = await forumServer.getForumDetail(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
            result.set('data', data.data);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async addForum (ctx) {
        let result = new Map();
        try {
            let data = await forumServer.addForum(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }

    async updateForum (ctx) {
        let result = new Map();
        try {
            let data = await forumServer.updateForum(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }
}

module.exports = new ForumController();
