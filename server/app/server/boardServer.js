const boardModel = require('../model/boardModel');
const CONSTANTS = require('../constants');

class BoardServer {
    constructor () {}
 
    async getBoards (ctx) {
        let uid = ctx.query.uid;
        let page = ctx.query.page || 1;
        let limit = CONSTANTS.BOARDS_LIMIT;
        let offset = (page -1) * limit;

        let data = await boardModel.findAll({
            where: {
                userid: uid,
                type: 1
            },
            order: [
                ['time', 'DESC']
            ],
            offset,
            limit
        });

        let childs = [];
        for (let i = 0; i < data.length; i++) {
            childs = await boardModel.findAll({
                where: {type: 2, pid: data[i].id}
            });
            data[i].childs = childs;
        }

        let total = await boardModel.count({
            where: {type: 1, userid: uid}
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG,
            data: {data, total}
        };
    }
    
    async getChildBoards (ctx) {
        let pid = ctx.query.pid;
        let page = ctx.query.page || 1;
        let limit = CONSTANTS.CHILD_BOARDS_LIMIT;
        let offset = (page - 1) * limit;

        let data = await boardModel.findAll({
            where: {
                pid
            },
            offset,
            limit
        });

        if (data.length) {
            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG,
                data: data
            };
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_BOARDS,
                data: data
            };
        }
    }

    async deleteBoard (ctx) {
        let id = ctx.request.body.id;

        let data = await boardModel.findByPk(id);

        if (data.id) {
            if (data.type === 2) {
                boardModel.destroy({where: {id}});
            } else {
                let child = await boardModel.findAll({
                    where: {
                        type: 2,
                        pid: id
                    }
                });

                child.map(async (item) => {
                    await boardModel.destroy({where: {id: item.id}});
                });

                await boardModel.destroy({where: {id}});
            }

            return {
                code: CONSTANTS.SUCCESS_CODE,
                msg: CONSTANTS.SUCCESS_MSG
            }
        } else {
            return {
                code: CONSTANTS.NODATA_CODE,
                msg: CONSTANTS.NO_BOARD
            }
        }
    }

    async addBoard (ctx) {
        let params = ctx.request.body;
        
        await boardModel.create({
            userid: params.uid,
            content: params.content,
            avatar: params.avatar,
            sname: params.name,
            semail: params.email,
            sblog: params.blog,
            type: params.type,
            pid: params.pid
        });

        return {
            code: CONSTANTS.SUCCESS_CODE,
            msg: CONSTANTS.SUCCESS_MSG
        }
    }
}

module.exports = new BoardServer();