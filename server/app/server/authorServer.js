const authorModel = require('../model/authorModel');
const blogCommentModel = require('../model/blogCommentModel');
const CONSTANTS = require('../constants');
const util = require('../util');
const mail = require('../../mail');
let timer = null;

async function checkNickname (name, id = -1) {
    let data = await authorModel.findOne({
        where: {
            nickname: name
        }
    });
    return data && data.id && data.id != id;
}

function checkPassword (password) {
    return password.length >= 6;
}
 
class AuthorServer {
    constructor () {}

    /*  用户登录
        @params: 
            account: 账号
            password: 密码
        @return: 
            登录状态
    */
    async login (params) {
        let account = params.account;
        let password = params.password;
        let data = await authorModel.findOne({
            where: {
                account
            }
        });
        if (data) {
            if (data.lock) {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: '账号异常，请联系管理员释放账号'
                }
            }
            if (data.password === password) {
		        const user = await authorModel.findOne({
                    where: {
                        account
                    },
                    attributes: {exclude: ['password']}
                });
                return {
                    code: CONSTANTS.SUCCESS_CODE,
                    msg: CONSTANTS.SUCCESS_MSG,
                    data: user
                };
            } else {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: CONSTANTS.PASSWORD_ERROR
                };
            }
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_ACCOUNT
            };
        }
    }

    /*  用户退出
        @params: none
        @return: 退出状态
    */
    async logout (ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        } else {
            ctx.session.user = {};
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        }
    }

    /*  用户注册
        @params:
            account: 邮箱(统一以邮箱为账号)
            password: 密码
            nickname: 昵称
            avator: 头像
            bgcover: 个人中心背景图
            intro: 个人简介
        @return: 
            注册状态
    */
    async register (ctx) {
        const params = ctx.request.body;
        let data = await authorModel.findOne({
            where: {
                account: params.account
            }
        });
        if (data) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.ACCOUNT_EXIST
            }
        } else if (!checkPassword(params.password)) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.PASSWORD_LENGTH_ERROR
            }
        } else if (ctx.session.code !== params.code) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.ERROR_CODE
            }
        } else {
            await authorModel.create({
                account: params.account,
                password: params.password,
                nickname: '新用户' + params.code,
                avator: 'http://www.lsshuai.com/static/images/avatar.png',
                bgcover: 'https://wx1.sinaimg.cn/mw690/006YIGvaly1g1i9x32kjoj31jk1jk4bk.jpg'
            });
            timer && clearTimeout(timer);
            ctx.session.code = '';
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        }
    }

    /*  获取用户信息 
        @params: 
            id: 用户唯一id
        @return: 
            1. 用户存在就返回用户所有信息
            2. 不存在返回’不存在‘提示
    */
    async getInfo (params) {
        let id = params.id || -1;
        let data = await authorModel.findOne({
            where: {id},
            attributes: {exclude: ['password']},
        });

        if (params.id == 17) {
            const comments = await blogCommentModel.count({
                where: {
                    host: 0,
                    type: 3
                }
            });
            data.setDataValue('commentCount', comments);
        }
    
        if (data) {
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: data
            }
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_ACCOUNT
            }
        }
    }

    /*  更新用户信息 
        @params:
            id: 用户唯一id
            nickname: 昵称
            password: 密码
            intro: 简介
            avator: 头像
            bgcover: 个人中心背景
    */
    async updateInfo (ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        } else {
            const params = ctx.request.body;
            const id = ctx.session.user.id;
            const user = await authorModel.findByPk(id);
            if (await checkNickname(params.nickname, id)) {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: '该昵称已被占用',
                }
            } else if (params.ide && params.ide.length > 20) {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: 'flowerId长度大于20',
                }
            } else {
                await authorModel.update({
                    nickname: params.nickname,
                    intro: params.intro,
                    avator: params.avator,
                    bgcover: params.bgcover,
                    ide: params.ide
                }, {
                    where: {
                        id: id
                    }
                });
                const data = await authorModel.findByPk(id);
                return {
                    code: CONSTANTS.SUCCESS_CODE,
                    msg: CONSTANTS.SUCCESS_MSG,
                    data: data
                }
            }
        }
            
    }

    async getAllAuthor (ctx) {
        if (util.checkAdmin(ctx.session.user)) {
            const limit = ctx.query.limit || 5;
            const page = ctx.query.page || 1;
            let list = await authorModel.findAll({
                where: { admin: 0 },
                limit,
                offset: (page - 1) * limit
            });

            let total = await authorModel.count();

            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: {total, list}
            }
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_PERMISSION
            }
        }
    }

    async getAuthorByKey (ctx) {
        const limit = ctx.query.limit || 5;
        const page = ctx.query.page || 1;
        const keyword = ctx.query.keyword;
        const sortway = ctx.query.sortway || 'followers';
        let list = await authorModel.findAll({
            where: {
                nickname: { $like: `%${keyword}%` }
            },
            order: [[sortway, 'DESC']],
            limit,
            offset: (page - 1) * limit
        });

        let total = await authorModel.count({
            where: {
                nickname: { $like: `%${keyword}%` }
            }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: { total, list }
        }
    }

    // 获取推荐用户
    async getRecAuthor (ctx) {
        let list = await authorModel.findAll({
            where: {
                rec: 1
            },
            order: [['rec', 'ASC']]
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: list
        }
    }

    // 获取用户登陆状态
    async getLoginType (ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        } else {
            return await this.getInfo(ctx.session.user);
        }
    }

    // 发送邮箱验证码
    async SendIdentifyCode (ctx) {
        const email = ctx.request.body.email || (ctx.session.user && ctx.session.user.account || '');
        if (!email) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_EMAIL
            }
        }
        const code = Math.random().toString(36).substr(2);
        ctx.session.code = code;
        const params = {
            code: code,
            to: email
        };
        mail.sendIdentifyCode(params);
        timer && clearTimeout(timer);
        timer = setTimeout(() => {  // 定时器，5分钟后验证码失效
            ctx.session.code = '';
        }, 300000);
        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        }
    }

    // 屏蔽或取消屏蔽主播
    async lockuser (ctx) {
        const id = ctx.request.body.id;
        if (!util.checkAdmin(ctx.session.user)) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_PERMISSION
            }
        }
        const data = await authorModel.findByPk(id);
        if (!data.id) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_ACCOUNT
            }
        }
        await authorModel.update({
            lock: data.lock ? 0 : 1
        }, {
            where: { id }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        }
    }

    // 推荐或取消推荐主播
    async recuser(ctx) {
        const id = ctx.request.body.id;
        if (!util.checkAdmin(ctx.session.user)) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_PERMISSION
            }
        }
        const data = await authorModel.findByPk(id);
        if (!data.id) {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_ACCOUNT
            }
        }
        await authorModel.update({
            rec: data.rec ? 0 : 1
        }, {
            where: { id }
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        }
    }

    // 忘记密码修改密码
    async changePassword(ctx) {
        const params = ctx.request.body;
        const data = await authorModel.findOne({
            where: {
                account: params.account
            }
        });

        if (data) {
            if (!checkPassword(params.password)) {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: CONSTANTS.PASSWORD_LENGTH_ERROR
                }
            }

            if (ctx.session.code !== params.code) {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: CONSTANTS.ERROR_CODE
                }
            }

            await authorModel.update({
                password: params.password
            }, {
                    where: { account: params.account }
                });
            timer && clearTimeout(timer);
            ctx.session.code = '';
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_ACCOUNT
            };
        }
    }

    async getAdminInfo(ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        } else {

            return this.getInfo({
                id: ctx.session.user.id
            });
        }
    }



    // 未忘记密码修改密码
    async not_forget_changePassword(ctx) {

        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        }

        const params = ctx.request.body;
        const data = await authorModel.findOne({
            where: {
                account: ctx.session.user.account
            }
        });

        if (data) {

            if (params.oldPassword != data.password) {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: '原密码不准确'
                }
            }

            if (ctx.session.code !== params.code) {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: CONSTANTS.ERROR_CODE
                }
            }

            await authorModel.update({
                password: params.newPassword
            }, {
                where: {
                    account: ctx.session.user.account
                }
            });
            timer && clearTimeout(timer);
            ctx.session.code = '';
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_ACCOUNT
            };
        }
    }
}

module.exports = new AuthorServer();