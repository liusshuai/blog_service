const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');

const blogFollowerModel = sequelize.define('blogfollower', {
    id: {
        field: 'id',
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键，评论唯一标识符'
    },
    username: {
        field: 'username',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '用户昵称'
    },
    email: {
        field: 'email',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '用户邮箱'
    }
}, {
    freezeTableName: true, // true表示可以自定义表名
    raw: true,
    tableName: 'blogfollower' // 自定义表名
});

module.exports = blogFollowerModel;