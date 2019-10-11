const followModel = require('../model/followModel');
const channelFollowModel = require('../model/channelFollowModel');
const channelModel = require('../model/channelModel');
const authorModel = require('../model/authorModel');
const CONSTANTS = require('../constants');
const util = require('../util');
const Sequelize = require('sequelize');

class FollowServer {
    constructor() { }

    /*  获取关注列表
        @params: 
            uid: 用户的id
        @return: 
            关注列表
    */
    async getFollowList(ctx) {
        let id = ctx.query.uid;
        let page = ctx.query.page || 1;
        let limit = CONSTANTS.FOLLOWER_LIMIT;
        let offset = (page - 1) * limit;
        authorModel.hasMany(followModel);
        followModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });
        let data = await followModel.findAll({
            where: {
                ownid: id
            },
            include: [{
                model: authorModel,
                attributes: { exclude: ['password', 'bgcover'] }
            }],
            offset,
            limit
        });

        let total = await followModel.count({
            where: {
                ownid: id
            }
        });

        if (data) {
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: { data, total }
            };
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_USER
            };
        }
    }

    /*  获取我关注的列表
        @params: 
            uid: 用户的id
        @return: 
            关注列表
    */
    async getConcernList(ctx) {
        let id = ctx.query.uid;
        let page = ctx.query.page || 1;
        let limit = CONSTANTS.FOLLOWER_LIMIT;
        let offset = (page - 1) * limit;
        authorModel.hasMany(followModel);
        followModel.belongsTo(authorModel, { foreignKey: 'ownid', targetKey: 'id' });
        let data = await followModel.findAll({
            where: { authorId: id },
            include: [{
                model: authorModel,
                attributes: { exclude: ['password', 'bgcover'] }
            }],
            offset,
            limit
        });

        let total = await followModel.count({ where: { authorId: id } });

        if (data) {
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: { data, total }
            };
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_USER
            };
        }
    }

    /*  取消关注用户
        @params: 
            id: 关注列表项id
        @return: 
            状态码
    */
    async deleteFollow(ctx) {
        if (util.checkSession(ctx)) {
            let params = ctx.request.body;

            let data = null;
            if (params.id) {
                data = await followModel.findByPk(params.id);
            } else {
                data = await followModel.findOne({
                    where: {
                        ownid: params.uid,
                        authorId: ctx.session.user.id
                    }
                });
            }

            if (!data.id) {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: CONSTANTS.NO_FOLLOW,
                }
            }

            if (data.ownid === ctx.session.user.id) { // 从我的粉丝列表中取消关注
                await followModel.destroy({
                    where: {
                        ownid: data.authorId,
                        authorId: data.ownid
                    }
                });
                data.each && await followModel.update({
                    each: 0
                }, {
                    where: { id: data.id }
                });

            } else { // 从我的关注列表中取消关注
                await followModel.destroy({
                    where: { id: data.id }
                });
                await followModel.update({
                    each: 0
                }, {
                    where: {
                        ownid: data.authorId,
                        authorId: data.ownid
                    }
                });
            }

            await authorModel.update({
                followers: Sequelize.literal('`followers` - 1')
            }, {
                where: { id: data.ownid }
            });

            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
            }
        } else {
            return util.notLoginResponse();
        }
    }

    /*  添加关注用户
        @params: 
            ownid: 被关注者id,
            authorId: 关注着id,
            type: 关注分组
        @return: 
            状态码
    */
    async addFollow(ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }
        
        let params = ctx.request.body;

        if (params.ownid == ctx.session.user.id) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: '不能关注自己哦'
            }
        }

        if (!params.authorId) {
            params.authorId = ctx.session.user.id;
        }

        const data = await followModel.findOne({
            where: {
                ownid: params.authorId,
                authorId: params.ownid
            }
        });
 
        if (data.id) {
            await followModel.update({
                each: 1
            }, {
                where: { 
                    ownid: params.authorId,
                    authorId: params.ownid
                }
            });
            params.each = 1;
        }
        
        await followModel.create(params);

        await authorModel.update({
            followers: Sequelize.literal('`followers` +1')
        }, {
            where: { id: params.ownid }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
        }
    }

    async getUserFollowType(ctx) {
        if (!util.checkSession(ctx)) {
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: false
            }
        }
        const params = ctx.query;
        const data = await followModel.findOne({
            where: {
                ownid: params.uid,
                authorId: ctx.session.user.id
            }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: !!(data && data.id)
        }
    }

    // 这下面就是频道关注操作了

    async getConcernChannels (ctx) {
        let id = ctx.query.uid;
        let page = ctx.query.page || 1;
        let limit = CONSTANTS.FOLLOWER_LIMIT;
        let offset = (page - 1) * limit;
        channelModel.hasMany(channelFollowModel);
        channelFollowModel.belongsTo(channelModel);
        let data = await channelFollowModel.findAll({
            where: { ownid: id },
            include: [{
                model: channelModel
            }],
            offset,
            limit
        });

        let total = await channelFollowModel.count({ where: { ownid: id } });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: { data, total }
        };
    }

    async unFollowChannel (ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }

        const params = ctx.request.body;
        let where = {};
        let data = null;
        if (params.cid) {
            data = await channelFollowModel.findOne({
                where: { ownid: ctx.session.user.id, channelId: params.cid }
            });
        } else {
            data = await channelFollowModel.findByPk(params.id);
        }

        if (!data) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_CHANNEL
            }
        }

        await channelFollowModel.destroy({ where: {id: data.id} });

        await channelModel.update({
            followers: Sequelize.literal('`followers` - 1')
        }, {
            where: { id: data.channelId }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
        }
    }

    async getChannelFollowType (ctx) {
        if (!util.checkSession(ctx)) {
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: false
            }
        }
        const params = ctx.query;
        const data = await channelFollowModel.findOne({
            where: {
                ownid: ctx.session.user.id,
                channelId: params.cid
            }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: !!(data && data.id)
        }
    }

    async followChannel (ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }

        const params = ctx.request.body;
        await channelFollowModel.create({
            ownid: ctx.session.user.id,
            channelId: params.cid 
        });

        await channelModel.update({
            followers: Sequelize.literal('`followers` +1')
        }, {
            where: { id: params.cid }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        }
    }
}

module.exports = new FollowServer();