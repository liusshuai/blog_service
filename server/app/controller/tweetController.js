const tweetServer = require('../server/tweetServer');
const CONSTANTS = require('../constants');

class ChannelController {
    constructor () {
        this.name = 'tweet'
    } 

    /*  
        @title: 获取推特列表
        @user: 所有用户
        @desc: 传入页码获取指定推特列表
    */
    async getTweetByPage (ctx) {
        let result = new Map();
        try {
            let data = await tweetServer.getTweetByPage(ctx);
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
        @title: 根据用户获取推特列表
        @user: 所有用户
        @desc: 传入页码和用户id获取指定推特列表
    */
    async getTweetByUser (ctx) {
        let result = new Map();
        try {
            let data = await tweetServer.getTweetByUser(ctx);
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
        @title: 新增推特
        @user: 注册用户
        @desc: 判断是否登录，登录才可以发布推文
    */
    async addTweet (ctx) {
        let result = new Map();
        try {
            let data = await tweetServer.addTweet(ctx);
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
        @title: 删除推特
        @user: 注册用户或管理员
        @desc: 判断是否登录，没登录提示登录；
            判断推文是否存在，不存在提示不存在；
            判断当前登录信息与推文作者是否匹配或是否是管理员，
            只有推文作者和管理员有权限删除推文
    */
    async deleteTweet (ctx) {
        let result = new Map();
        try {
            let data = await tweetServer.deleteTweet(ctx);
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
        @title: 点赞推特
        @user: 所有用户
        @desc: 判断推文是否存在，不存在提示不存在；
    */
    async likeTweet (ctx) {
        let result = new Map();
        try {
            let data = await tweetServer.likeTweet(ctx);
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

    async getTweetDetail(ctx) {
        let result = new Map();
        try {
            let data = await tweetServer.getTweetDetail(ctx);
            result.set('data', data);
            result.set('code', CONSTANTS.SUCCESS_CODE);
            result.set('msg', CONSTANTS.SUCCESS_MSG);
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


    async getMyConcernAuthorsTweet(ctx) {
        let result = new Map();
        try {
            let data = await tweetServer.getMyConcernAuthorsTweet(ctx);
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

    async changeTweetShowType(ctx) {
        let result = new Map();
        try {
            let data = await tweetServer.changeTweetShowType(ctx);
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


    async getMyTweet(ctx) {
        let result = new Map();
        try {
            let data = await tweetServer.getMyTweet(ctx);
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
}

module.exports = new ChannelController();