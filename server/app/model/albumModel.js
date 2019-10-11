const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');
const moment = require('moment');

const AlbumModel = sequelize.define('album', {
    id: {
        field: 'id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键，画册唯一标识符'
    },
    name: {
        field: 'name',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '画册名字'
    },
    desc: {
        field: 'desc',
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '简介'
    },
    tags: {
        field: 'tags',
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '标签'
    },
    createtime: {
        field: 'createtime',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('createtime')).format('YYYY-MM-DD HH:mm:ss');
        },
        comment: '创建时间'
    },
    views: {
        field: 'views',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        defaultValue: 0,
        comment: '阅读数'
    },
    likes: {
        field: 'likes',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        defaultValue: 0,
        comment: '喜欢数'
    },
    channelId: {
        field: 'channel',
        type: Sequelize.BIGINT(10),
        allowNull: false,
        comment: '关联频道'
    },
    cover: {
        field: 'cover',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '画册封面'
    },
    authorId: {
        field: 'author',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '画册作者'
    },
    rec: {
        field: 'rec',
        type: Sequelize.BIGINT(2),
        allowNull: true,
        defaultValue: 0,
        comment: '是否推荐'
    },
    img: {
        field: 'imgcount',
        type: Sequelize.BIGINT(2),
        allowNull: true,
        defaultValue: 0,
        comment: '图片数量'
    }
}, {
        freezeTableName: true, // true表示可以自定义表名
        tableName: 'album' // 自定义表名
    });

module.exports = AlbumModel;