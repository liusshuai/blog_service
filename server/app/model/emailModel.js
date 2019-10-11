const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');
const moment = require('moment');

const EmailModel = sequelize.define('message', {
    id: {
        field: 'id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键'
    },
    authorId: {
        field: 'sid',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '发送方'
    },
    content: {
        field: 'content',
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '内容'
    },
    reciver: {
        field: 'rid',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '收信方'
    },
    rname: {
        field: 'rname',
        type: Sequelize.STRING,
        allowNull: false,
        comment: '收信方昵称'
    },
    time: {
        field: 'time',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('time')).format('YYYY-MM-DD HH:mm:ss');
        },
        comment: '发送时间'
    },
    isread: {
        field: 'isread',
        type: Sequelize.TINYINT(2),
        allowNull: false,
        defaultValue: 0,
        comment: '是否已读'
    }
}, {
        freezeTableName: true, // true表示可以自定义表名
        tableName: 'message' // 自定义表名
    });

module.exports = EmailModel;