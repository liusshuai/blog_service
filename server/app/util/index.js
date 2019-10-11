const admin = require('./admin');
const CONSTANTS = require('../constants');

function checkSession (ctx) {
    let user = ctx.session.user;
    return user && user.id && user.account;
}

function checkAdmin (ad) {
    return admin.account == ad.account;
}

function notLoginResponse() {
    return {
        code: CONSTANTS.NO_LOGIN_CODE,
        msg: CONSTANTS.NO_LOGIN
    }
}

module.exports = {
    checkSession,
    checkAdmin,
    notLoginResponse
};
