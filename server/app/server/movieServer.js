const movieModel = require('../model/movieModel');
const blogCommentModel = require('../model/blogCommentModel');
const CONSTANTS = require('../constants');
const push = require('../util/jPush');
const util = require('../util');
const LIMIT = 20;

class MovieServer {
    async getList(ctx) {
        const page = ctx.query.page || 1;
        const keyword = ctx.query.key || '';

        let where = {};

        if (keyword) {
            where = {
                $or: [
                    {name: {$like: `%${keyword}%`}},
                    {tag: {$like: `%${keyword}%`}},
                    {type: {$like: `%${keyword}%`}}
                ]
            };
        }

        const list = await movieModel.findAll({
            where: where,
            attributes: {exclude: ['content']},
            limit: LIMIT,
            offset: ( page - 1 ) * LIMIT
        });

        const total = await movieModel.count({
            where
        });

        return {
            list,
            total
        }
    }

    async getDetail(ctx) {
        const id = ctx.query.id || -1;

        return await movieModel.findByPk(id);
    }

    async addMovie(ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }
        const params = ctx.request.body;
        const data = await movieModel.findOne({
            where: {
                name: params.name
            }
        });

        if(data) {
            return {
                code: CONSTANTS.FAILD_CODE,
                msg: '资源已存在'
            };
        }

        await movieModel.create(params);

        push('New Source', '有新资源更新啦', params.name, {
            'type': 'source'
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        };
    }
 
    async updateMovie(ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }
        const params = ctx.request.body;
        const data = await movieModel.findOne({
            where: {
                id: params.id
            }
        });

        if (!data) {
            return {
                code: CONSTANTS.FAILD_CODE,
                msg: '资源不存在'
            };
        }

        delete params.id;

        await movieModel.update(params, {
            where: {
                id: data.id
            }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        };
    }

    async removeMovie(ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }
        const params = ctx.request.body;
        const data = await movieModel.findOne({
            where: {
                id: params.id
            }
        });

        if (!data) {
            return {
                code: CONSTANTS.FAILD_CODE,
                msg: '资源不存在'
            };
        }

        // 删除评论
        await blogCommentModel.destroy({
            where: {
                host: data.id,
                type: 4
            }
        });

        await movieModel.destroy({
            where: {
                id: params.id
            }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        };
    }
}

module.exports = new MovieServer();