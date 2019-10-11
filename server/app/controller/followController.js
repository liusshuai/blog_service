const followServer = require('../server/followServer');
const CONSTANTS = require('../constants');

class FollowController {
    constructor() {
        this.name = 'follow'
    }

    /*  
        @title: 获取用户关注列表
        @user: 所有用户
        @desc: 根据传入的userid获取关注列表
    */
    async getFollowList(ctx) {
        let result = new Map();
        try {
            let data = await followServer.getFollowList(ctx);
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
        @title: 获取用户关注列表
        @user: 所有用户
        @desc: 根据传入的userid获取关注列表
    */
    async getConcernList(ctx) {
        let result = new Map();
        try {
            let data = await followServer.getConcernList(ctx);
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
        @title: 取消关注
        @user: 登录的用户
        @desc: 根据传入的id删除对应的记录
    */
    async deleteFollow(ctx) {
        let result = new Map();
        try {
            let data = await followServer.deleteFollow(ctx);
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
        @title: 新增关注
        @user: 登录的用户
        @desc: 根据传入的参数新增记录
    */
    async addFollow(ctx) {
        let result = new Map();
        try {
            let data = await followServer.addFollow(ctx);
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

    async getUserFollowType(ctx) {
        let result = new Map();
        try {
            let data = await followServer.getUserFollowType(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
            result.set('data', data.data);
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

    async getConcernChannels(ctx) {
        let result = new Map();
        try {
            let data = await followServer.getConcernChannels(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
            result.set('data', data.data);
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

    async unFollowChannel(ctx) {
        let result = new Map();
        try {
            let data = await followServer.unFollowChannel(ctx);
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

    async getChannelFollowType(ctx) {
        let result = new Map();
        try {
            let data = await followServer.getChannelFollowType(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
            result.set('data', data.data);
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

    async followChannel(ctx) {
        let result = new Map();
        try {
            let data = await followServer.followChannel(ctx);
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

module.exports = new FollowController();