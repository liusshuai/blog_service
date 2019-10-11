const blogCommentModel = require('../model/blogCommentModel');
const articleModel = require('../model/articleModel');
const tweetModel = require('../model/tweetModel');
const movieModel = require('../model/movieModel');
const CONSTANTS = require('../constants');
const Sequelize = require('sequelize');
const util = require('../util');
const comments_limit = 10;

const mail = require('../../mail');

async function commonGet(id, type, page) {
    const list = await blogCommentModel.findAll({
        where: {
            host: id,
            type: type
        },
        limit: comments_limit,
        offset: (page - 1) * comments_limit,
        order: [
            ['time', 'DESC']
        ],
    });

    const total = await blogCommentModel.count({
        where: {
            host: id,
            type: type
        }
    });

    return {
        list,
        total
    };
}

class BlogCommentServer {
    async getCommentByArticle(ctx) {
        const params = ctx.query;
        const page = params.page || 1;

        return commonGet(params.aid, 1, page);
    }

    async getCommentByTweet(ctx) {
        const params = ctx.query;
        const page = params.page || 1;

        return commonGet(params.tid, 2, page);
    }

    async getCommentByBoard(ctx) {
        const params = ctx.query;
        const page = params.page || 1;

        return commonGet(0, 3, page);
    }

    async getCommentByMovie(ctx) {
        const params = ctx.query;
        const page = params.page || 1;

        return commonGet(params.mid, 4, page);
    }

    async addComment(ctx) {
        const params = ctx.request.body;

        if (!params.username) {
            return {
                code: CONSTANTS.FAILD_CODE,
                msg: '昵称不能为空'
            };
        } else if (!params.useremail) {
            return {
                code: CONSTANTS.FAILD_CODE,
                msg: '邮件不能为空'
            };
        }
 
        const mess = await blogCommentModel.create(params);

        const where = {
            id: params.host
        };

        const commonMailOptions = {
            username: params.username,
            pubtime: mess.pubtime,
            content: params.content
        };

        // 留言回复
        if (params.replycontent) {
            let target = '';
            switch (params.type) {
                case 1:
                    target = `article/${params.host}`;
                    break;
                case 2:
                    target = `bibi/${params.host}`;
                    break;
                case 3:
                    target = 'board';
                    break;
                case 4:
                    target = `movie/${params.host}`;
                    break;
                default:
                    break;
            }
            mail.messReply({
                to: params.replyemail,
                replyname: params.replyname,
                replycontent: params.replycontent,
                target: target,
                ...commonMailOptions
            });
        }

        switch (params.type) {
            case 1:
                await articleModel.update({
                    comments: Sequelize.literal('`comments` +1')
                }, { where });
                if (params.useremail !== CONSTANTS.ADMIN) {
                    const article = await articleModel.findByPk(params.host);
                    mail.commentBlog({
                        id: article.id,
                        title: article.title,
                        ...commonMailOptions
                    });
                }
                break;
            case 2: 
                // 行博
                if (params.useremail !== CONSTANTS.ADMIN) {
                    const tweet = await tweetModel.findByPk(params.host);
                    mail.commentTweet({
                        tweet: tweet.content,
                        bibiId: tweet.id,
                        ...commonMailOptions
                    });
                }
                break;
            case 3: 
                // 留言板，非管理员留言触发邮件发送
                if (params.useremail !== CONSTANTS.ADMIN) {
                    mail.leaveMess({
                        ...commonMailOptions
                    });
                }
                break;
            case 4:
                if (params.useremail !== CONSTANTS.ADMIN) {
                    const movie = await movieModel.findByPk(params.host);
                    mail.commentSource({
                        id: movie.id,
                        title: movie.name,
                        ...commonMailOptions
                    });
                }
                break;
            default:
                break;
        }

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        };
    }

    async removeComment(ctx) {
        if (util.checkSession(ctx)) {
            let params = ctx.request.body;
            let data = await blogCommentModel.findByPk(params.id);
            if (data) {
                await blogCommentModel.destroy({
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
                    msg: CONSTANTS.NO_COMMENT
                }
            }
        } else {
            return util.notLoginResponse();
        }
    }
}

module.exports = new BlogCommentServer();