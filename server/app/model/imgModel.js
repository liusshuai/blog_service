const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');

const imgModel = sequelize.define('imgs', {
    id: {
        field: 'id',
        type: Sequelize.BIGINT(11),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键，图片唯一标识符'
    },
    src: {
        field: 'src',
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '图片的链接地址'
    },
    pid: {
        field: 'pid',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '图片的父id'
    },
    type: {
        field: 'type',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        comment: '图片的类型，1：文章，2：推文，3：论坛，4：画册'
    }
}, {
    freezeTableName: true, // true表示可以自定义表名
    tableName: 'imgs' // 自定义表名
});

module.exports = imgModel;