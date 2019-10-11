const blogCommentServer = require('../server/blogCommentServer');
const CONSTANTS = require('../constants');

class BlogCommentController {
    constructor() {
        this.name = 'blogComment';
    }

    async getCommentByArticle(ctx) {
        let result = new Map();
        try {
            const data = await blogCommentServer.getCommentByArticle(ctx);
            result.set('code', CONSTANTS.SUCCESS_CODE);
            result.set('msg', CONSTANTS.SUCCESS_MSG);
            result.set('data', data);
        } catch (err) {
            console.log(err);
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }

        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async getCommentByTweet(ctx) {
        let result = new Map();
        try {
            const data = await blogCommentServer.getCommentByTweet(ctx);
            result.set('code', CONSTANTS.SUCCESS_CODE);
            result.set('msg', CONSTANTS.SUCCESS_MSG);
            result.set('data', data);
        } catch (err) {
            console.log(err);
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }

        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async getCommentByBoard(ctx) {
        let result = new Map();
        try {
            const data = await blogCommentServer.getCommentByBoard(ctx);
            result.set('code', CONSTANTS.SUCCESS_CODE);
            result.set('msg', CONSTANTS.SUCCESS_MSG);
            result.set('data', data);
        } catch (err) {
            console.log(err);
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }

        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async getCommentByMovie(ctx) {
        let result = new Map();
        try {
            const data = await blogCommentServer.getCommentByMovie(ctx);
            result.set('code', CONSTANTS.SUCCESS_CODE);
            result.set('msg', CONSTANTS.SUCCESS_MSG);
            result.set('data', data);
        } catch (err) {
            console.log(err);
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }

        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async addComment(ctx) {
        let result = new Map();
        try {
            const data = await blogCommentServer.addComment(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            console.log(err);
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }

        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }

    async removeComment(ctx) {
        let result = new Map();
        try {
            const data = await blogCommentServer.removeComment(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            console.log(err);
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }

        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }
}

module.exports = new BlogCommentController();