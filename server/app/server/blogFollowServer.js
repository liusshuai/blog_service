const blogFollowModel = require('../model/blogfollowerModel');
const authorModel = require('../model/authorModel');
const Sequelize = require('sequelize');
const CONSTANTS = require('../constants');
const util = require('../util');

const mail = require('../../mail');

class BlogFollowServer {

    async follow(ctx) {

        const params = ctx.request.body;

        const data = await blogFollowModel.findOne({
            where: {
                email: params.email
            }
        });

        if (data) {
            return {
                code: CONSTANTS.FAILD_CODE,
                msg: '该邮箱已经订阅过博客'
            };
        } else {
            await blogFollowModel.create({
                username: params.username,
                email: params.email
            });

            await authorModel.update({
                followers: Sequelize.literal('`followers` +1')
            }, {
                where: {
                    id: params.aid
                }
            });

            const count = await blogFollowModel.count();

            mail.follow({
                username: params.username,
                email: params.email,
                followCount: count
            });

            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            };
        }
    }

    async getMyFollow(ctx) {
        const query = ctx.query;

        const page = query.page || 1;

        const PAGE_SIZE = 20;

        const list = await blogFollowModel.findAll({
            limit: PAGE_SIZE,
            offset: ( page - 1 ) * PAGE_SIZE
        });

        const total = await blogFollowModel.count();

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: { list, total }
        };
    }

    async removeFollow(ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }

        const id = ctx.request.body.uid;

        await blogFollowModel.destroy({
            where: { id }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        }
    }
}

module.exports = new BlogFollowServer();