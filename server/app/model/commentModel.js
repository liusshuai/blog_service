const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');
const moment = require('moment');

const commentModel = sequelize.define('comments', {
    id: {
        field: 'comment_id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键，评论唯一标识符'
    },
    role: {
        field: 'role_id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '所属的角色id'
    },
    content: {
        field: 'content',
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '评论内容'
    },
    authorId: {
        field: 'userid',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        defaultValue: 0,
        comment: '评论用户id'
    },
    pubtime: {
        field: 'pubtime',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('pubtime')).format('YYYY-MM-DD HH:mm:ss');
        },
        comment: '评论时间'
    },
    type: {
        field: 'type',
        type: Sequelize.BIGINT(4),
        allowNull: false,
        comment: '类型'
    }
}, {
    freezeTableName: true, // true表示可以自定义表名
    raw: true,
    tableName: 'comments' // 自定义表名
});

module.exports = commentModel;