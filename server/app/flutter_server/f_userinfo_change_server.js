const authorModel = require('../model/authorModel');
const CONSTANTS = require('../constants');
const util = require('../util');


class UserInfoChangeServer {


    async changeNickname(ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        } else {
            const params = ctx.request.body;

            const data = await authorModel.findOne({
                where: {nickname: params.nickname}
            });

            const id = ctx.session.user.id;

            if (data && data.id != id) {
                return {
                    code: CONSTANTS.NODATA_CODE,
                    msg: '该昵称已被占用',
                }
            }

            await authorModel.update({
                nickname: params.nickname
            }, {
                where: {id}
            });

            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        }
    }


    async changeIntro(ctx) {
        if (!util.checkSession(ctx)) {
            return util.notLoginResponse();
        } else {
            const params = ctx.request.body;

            const id = ctx.session.user.id;

            if (params.intro.length > 100) {
                return {
                    code: CONSTANTS.FAILD_CODE,
                    msg: '不能超过100字'
                }
            }

            await authorModel.update({
                intro: params.intro
            }, {
                where: {
                    id
                }
            });

            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        }
    }

}

module.exports = new UserInfoChangeServer();