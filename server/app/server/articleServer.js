const articleModel = require('../model/articleModel');
const blogCommentModel = require('../model/blogCommentModel');
const albumModel = require('../model/albumModel');
const authorModel = require('../model/authorModel');
const channelModel = require('../model/channelModel');
const commentModel = require('../model/commentModel');
const CONSTANTS = require('../constants');
const util = require('../util');
const Sequelize = require('sequelize');
const limit = CONSTANTS.ARTICLE_LIMIT;

const mail = require('../../mail/index');
const blogFollowModel = require('../model/blogfollowerModel');

async function getArticle(params) {
    let where = params.where || {};
    let offset = params.data.offset || 0;
    let _limit = params.data.limit || limit;
    let sortrole = params.data.sortrole || 'pubtime';
    let sort = params.data.sort || 'DESC';

    channelModel.hasMany(articleModel);
    articleModel.belongsTo(channelModel, { foreignKey: 'channelId', targetKey: 'id' });
    authorModel.hasMany(articleModel);
    articleModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });
    let list = await articleModel.findAll({
        where: where,
        include: [{
            model: authorModel,
            attributes: { exclude: ['password', 'bgcover'] }
        }, {
            model: channelModel,
            attributes: ['id', 'name']
        }],
        attributes: {
            exclude: ['content']
        },
        order: params.data.oerder || [[sortrole, sort]],
        limit: _limit,
        offset
    });

    let total = await articleModel.count({where});

    return {total, list};
}

async function getArticleComments (list) {
    let comments = 0;
    for (let i = 0; i < list.length; i++) {
        comments = await commentModel.count({
            where: {
                role: list[i].id,
                type: 1
            }
        });

        list[i].comments = comments;
    }

    return list;
}

function compare(key) {
    return (a, b) => {
        return b[key] - a[key];
    }
}

class ArticleServer {
    constructor() { }

