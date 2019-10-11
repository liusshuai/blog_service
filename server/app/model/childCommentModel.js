const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');
const moment = require('moment');

const childCommentModel = sequelize.define('child_comment', {
    id: {
        field: 'child_comment_id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键，子评论唯一标识符'
    },
    commentId: {
        field: 'parent_id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '所属的父留言id'
    },
    content: {
        field: 'content',
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '评论内容'
    },
    sname: {
        field: 'req_user_name',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '评论者昵称'
    },
    authorId: {
        field: 'req_user_id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '评论者id'
    },
    rname: {
        field: 'res_user_name',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '接收者昵称'
    },
    rid: {
        field: 'res_user_id',
        type: Sequelize.BIGINT(8),
        allowNull: true,
        comment: '接收者id'
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
    }
}, {
    freezeTableName: true, // true表示可以自定义表名
    tableName: 'child_comment' // 自定义表名
});

module.exports = childCommentModel;