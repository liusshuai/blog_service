const breadcastModel = require('../model/breadcastModel');
const CONSTANTS = require('../constants');
const util = require('../util');

class BreadcastServer {
    constructor () {}

    async getBreadcast (ctx) {
        let data = await breadcastModel.findAll({
            order: [
                ['time', 'DESC']
            ]
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: data
        }
    }

    async addBreadcast (ctx) {
        if (util.checkSession(ctx)) {
            if (util.checkAdmin(ctx.session.user)) {
                const params = ctx.request.body;
                await breadcastModel.create({
                    content: params.content
                });
                return {
                    code: CONSTANTS.SUCCESS_CODE,
                    msg: CONSTANTS.SUCCESS_MSG
                }
            } else {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: CONSTANTS.NO_PERMISSION
                }
            }
        } else {
            return util.notLoginResponse();
        }
    }

    async delBreadcast (ctx) {
        if (util.checkSession(ctx)) {
            if (util.checkAdmin(ctx.session.user)) {
                await breadcastModel.destroy({
                    where: {
                        id: ctx.request.body.id
                    }
                });

                return {
                    code: CONSTANTS.SUCCESS_CODE,
                    msg: CONSTANTS.SUCCESS_MSG
                }
            } else {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: CONSTANTS.NO_PERMISSION
                }
            }
        } else {
            return util.notLoginResponse();
        }
    }
}

module.exports = new BreadcastServer();