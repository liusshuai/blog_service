const util = require('../app/util');

module.exports = options => {
    return async (ctx, next) => {
        await next();
        const loginType = util.checkSession(ctx);
        if (!loginType) {
            ctx.redirect('/login');
        }
    }
}