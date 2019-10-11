const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');
const moment = require('moment');

const channelModel = sequelize.define('channel', {
    id: { 
        field: 'id',
        type: Sequelize.BIGINT(10),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键，频道唯一标识符'
    },
    name: {
        field: 'cname',
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: '频道标题'
    },
    createTime: {
        field: 'createtime',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('createtime')).format('YYYY-MM-DD HH:mm:ss');
        },
        comment: '创建时间'
    },
    desc: {
        field: 'cdesc',
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '简介'
    },
    cover: {
        field: 'cimg',
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: '封面'
    },
    authorId: {
        field: 'boss',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        defaultValue: 0,
        comment: '频道管理员'
    },
    followers: {
        field: 'followers',
        type: Sequelize.BIGINT(6),
        allowNull: false,
        defaultValue: 0,
        comment: '关注数'
    },
    articlecount: {
        field: 'articlecount',
        type: Sequelize.BIGINT(6),
        allowNull: false,
        defaultValue: 0,
        comment: '文章数'
    },
    albumcount: {
        field: 'albumcount',
        type: Sequelize.BIGINT(6),
        allowNull: false,
        defaultValue: 0,
        comment: '画册数'
    },
}, {
    freezeTableName: true, // true表示可以自定义表名
    tableName: 'channel' // 自定义表名
});

module.exports = channelModel;

