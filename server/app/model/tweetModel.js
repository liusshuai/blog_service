const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');
const moment = require('moment');

const boardModel = sequelize.define('tweet', {
    id: {
        field: 'id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键，留言板唯一标识符'
    },
    authorId: {
        field: 'userid',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '用户id'
    },
    content: {
        field: 'content',
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '内容'
    },
    pubtime: {
        field: 'pubtime',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('pubtime')).format('YYYY-MM-DD HH:mm:ss');
        },
        comment: '发布时间'
    },
    video: {
        field: 'video',
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '视频链接'
    },
    imgs: {
        field: 'imgs',
        type: Sequelize.TEXT,
        allowNull: true,
        comment: '图片集合'
    },
    fromw: {
        field: 'fromw',
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: 'PC网页版',
        comment: '来自'
    },
    likenum: {
        field: 'like_num',
        type: Sequelize.BIGINT(10),
        allowNull: true,
        defaultValue: 0,
        comment: '点赞数'
    }
}, {
    freezeTableName: true, // true表示可以自定义表名
    tableName: 'tweet' // 自定义表名
});

module.exports = boardModel;