    /*  请求首页文章列表
        @page: 页面参数
        return: 指定页面的文章列表
    */
    async getArticleList(ctx) {
        let params = ctx.query;
        let page = params.page || 1;
        let offset = (page - 1) * limit;

        let data = await getArticle({
            where: {
                show: 1
            },
            data: {
                offset
            }
        });
        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: data
        }
    } 

    /*  获取文章详情
        @id: 查询的文章id
        return: 文章详情
    */
    async getOneArticle(ctx) {
        let id = ctx.query.id || -1;
        const onlyRead = ctx.query.onlyRead || 0; // 该参数表示是否需要增加文章阅读量，默认增加
        channelModel.hasMany(articleModel);
        articleModel.belongsTo(channelModel, { foreignKey: 'channelId', targetKey: 'id' });
        authorModel.hasMany(articleModel);
        articleModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });

        let data = await articleModel.findOne({
            where: { id },
            include: [{
                model: authorModel,
                attributes: { exclude: ['password', 'bgcover'] }
            }, {
                model: channelModel,
                attributes: ['id', 'name']
            }]
        });

        data.comments = await commentModel.count({
            where: {
                role: data.id,
                type: 1
            }
        });

        if (data.show || (util.checkSession(ctx) && ctx.session.user.id == data.author) || (util.checkSession(ctx) && util.checkAdmin(ctx.session.user))) {
            if (data.show && !onlyRead) { // 只有文章show为1且onlyread为0，文章的阅读量才加1
                await articleModel.update({
                    views: data.views + 1
                }, {
                        where: {
                            id
                        }
                    });
            }
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: data
            }
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.ARTICLE_NOT_EXITS
            }
        }
    }

    /*  保存文章
        @title: 标题
        @author: 作者
        @desc: 简述
        @content: 内容
        @channel: 频道
        @tags: 标签
        @cover: 封面
        return: 存储状态
    */ 
    async saveArticle(ctx) {
        if (util.checkSession(ctx)) {
            let params = ctx.request.body;

            const article = await articleModel.create({
                title: params.title,
                authorId: ctx.session.user.id,
                desc: params.desc || '',
                content: params.content,
                channelId: params.channel,
                tags: params.tags,
                cover: params.cover || '',
                show: params.show
            });

            await authorModel.update({
                articlecount: Sequelize.literal('`articles` +1')
            }, {
                where: { id: ctx.session.user.id }
            });

            await channelModel.update({
                articlecount: Sequelize.literal('`articlecount` +1')
            }, {
                where: { id: params.channel }
            });

            if (params.show) {
                const channel = await channelModel.findByPk(params.channel);
                const users = await blogFollowModel.findAll();

                let blog = {
                    title: article.title,
                    id: article.id,
                    pubTime: article.pubtime,
                    desc: params.desc,
                    classify: channel.name,
                    tag: article.tags
                }

                let perMailTime = 400; // 每400毫秒发送一封邮箱

                for (let index = 0; index < users.length; index++) {
                    setTimeout(() => {
                        mail.newArticleBotice({
                            username: users[index].username,
                            to: users[index].email,
                            ...blog
                        });
                    }, perMailTime * index);
                }
            }

            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        } else {
            return util.notLoginResponse();
        }

    }

    /*  删除文章
        @params: 
            id: 文章唯一id
        @return: 
            删除状态码
    */
    async deleteArticle(ctx) {
        if (util.checkSession(ctx)) {
            let params = ctx.request.body;
            let data = await articleModel.findByPk(params.id);
            if (data) {
                if (util.checkAdmin(ctx.session.user) || data.authorId == ctx.session.user.id) {

                    await blogCommentModel.destroy({
                        where: {
                            host: data.id,
                            type: 1
                        }
                    });

                    await articleModel.destroy({
                        where: {
                            id: params.id
                        }
                    });

                    await authorModel.update({
                        articlecount: Sequelize.literal('`articles` - 1')
                    }, {
                        where: { id: data.authorId }
                    });

                    await channelModel.update({
                        articlecount: Sequelize.literal('`articlecount` - 1')
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
                    msg: CONSTANTS.ARTICLE_NOT_EXITS
                }
            }

        } else {
            return util.notLoginResponse();
        }
    }

    /*  更新文章
        @params: 
            id: 文章唯一id
            title: 标题
            desc: 描述
            content: 内容
            channel: 频道
            tags: 标签
            cover: 封面
            show: 是否展示(默认不展示)
            pubtime: 更新时间(当前时间)
        @return: 
            更新状态码
    */
    async updateArticle(ctx) {
        if (util.checkSession(ctx)) {
            let params = ctx.request.body;
            let data = await articleModel.findByPk(params.id);
            if (data) {
                if (util.checkAdmin(ctx.session.user) || data.authorId == ctx.session.user.id) {
                    if (!params.title) {
                        !params.show && await articleModel.update({ show: params.show }, { where: { id: params.id } });
                        params.show && await articleModel.update({ show: params.show, pubtime: new Date() }, { where: { id: params.id } });

                        if (params.show) {
                            const channel = await channelModel.findByPk(data.channelId);
                            const users = await blogFollowModel.findAll();

                            let blog = {
                                title: data.title,
                                id: data.id,
                                pubTime: data.pubtime,
                                desc: data.desc,
                                classify: channel.name,
                                tag: data.tags
                            }

                            let perMailTime = 400; // 每400毫秒发送一封邮箱

                            for (let index = 0; index < users.length; index++) {
                                setTimeout(() => {
                                    mail.newArticleBotice({
                                        username: users[index].username,
                                        to: users[index].email,
                                        ...blog
                                    });
                                }, perMailTime * index);
                            }
                        }

                    } else {
                        await articleModel.update({
                            title: params.title,
                            desc: params.desc || '',
                            content: params.content,
                            channelId: params.channel,
                            tags: params.tags,
                            cover: params.cover || '',
                            show: params.show || 0,
                            pubtime: new Date()
                        }, {
                                where: {
                                    id: params.id
                                }
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
                    msg: CONSTANTS.ARTICLE_NOT_EXITS
                }
            }
        } else {
            return util.notLoginResponse();
        }
    }

    /*  按作者获取文章
        @params: 
            aid: 作者id
            page: 页码
        @return: 
            状态码
            文章列表
    */ 
    async getArticleByAuthor(ctx) {
        const params = ctx.query;
        const page = params.page || 1;
        const limit = params.limit ? parseInt(params.limit) : limit;
        const offset = (page - 1) * limit;

        let data = await getArticle({
            where: {
                authorId: parseInt(params.author),
                show: parseInt(params.show)
            },
            data: {
                limit,
                offset
            }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: data
        }
    }

    /*  按频道获取文章
        @params: 
            aid: 频道id
            page: 页码
        @return: 
            状态码
            文章列表
    */
    async getArticleByChannel(ctx) {
        let { page = 1, limit = limit, cid } = ctx.query;
        limit = parseInt(limit, 10);
        const offset = (page - 1) * limit;

        const data = await getArticle({
            where: {
                channelId: cid,
                show: 1
            },
            data: {
                limit,
                offset
            }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: data
        }
    }

    /*  获取当前文章前后文章
        @params: 
            id: 文章id
        @return: 
            状态码
            前后文章
    */
    async getAdjacentArticle(ctx) {
        let params = ctx.query;
        let data = await articleModel.findByPk(params.id);
        if (data && data.show) {
            const next = await articleModel.findOne({
                attributes: ['id', 'title'],
                where: {
                    id: {
                        $lt: params.id
                    },
                    show: 1,
                    author: params.author
                },
                order: [['id', 'DESC']],
                limit: 1
            });
            const prev = await articleModel.findOne({
                attributes: ['id', 'title'],
                where: {
                    id: {
                        $gt: params.id
                    },
                    show: 1,
                    author: params.author
                },
                order: [['id', 'ASC']],
                limit: 1
            });
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: {
                    prev,
                    next
                }
            }
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.ARTICLE_NOT_EXITS
            }
        }
    }

    /*  关键词搜索文章
        @params:
            keyword: 关键字
        @return:
            articles
    */
    async getArticleByKeyword(ctx) {
        let params = ctx.query;
        const _limit = parseInt(params.limit) || limit;
        let page = params.page || 1;
        let offset = (page - 1) * _limit;
        let keyword = params.keyword;

        const where = {
            show: params.show,
            $or: [
                {title: {$like: `%${keyword}%`}},
                {desc: {$like: `%${keyword}%`}},
                {tags: {$like: `%${keyword}%`}}
            ]
        };
        if (params.show == 0) {
            where.authorId = ctx.session.user.id;
        }

        if (params.channel) { // 如果请求参数有这个值就表明是在频道页内搜索
            where.channelId = params.channel;
        }

        let data = await getArticle({
            where: where,
            data: {
                limit: _limit,
                offset,
                sort: params.sort,
                sortrole: params.sortway || 'pubtime'
            }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: data
        }
    }

    /*  点赞文章
        @params:
            id: 文章id
        @return:
            状态码
    */
    async likeArticle(ctx) {
        let id = ctx.query.id;
        let data = await articleModel.findByPk(id);
        if (data.id) {
            await articleModel.update({
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

    /*  获取文章数
        @params: none
        @return: article's count
    */
    async getArticleCount(ctx) {
        let query = ctx.query;
        let wParams = {
            show: 1
        }
        if (query.uid) {
            wParams.author = query.uid;
            if (query.show == 0 && (query.uid == ctx.session.user.id || util.checkAdmin(ctx.session.user))) {
                wParams.show = 0;  // 只有当传的uid与当前登录的用户信息匹配或管理员才置为0，否则过滤
            }
        } else if (query.cid) {
            wParams.channel = query.cid;
        }
        let data = await articleModel.count({
            where: wParams
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: data
        }
    }

    // 获取所有可见的文章
    async getAllArticles (ctx) {
        const limit = parseInt(ctx.query.limit) || 5;
        const page = ctx.query.page || 1;
        
        let data = await getArticle({
            where: { show: 1 },
            data: {
                limit,
                offset: (page - 1) * limit,
                oerder: [['rec', 'DESC'], ['pubtime', 'DESC']]
            }            
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: data
        }
    }

    // 推荐或取消推荐文章
    async recArticle (ctx) {
        if (!util.checkAdmin(ctx.session.user)) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.ARTICLE_NOT_EXITS
            }
        }
        const id = ctx.request.body.id;
        const data = await articleModel.findByPk(id);
        await articleModel.update({
            rec: data.rec ? 0 : 1
        }, {
            where: { id }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        }
    }

    // 获取某篇文章的相关推荐
    async getArticleAboutRec (ctx) {
        const id = ctx.query.id;
        const article = await articleModel.findByPk(id);
        if (!article.id) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.ARTICLE_NOT_EXITS
            }
        }

        const list = await getArticle({
            where: {
                channelId: article.channelId,
                id: { $ne: id },
                show: 1
            },
            data: {
                limit: 5,
                sortrole: 'views'
            }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: list
        }
    }

    /*  这是首页顶部推荐列表，由文章或画册组成
        首先分别获取推荐的文章和画册然后合并
        合并后根据点击率进行DESC排序
        判断列表的长度，超过12条去掉大于12的数据
        小于10条重新查询点击量较高但并未被推荐的文章补充上
    */
    async getHomeRecArticleAndAlbum(ctx) {
        authorModel.hasMany(articleModel);
        articleModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });
        authorModel.hasMany(albumModel);
        albumModel.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });
        const articles = await articleModel.findAll({
            where: { rec: 1, show: 1 },
            include: [{
                model: authorModel,
                attributes: ['id', 'nickname']
            }],
            order: [['views', 'DESC']]
        });

        const albums = await albumModel.findAll({
            where: { rec: 1 },
            include: [{
                model: authorModel,
                attributes: ['id', 'nickname']
            }],
            order: [['views', 'DESC']]
        });

        let newArticles = [];
        articles.forEach(item => {
            newArticles.push({
                id: item.id,
                title: item.title,
                author: item.author,
                cover: item.cover,
                views: item.views,
                likes: item.likes,
                type: 'article'
            });
        });

        let newAlbums = [];
        albums.forEach(item => {
            newAlbums.push({
                id: item.id,
                title: item.name,
                author: item.author,
                cover: item.cover,
                views: item.views,
                likes: item.likes,
                type: 'album'
            });
        });

        let data = newArticles.concat(newAlbums);
        let list = data.sort(compare('views'));

        if (list.length > 12) {
            list.splice(12);
        }

        if (list.length < 10) {
            const altArticles = await articleModel.findAll({
                where: { rec: 0, show: 1 },
                include: [{
                    model: authorModel,
                    attributes: ['id', 'nickname']
                }],
                order: [['views', 'DESC']],
                limit: 10 - list.length
            });

            let newAltArticles = [];
            altArticles.forEach(item => {
                newAltArticles.push({
                    id: item.id,
                    title: item.title,
                    author: item.author,
                    cover: item.cover,
                    views: item.views,
                    likes: item.likes,
                    type: 'article'
                });
            })

            list = list.concat(newAltArticles);
        }

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: list
        }

    }


    /*  按频道和作者获取文章列表，没有条数限制
        @params: 
            cid: 频道id,
            author: 作者
        @return: 
            状态码
            文章列表
    */
    async getByChannelAndAuthorNoLimit(ctx) {
        const params = ctx.query;

        const data = await articleModel.findAll({
            where: {
                authorId: params.author,
                channelId: params.cid,
                show: 1
            },
            attributes: ['id', 'title']
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: data
        }
    }

    /*  按标签和作者获取文章列表，没有条数限制
        @params: 
            tag: 标签,
            author: 作者
        @return: 
            状态码
            文章列表
    */
    async getByTagAndAuthorNoLimit(ctx) {
        const params = ctx.query;

        const data = await articleModel.findAll({
            where: {
                authorId: params.author,
                show: 1,
                tags: {
                    $like: `%${params.tag}%`
                }
            },
            attributes: ['id', 'title', 'tags']
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: data
        }
    }
}

module.exports = new ArticleServer();