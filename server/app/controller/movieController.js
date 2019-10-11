const movieServer = require('../server/movieServer');
const CONSTANTS = require('../constants');

class MovieController {
    constructor () {
        this.name = 'movie';
    }

    async getList(ctx) {
        let result = new Map();
        try {
            const data = await movieServer.getList(ctx);
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

    async getDetail(ctx) {
        let result = new Map();
        try {
            const data = await movieServer.getDetail(ctx);
            if (data) {
                result.set('code', CONSTANTS.SUCCESS_CODE);
                result.set('msg', CONSTANTS.SUCCESS_MSG);
                result.set('data', data);
            } else {
                result.set('code', CONSTANTS.FAILD_CODE);
                result.set('msg', '资源不存在');
            }
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

    async addMovie(ctx) {
        let result = new Map();
        try {
            const data = await movieServer.addMovie(ctx);
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

    async updateMovie(ctx) {
        let result = new Map();
        try {
            const data = await movieServer.updateMovie(ctx);
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

    async removeMovie(ctx) {
        let result = new Map();
        try {
            const data = await movieServer.removeMovie(ctx);
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

module.exports = new MovieController();