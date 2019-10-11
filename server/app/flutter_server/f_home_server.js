const articleModel = require('../model/articleModel');
const albumModel = require('../model/albumModel');
const channelModel = require('../model/channelModel');
const authorModel = require('../model/authorModel');


async function get_five_data(model, where, sortway) {

    channelModel.hasMany(model);
    model.belongsTo(channelModel, { foreignKey: 'channelId', targetKey: 'id' });
    authorModel.hasMany(model);
    model.belongsTo(authorModel, { foreignKey: 'authorId', targetKey: 'id' });

    const list = await model.findAll({
        where,
        include: [{
            model: authorModel,
            attributes: { exclude: ['password', 'bgcover'] }
        }, {
            model: channelModel,
            attributes: ['id', 'name']
        }],
        order: [[sortway, 'DESC']],
        limit: 5
    });

    const total = await model.count({ where });

    return { list, total };
}


class HomeServer {
    /*
        根据频道id获取画册列表和文章列表，第一次请求只获取5条数据
    */
    async getArticleAndAlbum (ctx) {
       const cid = ctx.query.cid;

       const where = { channelId: cid };

       const album = await get_five_data(albumModel, where, 'likes');
       const article =  await get_five_data(articleModel, {...where, show: 1}, 'pubtime');

       return {album, article};
   }
}

module.exports = new HomeServer();