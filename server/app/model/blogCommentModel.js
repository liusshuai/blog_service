const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');
const moment = require('moment');

const blogCommentModel = sequelize.define('comments', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键，评论唯一标识符'
    },
    host: {
        field: 'host',
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
    pubtime: {
        field: 'time',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('pubtime')).format('YYYY-MM-DD HH:mm:ss');
        },
        comment: '评论时间'
    },
    username: {
        field: 'username',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '评论用户昵称'
    },
    useremail: {
        field: 'useremail',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '评论用户邮箱'
    },
    userblog: {
        field: 'userblog',
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '评论用户网址'
    },
    replyname: {
        field: 'replyname',
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '回复用户昵称'
    },
    replyemail: {
        field: 'replyemail',
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '回复用户邮箱'
    },
    replycontent: {
        field: 'replycontent',
        type: Sequelize.TEXT,
        allowNull: true,
        comment: '被引用的内容'
    },
    type: {
        field: 'type',
        type: Sequelize.TINYINT,
        allowNull: false,
        comment: '类型'
    }
}, {
    freezeTableName: true, // true表示可以自定义表名
    raw: true,
    tableName: 'blog_comments' // 自定义表名
});

module.exports = blogCommentModel;