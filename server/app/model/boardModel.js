const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');
const moment = require('moment');

const BoardModel = sequelize.define('board', {
    id: {
        field: 'id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键'
    },
    userid: {
        field: 'userid',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '所属用户id'
    },
    content: {
        field: 'content',
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '内容'
    },
    time: {
        field: 'time',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('time')).format('YYYY-MM-DD HH:mm:ss');
        },
        comment: '留言时间'
    },
    avatar: {
        field: 'avatar',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '用户头像'
    },
    sname: {
        field: 'sname',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '用户名称'
    },
    semail: {
        field: 'semail',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '用户邮箱'
    },
    sblog: {
        field: 'sblog',
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '用户博客'
    },
    type: {
        field: 'type',
        type: Sequelize.BIGINT(4),
        allowNull: false,
        defaultValue: 1,
        comment: '类型，区分留言和子留言'
    },
    pid: {
        field: 'parentid',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        defaultValue: 0,
        comment: '父留言id，子留言有效，父留言时为0'
    },
    childs: {
        field: 'childs',
        type: Sequelize.BIGINT(10),
        allowNull: false,
        defaultValue: 0,
        comment: '父留言有效，子留言数目'
    }
}, {
    freezeTableName: true, // true表示可以自定义表名
    tableName: 'messboard' // 自定义表名
});

module.exports = BoardModel;