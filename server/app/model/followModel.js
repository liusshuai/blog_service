const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');

const FollowModel = sequelize.define('follows', {
    id: {
        field: 'id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键'
    },
    ownid: {
        field: 'own_id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '所属用户id'
    },
    authorId: {
        field: 'user_id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '关注用户id'
    },
    each: {
        field: 'each',
        type: Sequelize.BIGINT(2),
        allowNull: false,
        defaultValue: 0,
        comment: '是否互相关注'
    }
}, {
    freezeTableName: true, // true表示可以自定义表名
    tableName: 'follows' // 自定义表名
});

module.exports = FollowModel;