const commentServer = require('../flutter_server/f_comment_server');
const CONSTANTS = require('../constants');

class CommentController {
    constructor() {
        this.name = 'comment';
    }

    async getAlbumComments(ctx) {
        let result = new Map();
        try {
            const data = await commentServer.getAlbumComments(ctx);
            result.set('data', data.data);
            result.set('code', data.code);
            result.set('msg', data.msg);
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

    async getArticleComments(ctx) {
        let result = new Map();
        try {
            const data = await commentServer.getArticleComments(ctx);
            result.set('data', data.data);
            result.set('code', data.code);
            result.set('msg', data.msg);
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

    async getChildComments(ctx) {
        let result = new Map();
        try {
            const data = await commentServer.getChildComments(ctx);
            result.set('data', data.data);
            result.set('code', data.code);
            result.set('msg', data.msg);
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

    async getTweetComments(ctx) {
        let result = new Map();
        try {
            const data = await commentServer.getTweetComments(ctx);
            result.set('data', data.data);
            result.set('code', data.code);
            result.set('msg', data.msg);
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

module.exports = new CommentController();


