const articleServer = require('../server/articleServer');
const CONSTANTS = require('../constants');

class ArticleController {
    constructor () {
        this.name = 'article'
    }
  
   /*  
        @title: 获取首页文章列表
        @user: 所有用户
        @desc: 根据传入的page返回指定页面的数据，每一页的文章数limit默认为5,可在constants/index.js中修改
    */
    async getArticleList (ctx) {
        let result = new Map();
        try {
            let data = await articleServer.getArticleList(ctx);
            if (data.data) {
                result.set('data', data.data);
            }
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    } 

   /* 
        @title: 获取某一篇文章信息
        @user: 所有用户
        @desc: 传入文章id获取文章信息，
            如果文章show为1返回文章列表，
            如果文章show为0判断当前登录信息，
            若文章作者与当前登录信息匹配或者当前登录为管理员则返回文章信息，
            否则返回文章不存在
    */
    async getOneArticle (ctx) {
        let result = new Map();
        try {
            let data = await articleServer.getOneArticle(ctx);
            if (data.data) {
                result.set('data', data.data);
            }
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

   /* 
        @title: 保存文章
        @user: 管理员及主播
        @desc: 如果没有登录先登录，登陆成功后才能进行文章的保存
    */
    async saveArticle (ctx) {
        let result = new Map();
        try {
            let data = await articleServer.saveArticle(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            console.log(err);
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }

   /* 
        @title: 删除文章
        @user: 管理员及主播
        @desc: 如果没有登录先登录；
            先判断文章存不存在，不存在返回不存在提示，
            存在判断用户身份；
            如果是管理员就可以删除任意一篇文章，
            如果不是就要判断该文章是不是当前登录主播的
            是就能删除，不是就返回没权限提示；
    */
    async deleteArticle (ctx) {
        let result = new Map();
        try {
            let data = await articleServer.deleteArticle(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            console.log(err);
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }

    /* 
        @title: 更新文章
        @user: 管理员及主播
        @desc: 如果没有登录先登录；
            先判断文章存不存在，不存在返回不存在提示，
            存在判断用户身份；
            如果是管理员就可以更新任意一篇文章，
            如果不是就要判断该文章是不是当前登录主播的
            是就能更新，不是就返回没权限提示；
    */
    async updateArticle (ctx) {
        let result = new Map();
        try {
            let data = await articleServer.updateArticle(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }

    /* 
        @title: 根据作者返回文章列表
        @user: 所有用户
        @desc: 如果文章为空返回暂无文章的提示；
    */
    async getArticleByAuthor (ctx) {
        let result = new Map();
        try {
            let data = await articleServer.getArticleByAuthor(ctx);
            if (data.data) {
                result.set('data', data.data);
            }
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            console.log(err)
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    } 

    /* 
        @title: 根据频道返回文章列表
        @user: 所有用户
        @desc: 如果文章为空返回暂无文章的提示；
    */
    async getArticleByChannel (ctx) {
        let result = new Map();
        try {
            let data = await articleServer.getArticleByChannel(ctx);
            result.set('data', data.data);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            console.log(err)
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    } 

    /* 
        @title: 获取某一篇文章的前后文章
        @user: 所有用户
        @desc: 此api仅用于查询线上文章的临近文章；
            如果文章不存在或者查询文章的show属性为0,
            返回不存在的提示；
    */
    async getAdjacentArticle (ctx) {
        let result = new Map();
        try {
            let data = await articleServer.getAdjacentArticle(ctx);
            if (data.data) {
                result.set('data', data.data);
            }
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    /* 
        @title: 根据关键词获取文章
        @user: 所有用户
        @desc: 此api仅用于查询线上文章；
            搜索依靠文章标题、描述、标签、作者和频道，
            如果文章为空,返回查询结果为空的的提示；
    */
    async getArticleByKeyword (ctx) {
        let result = new Map();
        try {
            let data = await articleServer.getArticleByKeyword(ctx);
            if (data.data) {
                result.set('data', data.data);
            }
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            console.log(err);
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    /* 
        @title: 点赞文章
        @user: 所有用户
        @desc: 此api仅用于线上文章；
            根据文章id增加文章的喜欢数；
    */
    async likeArticle (ctx) {
        let result = new Map();
        try {
            let data = await articleServer.likeArticle(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }

    /* 
        @title: 返回文章数目
        @user: 所有用户
        @desc: 根据页面参数获取不同的文章数目，
            若参数包含uid表明返回相关作者的文章数目，
            在包含uid的情况下同时包括show，可返回不同状态文章的数目；
            若包含cid表明返回相关频道的文章数目；
    */
    async getArticleCount (ctx) {
        let result = new Map();
        try {
            let data = await articleServer.getArticleCount(ctx);
            result.set('data', data.data);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    /* 
        @title: 返回文章列表
        @user: 作者获取文章
        @desc: 如果没有传入keyword直接按作者id搜索文章
            如果传入了就根据传入的keyword模糊查询获取文章列表
    */
    async getArticles (ctx) {
        let result = new Map();
        try {
            let data = null;
            if (ctx.query.keyword) {
                data = await articleServer.getArticleByKeyword(ctx);
            } else {
                data = await articleServer.getArticleByAuthor(ctx);
            }
            result.set('data', data.data);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async getAllArticles (ctx) {
        let result = new Map();
        try {
            const data = await articleServer.getAllArticles(ctx);
            result.set('data', data.data);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async recArticle(ctx) {
        let result = new Map();
        try {
            const data = await articleServer.recArticle(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg')
        };
    }

    async getArticleAboutRec(ctx) {
        let result = new Map();
        try {
            const data = await articleServer.getArticleAboutRec(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
            result.set('data', data.data);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async getHomeRecArticleAndAlbum(ctx) {
        let result = new Map();
        try {
            const data = await articleServer.getHomeRecArticleAndAlbum(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
            result.set('data', data.data);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async getByChannelAndAuthorNoLimit(ctx) {
        let result = new Map();
        try {
            const data = await articleServer.getByChannelAndAuthorNoLimit(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
            result.set('data', data.data);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }

    async getByTagAndAuthorNoLimit(ctx) {
        let result = new Map();
        try {
            const data = await articleServer.getByTagAndAuthorNoLimit(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
            result.set('data', data.data);
        } catch (err) {
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }
        ctx.body = {
            code: result.get('code'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }
}

module.exports = new ArticleController();