const commentModel = require('../model/commentModel');
const authorModel = require('../model/authorModel');
const childCommentModel = require('../model/childCommentModel');
const articleModel = require('../model/articleModel');
const tweetModel = require('../model/tweetModel');
const CONSTANTS = require('../constants');
const util = require('../util');
const _limit = CONSTANTS.BOARDS_LIMIT;

async function getBoards (params) {
    let page = params.page;
    let role = params.role;
    let type = params.type;
    let limit = params.limit || _limit;

    let offset = (page - 1) * limit;

    authorModel.hasMany(commentModel);
    commentModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });
    commentModel.hasMany(childCommentModel);
    childCommentModel.belongsTo(commentModel, { foreignKey: 'commentId' });
    let data = await commentModel.findAll({
        where: {
            role,
            type
        },
        include: [{
            model: authorModel,
            attributes: ['id', 'nickname', 'avator']
        }, {
            model: childCommentModel,
            attributes: ['id']
        }],
        order: [
            ['pubtime', 'DESC']
        ],
        limit,
        offset
    });

    return {
        code: CONSTANTS.SUCCESS_CODE,
        msg: CONSTANTS.SUCCESS_MSG,
        data: data
    }
}

async function getChildBoards (params) {
    let sqlParams = {
        order: [
            ['pubtime', 'DESC']
        ]
    };
    let where = {};
    if (params.pids) {
        where.pid = {
            $in: params.pids
        }
    } else if (params.pid){
        where.pid = params.pid
    }

    if (params.limit) {
        let page = params.page || 1;

        let limit = params.limit;
        let offset = (page - 1) * limit;
        sqlParams.limit = limit;
        sqlParams.offset = offset;
    }

    sqlParams.where = where;

    return await childCommentModel.findAndCount(sqlParams);
}

async function destroyComment (id) {
    await childCommentModel.destroy({
        where: {
            pid: id
        }
    });

    await commentModel.destroy({
        where: {
            id: id
        }
    });

    return {
        code: CONSTANTS.SUCCESS_CODE,
        msg: CONSTANTS.SUCCESS_MSG
    }
}

async function destroyChildComment (id) {
    await childCommentModel.destroy({where: { id }});
    return {
        code: CONSTANTS.SUCCESS_CODE,
        msg: CONSTANTS.SUCCESS_MSG
    }
}
 
class CommentServer {
    constructor () {}

    /*  根据页码和用户id获取留言板列表
        @params: 
            page: 页码
            uid: 用户id
        @return: 
            留言板列表
    */
    async getBoardByUserAndPage (ctx) {
        let params = ctx.query;
        let page = params.page || 1;
        let uid = params.uid;

        return await getBoards({
            page,
            role: uid,
            type: 1
        });
    }

    /*  根据页码和文章id获取评论列表
        @params: 
            page: 页码
            uid: 文章id
        @return: 
            留言板列表
    */
    async getCommentByArticleAndPage (ctx) {
        let params = ctx.query;
        let page = params.page || 1;
        let aid = params.aid;

        return await getBoards({
            page,
            role: aid,
            type: 1,
            limit: 10
        });
    }

    /*  根据页码和推文id获取评论列表
        @params: 
            page: 页码
            uid: 推文id
        @return: 
            留言板列表
    */
    async getCommentByTweetAndPage (ctx) {
        let params = ctx.query;
        let page = params.page || 1;
        let tid = params.tid;

        return await getBoards({
            page,
            role: tid,
            type: 2,
            limit: 10
        });
    }

    /*  根据页码和帖子id获取评论列表
        @params: 
            page: 页码
            fid: 帖子id
        @return: 
            评论
    */
    async getCommentByForumAndPage (ctx) {
        let params = ctx.query;
        let page = params.page || 1;
        let fid = params.fid;

        return await getBoards({
            page,
            role: fid,
            type: 3,
            limit: 10
        });
    }

