const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');
const moment = require('moment');

const forumModel = sequelize.define('forum', {
    id: {
        field: 'id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键'
    },
    title: {
        field: 'title',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '帖子标题'
    },
    authorId: {
        field: 'author',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '楼主'
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
    views: {
        field: 'views',
        type: Sequelize.BIGINT(10),
        allowNull: false,
        defaultValue: 0,
        comment: '浏览次数'
    },
    content: {
        field: 'content',
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '帖子内容'
    },
    top: {
        field: 'top',
        type: Sequelize.BIGINT(2),
        allowNull: false,
        defaultValue: 0,
        comment: '是否置顶'
    },
    choice: {
        field: 'choice',
        type: Sequelize.BIGINT(2),
        allowNull: false,
        defaultValue: 0,
        comment: '是否精选'
    },
}, {
    freezeTableName: true, // true表示可以自定义表名
    tableName: 'forum' // 自定义表名
});

module.exports = forumModel;