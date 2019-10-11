const tweetModel = require('../model/tweetModel');
const imgModel = require('../model/imgModel');
const commentModel = require('../model/commentModel');
const authorModel = require('../model/authorModel');
const followModel = require('../model/followModel');
const blogCommentModel = require('../model/blogCommentModel');
const CONSTANTS = require('../constants');
const util = require('../util');
const Sequelize = require('sequelize');
const limit = CONSTANTS.TWEET_LIMIT;

async function getTweet (params) {
    let where = params.where || {};
    let page = params.data.page || 1;
    let _limit = params.data.limit || limit;
    let offset = (page - 1) * _limit;

    authorModel.hasMany(tweetModel);
    tweetModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });

    const data = await tweetModel.findAll({
        where: where,
        include: [{
            model: authorModel,
            attributes: {
                exclude: ['password', 'bgcover']
            }
        }],
        order: [['like_num', 'DESC'], ['pubtime', 'DESC']],
        limit: _limit,
        offset: offset
    })

    let imgs = [];
    let comments = 0;
    for (let i = 0; i < data.length; i++) {
        imgs = await imgModel.findAll({
            where: {
                pid: data[i].id,
                type: 2
            }
        });
        comments = await commentModel.count({
            where: {
                role: data[i].id,
                type: 2
            }
        });

        data[i].imgs = imgs;
        data[i].setDataValue('comments', comments);
    }

    let total = await tweetModel.count({
        where: where
    });

    return {
        code: CONSTANTS.SUCCESS_CODE,
        msg: CONSTANTS.SUCCESS_MSG,
        data: {
            data,
            total
        }
    }
}
 
class TweetServer {
    constructor () {}

    /*  根据页码获取推特
        @params: 
            page: 页码
        @return: 
            推特列表
    */
    async getTweetByPage (ctx) {
        let page = ctx.query.page;

        return await getTweet({
            data: {
                page
            }
        });
    }

    /*  根据作者获取推特
        @params: 
            userid: 推作者id
        @return: 
            推特列表
    */
    async getTweetByUser (ctx) {
        const params = ctx.query;

        return await getTweet({
            where: {
               authorId: params.authorId
            },
            data: {
                page: params.page,
                limit: params.limit
            }
        }); 
    }

    /*  新增推特
        @params: 
            userid: 推作者id
            content: 内容
            fromw: 来源
        @return: 
            新增状态
    */
    async addTweet (ctx) {
        let params = ctx.request.body;
        if (util.checkSession(ctx)) {
            let data =  await tweetModel.create({
                authorId: ctx.session.user.id,
                content: params.content,
                video: params.video || '',
                fromw: params.fromw
            });

            await authorModel.update({
                tweetcount: Sequelize.literal('`tweets` +1')
            }, {
                where: { id: ctx.session.user.id }
            });

            if (params.imgs) {
                let imgs = JSON.parse(params.imgs);
                for (let i = 0; i < imgs.length; i++) {
                    await imgModel.create({
                        src: imgs[i],
                        pid: data.id,
                        type: 2
                    });
                }
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

    /*  删除某一条推特
        @params: 
            id: 要删除的推特的id
        @return: 
            删除状态
    */
    async deleteTweet (ctx) {
        let id = ctx.request.body.id;
        if (util.checkSession(ctx)) {
            let tweet = await tweetModel.findByPk(id);
            if (tweet) {
                if (tweet.authorId == ctx.session.user.id || util.checkAdmin(ctx.session.user)) {

                    await blogCommentModel.destroy({
                        where: {
                            host: id,
                            type: 2
                        }
                    });

                    await tweetModel.destroy({
                        where: {
                            id
                        }
                    });

                    await authorModel.update({
                        tweetcount: Sequelize.literal('`tweets` -1')
                    }, {
                        where: { id: ctx.session.user.id }
                    });

                    return {
                        code: CONSTANTS.SUCCESS_CODE,
                        msg:CONSTANTS.SUCCESS_MSG
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
                    msg: CONSTANTS.TWEET_NOT_EXITS
                }
            }
        } else {
            return util.notLoginResponse();
        }
    }

    /*  点赞某一条推特
        @params: 
            id: 要点赞的推特的id
        @return: 
            点赞状态
    */
    async likeTweet (ctx) {
        let id = ctx.request.body.id;
        let data = await tweetModel.findByPk(id);
        if (data) {
            await tweetModel.update({
                likenum: data.likenum + 1
            }, {
                where: {
                    id
                }
            });

            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.TWEET_NOT_EXITS
            }
        }
    }

    async getTweetDetail(ctx) {
        const id = ctx.query.id;

        const data = await tweetModel.findByPk(id);

        const imgs = await imgModel.findAll({
            where: {
                pid: data.id,
                type: 2
            }
        });
        const comments = await commentModel.count({
            where: {
                role: data.id,
                type: 2
            }
        });

        data.imgs = imgs;
        data.setDataValue('comments', comments);

        return data;
    }


    // 获取我关注的用户的推文
    async getMyConcernAuthorsTweet (ctx) {
        const params = ctx.query;


        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        } else {

            const uid = ctx.session.user.id;

            const followList = await followModel.findAll({
                where: {
                    ownid: uid
                }
            });

            let checkList = [];

            followList.forEach(item => {
                checkList.push(item.authorId);
            });

            return await getTweet({
                where: {
                    authorId: {
                        $in: checkList
                    }
                },
                data: {
                    page: params.page || 1
                }
            });
            
        }
    }



    async getMyTweet (ctx) {
        const page = ctx.query.page || 1;
        const limit = 10; 
        const data = await tweetModel.findAll({
            where: {
                authorId: 17
            },
            order: [
                ['pubtime', 'DESC']
            ],
            limit,
            offset: (page - 1) * limit
        });

        const total = await tweetModel.count({
            where: { authorId: 17 }
        });

        let comments = 0;
        let imgs = [];
        for (let i = 0; i < data.length; i++) {
            imgs = await imgModel.findAll({
                where: {
                    pid: data[i].id,
                    type: 2
                }
            });

            comments = await blogCommentModel.count({
                where: {
                    host: data[i].id,
                    type: 2
                }
            });

            data[i].imgs = imgs;
            data[i].setDataValue('comments', comments);
        }

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: {
                data,
                total
            }
        }
    }

}

module.exports = new TweetServer();