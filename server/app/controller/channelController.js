const channelServer = require('../server/channelServer');
const CONSTANTS = require('../constants');

class ChannelController {
    constructor () {
        this.name = 'channel'
    } 

    /*  
        @title: 获取所有频道
        @user: 所有用户
        @desc: 若频道列表为空返回频道为空的提示
    */
    async getAllChannel (ctx) {
        let result = new Map();
        try {
            let data = await channelServer.getAllChannel();
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
        @title: 添加频道
        @user: 管理员
        @desc: 判断是否登录，没登录提示登录；
            判断是否是管理员，不是提示没有权限
    */
    async addChannel (ctx) {
        let result = new Map();
        try {
            let data = await channelServer.addChannel(ctx);
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
        @title: 删除频道
        @user: 管理员
        @desc: 判断是否登录，没登录提示登录；
            判断是否是管理员，不是提示没有权限；
            判断频道是否存在，不存在返回不存在的提示；
            判断频道下是否有文章，有文章就不能删除，需要清空该频道下的文章后才能删除该频道
    */
    async deleteChannel (ctx) {
        let result = new Map();
        try {
            let data = await channelServer.deleteChannel(ctx);
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
        @title: 更新频道信息
        @user: 管理员
        @desc: 判断是否是管理员，不是提示没有权限；
    */
    async updateChannelInfo (ctx) {
        let result = new Map();
        try {
            let data = await channelServer.updateChannelInfo(ctx);
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
        @title: 获取频道信息
        @user: 所有人
        @desc: 判断频道是否存在，不存在返回不存在的提示；
    */
    async getChannelById (ctx) {
        let result = new Map();
        try {
            let data = await channelServer.getChannelById(ctx);
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

    async getChannelByKey(ctx) {
        let result = new Map();
        try {
            let data = await channelServer.getChannelByKey(ctx);
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

    async getChannelCountByAuthor(ctx) {
        let result = new Map();
        try {
            let data = await channelServer.getChannelCountByAuthor(ctx);
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

    async getChannelByAuthor(ctx) {
        let result = new Map();
        try {
            let data = await channelServer.getChannelByAuthor(ctx);
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

    async getChannelByType(ctx) {
        let result = new Map();
        try {
            let data = await channelServer.getChannelByType(ctx);
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

    async getArchives(ctx) {
        let result = new Map();
        try {
            const data = await channelServer.getArchives(ctx);
            result.set('code', CONSTANTS.SUCCESS_CODE);
            result.set('msg', CONSTANTS.SUCCESS_MSG);
            result.set('data', data);
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