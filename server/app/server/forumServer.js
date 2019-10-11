const forumModel = require('../model/forumModel');
const authorModel = require('../model/authorModel');
const CONSTANTS = require('../constants');
const util = require('../util');

let limit = CONSTANTS.FORUM_LIMIT;

class ForumServer {
    constructor () {}

    async getForums (ctx) {
        let page = ctx.query.page || 1;
        limit = parseInt(ctx.query.limit || limit);
        let offset = (page - 1) * limit;
        const where = {};
        if (ctx.query.author) {
            where.authorId = ctx.query.author;
        }
        if (util.checkSession(ctx)) {
            authorModel.hasMany(forumModel);
            forumModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });
           
            let data = await forumModel.findAll({
                where,
                attributes: { exclude: ['content'] },
                include: [{
                    model: authorModel,
                    attributes: ['id', 'nickname']
                }],
                order: [
                    ['top', 'DESC'],
                    ['choice', 'DESC'],
                    ['pubtime', 'DESC']
                ],
                limit,
                offset
            });
                
            let total = await forumModel.count({where});

            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: {data, total}
            }
        } else {
            return util.notLoginResponse();
        }
    }

    async getForumDetail (ctx) {
        if (util.checkSession(ctx)) {
            authorModel.hasMany(forumModel);
            forumModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });
            let data = await forumModel.findOne({
                where: {id: ctx.query.id},
                include: [{
                    model: authorModel,
                    attributes: ['id', 'nickname']
                }]
            });

            // 更新帖子的浏览次数
            if (!ctx.query.edit) {
                await forumModel.update({
                    views: data.views + 1
                }, {
                    where: { id: ctx.query.id }
                });
            }
                
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: data
            }
        } else {
            return util.notLoginResponse();
        }
    }

    async addForum (ctx) {
        const params = ctx.request.body;

        if (util.checkSession(ctx)) {
            await forumModel.create({
                title: params.title,
                content: params.content,
                authorId: ctx.session.user.id
            });
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        } else {
            return util.notLoginResponse();
        }
    } 
    
    async updateForum (ctx) {
        if (util.checkSession(ctx)) {
            const params = ctx.request.body;
            const id = params.id;
            delete params.id;
            if (params.edit) { // 当更改帖子主题内容时需要同时更新时间
                delete params.edit;
                params.pubtime = new Date();
            }
            await forumModel.update(params, {
                where: { id }
            });

            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        } else {
            return util.notLoginResponse();
        }
    }
}

module.exports = new ForumServer();