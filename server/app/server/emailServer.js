const emailModel = require('../model/emailModel');
const authorModel = require('../model/authorModel');
const CONSTANTS = require('../constants');
const util = require('../util');

class EmailServer {
    constructor() {}

    async getMySend (ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }
        const page = ctx.query.page || 1;
        const limit = 20;
        const list = await emailModel.findAll({
            where: { authorId: ctx.session.user.id },
            order: [['time', 'DESC']],
            limit,
            offset: (page - 1) * limit
        });

        const total = await emailModel.count({
            where: { authorId: ctx.session.user.id }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: { total, list}
        }
    }

    async getMyRecieve(ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }
        const page = ctx.query.page || 1;
        const limit = 20;
        authorModel.hasMany(emailModel);
        emailModel.belongsTo(authorModel);
        const list = await emailModel.findAll({
            where: { reciver: ctx.session.user.id },
            include: [{
                model: authorModel,
                attributes: ['id', 'nickname']
            }],
            order: [['time', 'DESC']],
            limit,
            offset: (page - 1) * limit
        });

        const total = await emailModel.count({
            where: { reciver: ctx.session.user.id }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: { total, list }
        }
    }

    async sendMessage(ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }
        const params = ctx.request.body;
        const users = JSON.parse(params.recivers);
        let user = {};
        for (let i = 0; i < users.length; i++) {
            user = await authorModel.findOne({
                where: { nickname: users[i] }
            });

            await emailModel.create({
                authorId: ctx.session.user.id,
                content: params.content,
                reciver: user.id,
                rname: users[i]
            });
        }

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        }
    }

    async getNotReadCount (ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }
        const count = await emailModel.count({
            where: {
                reciver: ctx.session.user.id,
                isread: 0
            }
        });
        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: count
        }
    }

    async readMail (ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }
        await emailModel.update({
            isread: 1
        }, {
            where: { id: ctx.query.mid }
        });
        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        }
    }
}

module.exports = new EmailServer();