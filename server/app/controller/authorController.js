const authorServer = require('../server/authorServer');
const CONSTANTS = require('../constants');

class AuthorController {
    constructor () {
        this.name = 'author'
    }
 
    /*  
        @title: 登录
        @user: 所有用户
        @desc: 检测账号是否存在，
        不存在返回用户不存在；
        存在就检测密码是否正确，
        不正确返回密码不正确提示；
    */
    async login (ctx) {
        let result = new Map();
        try {
            let data = await authorServer.login(ctx.request.body);
            if (data.data) {
                let user = data.data;
                ctx.session.user = {
                    id: user.id,
                    account: user.account
                }
                result.set('data', user);
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
        @title: 用户退出
        @user: 登录的用户
        @desc: 检测是否是登录状态，
        未登录返回登录提示；
    */
    async logout (ctx) {
        let result = new Map();
        try {
            let data = await authorServer.logout(ctx);
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
        @title: 用户注册
        @user: 所有用户
        @desc: 检测邮箱是否已被注册，
        注册返回账户已存在的提示；
        检测昵称是否存在，
        存在返回存在的提示；
        检测密码是否大于6位，
        小于6位返回密码长度不够的提示
    */
    async register (ctx) {
        let result = new Map();
        try {
            let data = await authorServer.register(ctx);
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
        @title: 获取用户信息 
        @user: 所有用户
        @desc: 根据id查找用户，不存在返回用户不存在的提示
    */
    async getInfo (ctx) {
        let result = new Map();
        try {
            let data = await authorServer.getInfo(ctx.query);
            data.data && result.set('data', data.data);
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
        @title: 更新用户信息 
        @user: 管理员或者登录的用户
        @desc: 判断是否登录，
            未登录提示登录；
            根据id获取信息，
            若信息为空表明用户不存在，返回用户不存在的提示；
            存在就判断要更改信息的用户id跟登录的用户是否匹配或者是否是管理员，
            不是就返回没有权限的提示；
    */
    async updateInfo (ctx) {
        let result = new Map();
        try {
            let data = await authorServer.updateInfo(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
            data.data && result.set('data', data.data);
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

    async getAllAuthor (ctx) {
        let result = new Map();
        try {
            let data = await authorServer.getAllAuthor(ctx);
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

    async getAuthorByKey(ctx) {
        let result = new Map();
        try {
            let data = await authorServer.getAuthorByKey(ctx);
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

    async getRecAuthor (ctx) {
        let result = new Map();
        try {
            let data = await authorServer.getRecAuthor(ctx);
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

    async getLoginType (ctx) {
        let result = new Map();
        try {
            let data = await authorServer.getLoginType(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
            data.data && result.set('data', data.data);
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

    async SendIdentifyCode(ctx) {
        let result = new Map();
        try {
            let data = await authorServer.SendIdentifyCode(ctx);
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

    async lockuser(ctx) {
        let result = new Map();
        try {
            let data = await authorServer.lockuser(ctx);
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

    async recuser(ctx) {
        let result = new Map();
        try {
            let data = await authorServer.recuser(ctx);
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

    async changePassword(ctx) {
        let result = new Map();
        try {
            let data = await authorServer.changePassword(ctx);
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

    async getAdminInfo(ctx) {
        let result = new Map();
        try {
            let data = await authorServer.getAdminInfo(ctx);
            result.set('code', data.code);
            result.set('msg', data.msg);
            data.data && result.set('data', data.data);
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


    async not_forget_changePassword(ctx) {
        let result = new Map();
        try {
            let data = await authorServer.not_forget_changePassword(ctx);
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

module.exports = new AuthorController();