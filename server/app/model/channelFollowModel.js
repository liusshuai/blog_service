const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');
const moment = require('moment');

const ChannelModel = sequelize.define('chanelfollow', {
    id: {
        field: 'id',
        type: Sequelize.BIGINT(6),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键'
    },
    ownid: {
        field: 'ownid',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '主播id'
    },
    channelId: {
        field: 'cid',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '频道id'
    }
}, {
        freezeTableName: true, // true表示可以自定义表名
        tableName: 'chanelfollow' // 自定义表名
    });

module.exports = ChannelModel;