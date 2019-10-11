const commentServer = require('../server/commentServer');
const CONSTANTS = require('../constants');

class CommentController {
    constructor () {
        this.name = 'comment'
    } 

    /*  
        @title: 获取作者留言板
        @user: 所有用户
        @desc: 传入页码和作者id获取留言板
    */
    async getBoardByUserAndPage (ctx) {
        let result = new Map();
        try {
            let data = await commentServer.getBoardByUserAndPage(ctx);
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
        @title: 获取文章评论
        @user: 所有用户
        @desc: 传入页码和文章id获取评论
    */
    async getCommentByArticleAndPage (ctx) {
        let result = new Map();
        try {
            let data = await commentServer.getCommentByArticleAndPage(ctx);
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
        @title: 获取推文评论
        @user: 所有用户
        @desc: 传入页码和推文id获取评论
    */
    async getCommentByTweetAndPage (ctx) {
        let result = new Map();
        try {
            let data = await commentServer.getCommentByTweetAndPage(ctx);
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
        @title: 获取帖子评论
        @user: 系统用户
        @desc: 传入页码和推文id获取评论
    */
    async getCommentByForumAndPage (ctx) {
        let result = new Map();
        try {
            let data = await commentServer.getCommentByForumAndPage(ctx);
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
        @title: 获取画册评论
        @user: 系统用户
        @desc: 传入页码和画册id获取评论
    */
    async getCommentByAlbumAndPage(ctx) {
        let result = new Map();
        try {
            let data = await commentServer.getCommentByAlbumAndPage(ctx);
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
        @title: 获取子评论
        @user: 所有用户
        @desc: 传入页码和父留言id获取评论
    */
    async getChildComments (ctx) {
        let result = new Map();
        try {
            let data = await commentServer.getChildComments(ctx);
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
        @title: 新增子评论
        @user: 所有用户
        @desc: 用户评论时没有填写邮箱则提示用户输入邮箱
            根据传入的参数type判断该记录是留言、文章评论还是推文评论
            根据role选择评论的对象
    */
    async addComment (ctx, next) {
        let result = new Map();
        try {
            let data = await commentServer.addComment(ctx);
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
        @title: 新增子评论
        @user: 所有用户
        @desc: 用户评论时没有填写邮箱则提示用户输入邮箱
            根据传入的参数type判断该记录是留言、文章评论还是推文评论
            根据role选择评论的对象
    */
    async addChildComment (ctx) {
        let result = new Map();
        try {
            let data = await commentServer.addChildComment(ctx);
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
        @title: 删除评论
        @user: 对应主播或管理员
        @desc: 
    */
    async deleteComment (ctx) {
        let result = new Map();
        try {
            let data = await commentServer.deleteComment(ctx);
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
        @title: 删除子评论
        @user: 对应主播或管理员
        @desc: 
    */
    async deleteChildComment (ctx) {
        let result = new Map();
        try {
            let data = await commentServer.deleteChildComment(ctx);
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

}

module.exports = new CommentController();