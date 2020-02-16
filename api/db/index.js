'use strict'

const Sequelize = require('sequelize')
const config = require('../../config')
const logger = require('log4js').getLogger('mysql')
const {
    api: {
        db: dbConfig
    }
} = config;
const env = process.env;
const sqlConfig = {
    database: env.DB_DATABASE || dbConfig.database,
    username: env.DB_USERNAME || dbConfig.username,
    password: env.DB_PASSWORD || dbConfig.password,
    host: env.DB_HOST || dbConfig.host,
    port: env.DB_PORT || dbConfig.port
};

const sequelize = new Sequelize(sqlConfig.database, sqlConfig.username, sqlConfig.password, {
    host: sqlConfig.host,
    port: sqlConfig.port,
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        logger.info('Database connection has been established successfully.');
    })
    .catch(err => {
        logger.error('Unable to connect to the database:', err);
    });

module.exports = {
    sequelize,
    Sequelize  
};
