const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');
const moment = require('moment');

const articleModel = sequelize.define('articles', {
    id: { 
        field: 'id',
        type: Sequelize.BIGINT(20),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键，文章唯一标识符'
    },
    title: {
        field: 'title',
        type: Sequelize.STRING(100),
        allowNull: false,
        comment: '文章标题'
    },
    authorId: {
        field: 'author',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '作者'
    },
    desc: {
        field: 'desc',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '简介'
    },
    content: {
        field: 'content',
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '内容'
    },
    channelId: {
        field: 'channel',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '文章所属频道'
    },
    tags: {
        field: 'tags',
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '文章标签'
    },
    cover: {
        field: 'imgcover',
        type: Sequelize.STRING(500),
        allowNull: true,
        comment: '文章封面'
    },
    views: {
        field: 'views',
        type: Sequelize.BIGINT(10),
        allowNull: true,
        defaultValue: 0,
        comment: '阅读量'
    },
    likes: {
        field: 'likes',
        type: Sequelize.BIGINT(10),
        allowNull: true,
        defaultValue: 0,
        comment: '点赞量'
    },
    comments: {
        field: 'comments',
        type: Sequelize.BIGINT(10),
        allowNull: true,
        defaultValue: 0,
        comment: '评论数'
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
    show: {
        field: 'show',
        type: Sequelize.TINYINT(2),
        allowNull: false,
        defaultValue: true,
        comment: '是否发布'
    },
    rec: {
        field: 'rec',
        type: Sequelize.TINYINT(2),
        allowNull: false,
        defaultValue: 0,
        comment: '是否推荐'
    }
}, {
    freezeTableName: true, // true表示可以自定义表名
    tableName: 'articles' // 自定义表名
});

module.exports = articleModel;

