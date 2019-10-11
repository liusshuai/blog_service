const boardServer = require('../server/boardServer');
const CONSTANTS = require('../constants');

class uploadController {
    constructor () {
        this.name = 'board'
    }

    async getBoards (ctx) {
        let result = new Map();
        try {
            let data = await boardServer.getBoards(ctx);

            result.set('code', data.code);
            result.set('data', data.data);
            result.set('msg', data.msg);
        } catch (error) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }

        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async getChildBoards (ctx) {
        let result = new Map();
        try {
            let data = await boardServer.getChildBoards(ctx);

            result.set('code', data.code);
            result.set('data', data.data);
            result.set('msg', data.msg);
        } catch (error) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }

        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async deleteBoard (ctx) {
        let result = new Map();
        try {
            let data = await boardServer.deleteBoard(ctx);

            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (error) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }

        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }

    async addBoard (ctx) {
        let result = new Map();
        try {
            let data = await boardServer.addBoard(ctx);

            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (error) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }

        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }
}

module.exports = new uploadController();