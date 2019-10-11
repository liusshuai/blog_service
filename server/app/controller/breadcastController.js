const breadcastServer = require('../server/breadcastServer');
const CONSTANTS = require('../constants');

class breadcastController {
    constructor () {
        this.name = 'breadcast'
    }

    async getBreadcast (ctx) {
        let result = new Map();
        try {
            let data = await breadcastServer.getBreadcast(ctx);

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

    async addBreadcast (ctx) {
        let result = new Map();
        try {
            let data = await breadcastServer.addBreadcast(ctx);

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

    async delBreadcast (ctx) {
        let result = new Map();
        try {
            let data = await breadcastServer.delBreadcast(ctx);

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

module.exports = new breadcastController();