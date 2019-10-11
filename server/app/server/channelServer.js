const channelModel = require('../model/channelModel');
const articleModel = require('../model/articleModel');
const albumModel = require('../model/albumModel');
const authorModel = require('../model/authorModel');
const CONSTANTS = require('../constants');
const util = require('../util');

class ChannelServer {
    constructor () {}

    /*  获取所有频道
        @params: none
        @return: 所有频道
    */
    async getAllChannel () {
        let data = await channelModel.findAll();
        if (data.length) {
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: data
            }
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_CHANNEL
            }
        }
    }

    /*  添加频道
        @params: 
            name: 频道名字
            desc: 简介
            cover: 封面
        @return: 
            修改状态
    */
    async addChannel (ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }
        const count = await channelModel.count({
            where: { authorId: ctx.session.user.id }
        }); 
        if (count >= 2 && !util.checkAdmin(ctx.session.user)) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: '不可再建频道，请联系管理员'
            }
        }
        let params = ctx.request.body; 
        await channelModel.create({
            name: params.name,
            desc: params.desc || '',
            cover: params.cover || '',
            authorId: ctx.session.user.id
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        }
    }

    /*  删除频道
        @params:
            id: 要删除的频道id
        @return:
            删除结果
    */
    async deleteChannel (ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        } else if (!util.checkAdmin(ctx.session.user)) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_PERMISSION
            }
        } else {
            let params = ctx.request.body;
            let channel = await channelModel.findByPk(params.id);
            if (channel) {
                let data = await articleModel.findAll({
                    where: {
                        channel: params.id
                    }
                });
                if (data.length) {
                    return {
                        code: CONSTANTS.NODATA_CODE,
                        msg: CONSTANTS.CHANNEL_DELETE_ERROR
                    }
                } else {
                    await channelModel.destroy({
                        where: {
                            id: params.id
                        }
                    });

                    return {
                        code: CONSTANTS.SUCCESS_CODE,
                        msg: CONSTANTS.SUCCESS_MSG
                    }
                }
            } else {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: CONSTANTS.CHANNEL_NOT_EXITS
                }
            }
                
        }
    }

    /*  修改频道信息 
        @params: 
            id: 要求改频道的id
            name: 频道名字
            desc: 频道简介
            cover: 频道封面
        @return: 
            更改结果
    */
    async updateChannelInfo (ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }
        let params = ctx.request.body;
        let data = await channelModel.findByPk(params.id);
        if (!data) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.CHANNEL_NOT_EXITS
            }
        }

        if (util.checkAdmin(ctx.session.user) || data.authorId === ctx.session.user.id) {
            await channelModel.update({
                desc: params.desc,
                cover: params.cover || data.cover
            }, {
                where: {
                    id: params.id
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
    }

    /*  获取某篇频道信息 
        @params: 
            cid: 频道的id
        @return: 
            频道信息
    */
    async getChannelById (ctx) {
        let id = ctx.query.cid;
        channelModel.hasMany(albumModel);
        albumModel.belongsTo(channelModel, { foreignKey: 'channelId', targetKey: 'id' });
        channelModel.hasMany(articleModel);
        articleModel.belongsTo(albumModel, { foreignKey: 'channelId', targetKey: 'id' });
        authorModel.hasMany(channelModel);
        channelModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });
        let data = await channelModel.findOne({
            where: {
                id
            },
            include: [{
                model: albumModel,
                attributes: ['id']
            }, {
                model: articleModel,
                attributes: ['id']
            }, {
                model: authorModel,
                attributes: ['id', 'nickname', 'avator']
            }]
        })
        if (data) {
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: data
            }
        } else {
            return {
                code: NODATA_CODE,
                msg: CHANNEL_NOT_EXITS
            }
        }
    }
 
    async getChannelByKey (ctx) {
        const params = ctx.query;
        const keyword = params.keyword;
        const page = params.page || 1;
        const limit = params.limit || 16;
        const sortType = params.sortType || 'followers';
        let list = await channelModel.findAll({
            where: {
                $or: [
                    { name: { $like: `%${keyword}%` } },
                    { desc: { $like: `%${keyword}%` } }
                ]
            },
            order: [[sortType, 'DESC']],
            limit,
            offset: (page - 1) * limit
        });

        const total = await channelModel.count({
            where: {
                $or: [
                    { name: { $like: `%${keyword}%` } },
                    { desc: { $like: `%${keyword}%` } }
                ]
            }
        });
        
        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: { list, total }
        }
    }

    async getChannelByAuthor (ctx) {
        const data = await channelModel.findAll({
            where: { authorId: ctx.query.uid },
            order: [['createTime', 'desc']]
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: data
        }
    }

    async getChannelCountByAuthor (ctx) {
        const id = ctx.query.uid;
        const count = await channelModel.count({
            where: { authorId: id }
        });
        
        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: count
        }
    }

    async getChannelByType (ctx) {
        const where = {};
        const page = ctx.query.page || 1;
        const limit = parseInt(ctx.query.limit || 20);
        const offset = ( page - 1 ) * limit;
        if (ctx.query.type === 'official') {
            where.boss = 0;
        } else {
            where.boss = { $ne: 0 };
        }
        const list = await channelModel.findAll({
            where,
            order: [['followers', 'DESC']],
            limit,
            offset
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: list
        }
    }

    // 文章归档的接口，获取频道列表、全部文章、文章标签
    async getArchives (ctx) {
        const params = ctx.query;
        const channels = await channelModel.findAll({
            attributes: ['id', 'cname', 'articlecount']
        });
        const articles = await articleModel.findAll({
            where: {
                authorId: params.author,
                show: 1
            },
            attributes: ['id', 'pubtime', 'tags', 'title']
        });

        let tags = [];
        articles.forEach(item => {
            const _tags = JSON.parse(item.tags);
            _tags && _tags.forEach(tag => {
                const i = tags.findIndex(_t => _t === tag);
                i === -1 && tags.push(tag);
            });
        });

        return {
            channels,
            articles,
            tags
        };
    }
} 

module.exports = new ChannelServer();