const albumModel = require('../model/albumModel');
const authorModel = require('../model/authorModel');
const channelModel = require('../model/channelModel');
const imgModel = require('../model/imgModel');
const commentModel = require('../model/commentModel');
const CONSTANTS = require('../constants');
const util = require('../util');
const Sequelize = require('sequelize');
const fs = require('fs');

class AlbumServer {
    constructor () {}

    async getRecAlbum () {
        channelModel.hasMany(albumModel);
        albumModel.belongsTo(channelModel, { foreignKey: 'channelId', targetKey: 'id' });
        authorModel.hasMany(albumModel);
        albumModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });

        let list = await albumModel.findAll({
            where: {
                rec: 1
            },
            include: [{
                model: authorModel,
                attributes: { exclude: ['password', 'bgcover'] }
            }, {
                model: channelModel,
                attributes: ['id', 'name']
            }],
            limit: 5,
            order: [['likes', 'DESC']]
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: list
        }
    }

    async getAllAlbum(ctx) {
        const limit = CONSTANTS.ALBUM_LIMIT;
        const page = ctx.query.page || 1;
        const offset = (page - 1) * limit;
        const sortway = ctx.query.sortway || 'createtime';
        channelModel.hasMany(albumModel);
        albumModel.belongsTo(channelModel, { foreignKey: 'channelId', targetKey: 'id' });
        authorModel.hasMany(albumModel);
        albumModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });

        let list = await albumModel.findAll({
            include: [{
                model: authorModel,
                attributes: { exclude: ['password', 'bgcover'] }
            }, {
                model: channelModel,
                attributes: ['id', 'name']
            }],
            order: [[sortway, 'DESC']],
            limit,
            offset
        });

        let total = await albumModel.count();

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: {list, total}
        }
    }

    async getAlbumByChannel(ctx) {
        const limit = CONSTANTS.ALBUM_LIMIT;
        // const limit = 5;
        const page = ctx.query.page || 1;
        const offset = (page - 1) * limit;
        const sortway = ctx.query.sortway || 'createtime';
        channelModel.hasMany(albumModel);
        albumModel.belongsTo(channelModel, { foreignKey: 'channelId', targetKey: 'id' });
        authorModel.hasMany(albumModel);
        albumModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });

        let list = await albumModel.findAll({
            where: {
                channelId: ctx.query.cid
            },
            include: [{
                model: authorModel,
                attributes: { exclude: ['password', 'bgcover'] }
            }, {
                model: channelModel,
                attributes: ['id', 'name']
            }],
            order: [[sortway, 'DESC']],
            limit,
            offset
        });

        let total = await albumModel.count({
            where: {
                channelId: ctx.query.cid
            }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: { list, total }
        }
    }

    async getAlbumByAuthor(ctx) {
        const limit = parseInt(ctx.query.limit) || CONSTANTS.ALBUM_LIMIT;
        const page = ctx.query.page || 1;
        const offset = (page - 1) * limit;
        const sortway = ctx.query.sortway || 'createtime';
        channelModel.hasMany(albumModel);
        albumModel.belongsTo(channelModel, {foreignKey: 'channelId', targetKey: 'id'});
        authorModel.hasMany(albumModel);
        albumModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });

        let list = await albumModel.findAll({
            where: {
                authorId: ctx.query.uid
            },
            include: [{
                model: authorModel,
                attributes: ['id', 'avator', 'nickname']
            }, {
                model: channelModel,
                attributes: ['id', 'name']
            }],
            order: [[sortway, 'DESC']],
            limit,
            offset
        });

        let total = await albumModel.count({
            where: {
                authorId: ctx.query.uid
            }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: { list, total }
        }
    } 

    async getAlbumByKey(ctx) {
        const limit = CONSTANTS.ALBUM_LIMIT;
        const page = ctx.query.page || 1;
        const offset = (page - 1) * limit;
        const keyword = ctx.query.keyword;
        const sortway = ctx.query.sortway || 'createtime';
        channelModel.hasMany(albumModel);
        albumModel.belongsTo(channelModel, { foreignKey: 'channelId', targetKey: 'id' });
        authorModel.hasMany(albumModel);
        albumModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });

        let list = await albumModel.findAll({
            where: {
                $or: [
                    { name: { $like: `%${keyword}%` } },
                    { desc: { $like: `%${keyword}%` } }
                ]
            },
            include: [{
                model: authorModel,
                attributes: { exclude: ['password', 'bgcover'] }
            }, {
                model: channelModel,
                attributes: ['id', 'name']
            }],
            order: [[sortway, 'DESC']],
            limit,
            offset
        });

        let total = await albumModel.count({
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

    async getAlbumDetail (ctx) {
        channelModel.hasMany(albumModel);
        albumModel.belongsTo(channelModel, { foreignKey: 'channelId', targetKey: 'id' });
        authorModel.hasMany(albumModel);
        albumModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });

        let item = await albumModel.findOne({
            where: {
                id: ctx.query.id
            },
            include: [{
                model: authorModel,
                attributes: { exclude: ['password'] }
            }, {
                model: channelModel,
                attributes: ['id', 'name']
            }]
        });

        await albumModel.update({
            views: item.views + 1
        }, {
            where: {
                id: ctx.query.id
            }
        });

        const imgs = await imgModel.findAll({
            where: {
                pid: item.id,
                type: 4
            }
        });

        const comments = await commentModel.count({
            where: {
                role: ctx.query.id,
                type: 4
            }
        });

        item.setDataValue('imgs', imgs);
        item.setDataValue('comments', comments);

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: item
        }
    }

    async likeAlbum (ctx) {
        let id = ctx.query.id;
        let data = await albumModel.findByPk(id);
        if (data.id) {
            await albumModel.update({
                likes: data.likes + 1
            }, {
                where: { id: id }
            });
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.ARTICLE_NOT_EXITS
            }
        }
    }

    async addAlbum(ctx) {
        let params = ctx.request.body;
        if (util.checkSession(ctx)) {
            const imgs = JSON.parse(params.imgs || "[]");
            const data = await albumModel.create({
                authorId: ctx.session.user.id,
                name: params.name,
                desc: params.desc,
                tags: params.tags,
                channelId: params.channel,
                cover: imgs[0],
                img: imgs.length
            });

            await authorModel.update({
                albumcount: Sequelize.literal('`albums` +1')
            }, {
                where: { id: ctx.session.user.id }
            });

            await channelModel.update({
                albumcount: Sequelize.literal('`albumcount` +1')
            }, {
                where: { id: params.channel }
            });

            for (let i = 0; i < imgs.length; i++) {
                await imgModel.create({
                    src: imgs[i],
                    pid: data.id,
                    type: 4
                });
            }
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        } else {
            return util.notLoginResponse();
        }

    }

    async deleteAlbum(ctx) {
        if (util.checkSession(ctx)) {
            const params = ctx.request.body;
            const data = await albumModel.findByPk(params.id);
            if (data) {
                if (util.checkAdmin(ctx.session.user) || data.authorId == ctx.session.user.id) {
                    let imgs = await imgModel.findAll({
                        where: { pid: params.id, type: 4 }
                    });

                    imgs.forEach(img => {  // 删除系统上的图片
                        fs.exists(img.src, function (exists) {
                            if (exists) {
                                fs.unlinkSync(img.src);
                            }
                        });
                    });

                    await imgModel.destroy({ // 同时删除数据库记录
                        where: { pid: params.id, type: 4 }
                    });

                    await albumModel.destroy({
                        where: { id: params.id }
                    });

                    await authorModel.update({
                        albumcount: Sequelize.literal('`albums` - 1')
                    }, {
                        where: { id: data.authorId }
                    });

                    await channelModel.update({
                        albumcount: Sequelize.literal('`albumcount` - 1')
                    }, {
                        where: { id: data.channelId }
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
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: CONSTANTS.ALBUM_NOT_EXITS
                }
            }
        } else {
            return util.notLoginResponse();
        }
    }

    async updateAlbum(ctx) {
        if (util.checkSession(ctx)) {
            let params = ctx.request.body;
            let data = await albumModel.findByPk(params.id);
            if (data) {
                const imgs = JSON.parse(params.imgs || "[]");
                if (util.checkAdmin(ctx.session.user) || data.authorId == ctx.session.user.id) {
                    await albumModel.update({
                        name: params.name,
                        tags: params.tags,
                        desc: params.desc,
                        cover: imgs[0],
                        img: imgs.length,
                        createtime: Date.now()
                    }, {
                            where: { id: params.id }
                    });

                    await imgModel.destroy({ // 同时删除数据库记录
                        where: { pid: params.id, type: 4 }
                    });

                    for (let i = 0; i < imgs.length; i++) {
                        await imgModel.create({
                            src: imgs[i],
                            pid: data.id,
                            type: 4
                        });
                    }

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
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: CONSTANTS.ALBUM_NOT_EXITS
                }
            }
        } else {
            return util.notLoginResponse();
        }
    }

    async getAlbumAbouRec(ctx) {
        const id = ctx.query.id;
        const album = await albumModel.findByPk(id);
        if (!album.id) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.ALBUM_NOT_EXITS
            }
        }

        const list = await albumModel.findAll({
            where: {
                id: { $ne: id },
                authorId: album.authorId
            },
            order: [['views', 'DESC']],
            limit: 4
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: list
        }
    }
} 

module.exports = new AlbumServer();