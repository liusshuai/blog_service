const uploadServer = require('../server/uploadServer');
const CONSTANTS = require('../constants');
const path = require('path');
const { root } = require('../../config');

class uploadController {
    constructor () {
        this.name = 'upload'
    }

    async uploadFile (ctx) {
        let result = new Map();
        try {
            let useraccount = ctx.session.user ? ctx.session.user.account : 'common';
            let type = ctx.query && ctx.query.type ? ctx.query.type : 'common';
            let localpath = path.join(root, 'static', useraccount);
            let data = await uploadServer.uploadfile(ctx, {
                path: localpath,
                fileType: type,
                user: useraccount
            });

            result.set('success', data.success);
            result.set('data', data.formData);
            result.set('msg', data.message);
        } catch (error) {
            console.log(error);
            result.set('code', CONSTANTS.FAILD_CODE);
            result.set('msg', CONSTANTS.FAILD_MSG);
        }

        ctx.body = {
            success: result.get('success'),
            msg: result.get('msg'),
            data: result.get('data')
        };
    }
}

module.exports = new uploadController();