const Sequelize = require('sequelize');
const sequelize = require('../../config/db.js');
const moment = require('moment');

const breadcastModel = sequelize.define('breadcast', {
    id: {
        field: 'id',
        type: Sequelize.BIGINT(8),
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: '主键'
    },
    time: {
        field: 'time',
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue('time')).format('YYYY-MM-DD HH:mm:ss');
        },
        comment: '发布时间'
    },
    content: {
        field: 'content',
        type: Sequelize.TEXT,
        allowNull: false,
        comment: '发布内容'
    }
}, {
    freezeTableName: true, // true表示可以自定义表名
    tableName: 'breadcast' // 自定义表名
});

module.exports = breadcastModel;