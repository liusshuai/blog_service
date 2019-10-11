const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');

const MovieModel = sequelize.define('movie', {
    id: {
        field: 'id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键'
    },
    name: {
        field: 'name',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '名字'
    },
    cover: {
        field: 'cover',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '封面'
    },
    type: {
        field: 'type',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '类型'
    },
    tag: {
        field: 'tag',
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '类型标签'
    },
    director: {
        field: 'director',
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '导演'
    },
    actor: {
        field: 'actor',
        type: Sequelize.STRING(255),
        allowNull: true,
        comment: '演员'
    },
    desc: {
        field: 'desc',
        type: Sequelize.TEXT,
        allowNull: true,
        comment: '简介'
    },
    content: {
        field: 'content',
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '内容'
    }
}, {
        freezeTableName: true, // true表示可以自定义表名
        tableName: 'movie' // 自定义表名
    });

module.exports = MovieModel;