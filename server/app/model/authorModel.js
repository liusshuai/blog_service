const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');

const authorModel = sequelize.define('author', {
    id: {
        field: 'id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键，z主播唯一标识符'
    },
    account: {
        field: 'account',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '账号'
    },
    password: {
        field: 'password',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '密码'
    },
    nickname: {
        field: 'nickname',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '昵称'
    },
    avator: {
        field: 'avator',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '头像'
    },
    bgcover: {
        field: 'bg_cover',
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '主页背景图'
    },
    intro: {
        field: 'intro',
        type: Sequelize.TEXT,
        allowNull: true,
        comment: '个人简介'
    },
    followers: {
        field: 'followers',
        type: Sequelize.BIGINT(16),
        allowNull: true,
        defaultValue: 0,
        comment: '关注数'
    },
    admin: {
        field: 'admin',
        type: Sequelize.BIGINT(2),
        allowNull: false,
        defaultValue: 0,
        comment: '管理员标记'
    },
    rec: {
        field: 'rec',
        type: Sequelize.BIGINT(2),
        allowNull: false,
        defaultValue: 0,
        comment: '推荐标记'
    },
    articlecount: {
        field: 'articles',
        type: Sequelize.BIGINT(6),
        allowNull: false,
        defaultValue: 0,
        comment: '文章数'
    },
    albumcount: {
        field: 'albums',
        type: Sequelize.BIGINT(6),
        allowNull: false,
        defaultValue: 0,
        comment: '画册数'
    },
    tweetcount: {
        field: 'tweets',
        type: Sequelize.BIGINT(6),
        allowNull: false,
        defaultValue: 0,
        comment: '时刻数'
    },
    ide: {
        field: 'ide',
        type: Sequelize.STRING(20),
        allowNull: true,
        comment: '认证'
    },
    lock: {
        field: 'lock',
        type: Sequelize.BIGINT(2),
        allowNull: false,
        defaultValue: 0,
        comment: '是否屏蔽'
    }
}, {
    freezeTableName: true, // true表示可以自定义表名
    tableName: 'author' // 自定义表名
});

module.exports = authorModel;