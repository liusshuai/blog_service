const commentModel = require('../model/commentModel');
const authorModel = require('../model/authorModel');
const childCommentModel = require('../model/childCommentModel');
const CONSTANTS = require('../constants');

async function getBoards(params) {
    let page = params.page;
    let role = params.role;
    let type = params.type;
    let limit = params.limit || _limit;

    let offset = (page - 1) * limit;

    authorModel.hasMany(commentModel);
    commentModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });
    let data = await commentModel.findAll({
        where: {
            role,
            type
        },
        include: [{
            model: authorModel,
            attributes: ['id', 'nickname', 'avator']
        }],
        order: [
            ['pubtime', 'DESC']
        ],
        limit,
        offset
    });


    let count = 0;
    let firstChild = [];
    let item = {};

    for (let i = 0; i < data.length; i++) {
        item = data[i];
        count = await childCommentModel.count({ where: { commentId: item.id } });

        firstChild = await getChildBoards({
            parentId: item.id
        })

        data[i].setDataValue('childCommentsCount', count);
        data[i].setDataValue('childComments', firstChild);
    }

    return {
        code: CONSTANTS.SUCCESS_CODE,
        msg: CONSTANTS.SUCCESS_MSG,
        data: data
    }
}

async function getChildBoards(params) {

    const { page = 1, limit = 1, parentId } = params;

    authorModel.hasMany(childCommentModel);
    childCommentModel.belongsTo(authorModel, {
        foreignKey: 'authorId',
        targetKey: 'id'
    });

    const list = await childCommentModel.findAll({
        where: {
            commentId: parentId
        },
        include: [{
            model: authorModel,
            attributes: ['id', 'nickname', 'avator']
        }],
        limit: limit,
        offset: ( page - 1 ) * limit
    });

    return list;
}

class CommentService {

    async getAlbumComments(ctx) {
        let params = ctx.query;
        let page = params.page || 1;
        let aid = params.albumid;
 
        return await getBoards({
            page,
            role: aid,
            type: 4,
            limit: 5
        });

    }

    async getArticleComments(ctx) {
        let params = ctx.query;
        let page = params.page || 1;
        let aid = params.articleId;

        return await getBoards({
            page,
            role: aid,
            type: 1,
            limit: 20
        });

    }


    async getTweetComments(ctx) {
        let params = ctx.query;
        let page = params.page || 1;
        let tid = params.tweetId;

        return await getBoards({
            page,
            role: tid,
            type: 2,
            limit: 20
        });
    }


    async getChildComments(ctx) {
        const {
            pid,
            page = 1
        } = ctx.query;

        const list = await getChildBoards({
            parentId: pid,
            page: page,
            limit: 5
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: list
        }
    }
}

module.exports = new CommentService();