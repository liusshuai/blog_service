const Sequelize = require('sequelize');
const database = 'myblog';
const username = 'root';
// const password = 'gooddoer,817';
const password = 'liushuai';

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 50,
            min: 0,
            idle: 10000
        },
        define: {
            timestamps: false
        },
        timezone: '+08:00' //东八时区
    }
);

module.exports = sequelize;