    /*  根据页码和画册id获取评论列表
        @params: 
            page: 页码
            fid: 画册id
        @return: 
            评论
    */
    async getCommentByAlbumAndPage(ctx) {
        let params = ctx.query;
        let page = params.page || 1;
        let aid = params.albumid;

        return await getBoards({
            page,
            role: aid,
            type: 4,
            limit: 10
        });
    }

    /*  根据页码和父留言id获取子评论列表
        @params: 
            page: 页码
            pid: 父id
        @return: 
            子留言板列表
    */
    async getChildComments (ctx) {
        let pid = ctx.query.pid;

        let data = await childCommentModel.findAll({
            where: {
                commentId: pid
            },
            order: [['pubtime', 'DESC']]
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: data
        }
    }

    /*  新增评论OR留言
        @params: 
            role: 所属角色id，如：用户id、文章id或推文id
            content: 内容
            sender: 评论者
            avator: 评论者头像
            email: 评论者邮箱
            blog: 评论者博客
            type: 评论类型，1: 文章, 2: 推文; role对应角色有该字段定， 3: 帖子
        @return: 
            评论的insertid
    */
    async addComment (ctx) {
        let params = ctx.request.body;
 
        if (util.checkSession(ctx)) {
            let data = await commentModel.create({
                role: params.role,
                content: params.content,
                type: params.type,
                authorId: ctx.session.user.id
            });

            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: data
            }
        } else {
            return util.notLoginResponse();
        }
    }

    /*  新增子评论OR留言
        @params: 
            pid: 父留言id
            content: 内容
            sname: 评论者
            semail: 评论者邮箱
            sblog: 评论者博客
            rname: 接收者
            remail: 接收者邮箱
            rblog: 接收者博客
        @return: 
            评论的insertid
    */
    async addChildComment (ctx) {
        let params = ctx.request.body;

        if (util.checkSession(ctx)) {
            await commentModel.update({
                pubtime: new Date()
            }, {
                where: { id: params.pid }
            });
            let data = await childCommentModel.create({
                commentId: params.pid,
                content: params.content,
                sname: params.sname,
                sid: params.sid,
                rname: params.rname,
                rid: params.rid
            }); 

            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: data
            }
        } else {
            return util.notLoginResponse();
        }
    }

    /*  删除评论OR留言
        @params: 
            id: 评论id
        @return: 
            删除状态码
    */
    async deleteComment (ctx) {
        if (util.checkSession(ctx)) {
            let id = ctx.request.body.cid;
            let comment = await commentModel.findByPk(id);
            if (comment) {
                switch (comment.type) {
                    case 1: 
                        let article = await articleModel.findByPk(comment.role);
                        if (article.author == ctx.session.user.id) {
                            return await destroyComment(id);
                        }
                    case 2: 
                        let tweet = await tweetModel.findByPk(comment.role);
                        if (tweet.userid == ctx.session.user.id) {
                            return await destroyComment(id);
                        }
                    default: {
                        return {
                            code: CONSTANTS.NODATA_CODE,
                            msg: CONSTANTS.NO_PERMISSION
                        }
                    }
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

    /*  删除子评论OR留言
        @params: 
            id: 子评论id
        @return: 
            删除状态码
    */
    async deleteChildComment (ctx) {
        if (util.checkSession(ctx)) {
            let id = ctx.request.body.id;
            let childComment = await childCommentModel.findByPk(id);
            if (childComment) {
                let parentComment = await commentModel.findOne({
                    where: {
                        id: childComment.pid
                    }
                });

                switch (parentComment.type) {
                    case 1: 
                        let article = await articleModel.findByPk(parentComment.role);
                        if (article.author == ctx.session.user.id) {
                            return await destroyChildComment(id);
                        }
                    case 2: 
                        let tweet = await tweetModel.findByPk(parentComment.role);
                        if (tweet.userid == ctx.session.user.id) {
                            return await destroyChildComment(id);
                        }
                    default: {
                        return {
                            code: CONSTANTS.NODATA_CODE,
                            msg: CONSTANTS.NO_PERMISSION
                        }
                    }
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

module.exports = new CommentServer();