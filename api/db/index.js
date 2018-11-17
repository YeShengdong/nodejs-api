'use strict'

const config = require('../../config')
const logger = require('log4js').getLogger('mongodb')
const mongoose = require('mongoose')
const dbUrl = config.api.db.server
let dbOptions = null

// logger.setLevel(config.logger.level)

/**
 * 连接
 */

// Use native promises
// mongoose.Promise = global.Promise;
// assert.equal(query.exec().constructor, global.Promise);

// Use bluebird
mongoose.Promise = require('bluebird')
// assert.equal(query.exec().constructor, require('bluebird'));

if (config.api.db.uid !== '') {
    dbOptions = {
        useMongoClient: true,
        user: config.api.db.uid,
        pass: config.api.db.pwd,
        reconnectTries: Number.MAX_VALUE,   // Never stop trying to reconnect
        reconnectInterval: 3000,    // Reconnect every 3000ms
        poolSize: 10,   // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        keepAlive: 120
    }
}

mongoose.connect(dbUrl, dbOptions)

const db = mongoose.connection

/**
 * 连接成功
 */
db.on('connected', () => {
    logger.info('Mongoose connection open to ' + dbUrl)
})

/**
 * 连接异常
 */
db.on('error', (err) => {
    logger.error('Mongoose connection error: ' + err)
})

/**
 * 连接断开
 */
db.on('disconnected', () => {
    logger.warn('Mongoose connection disconnected')
})

module.exports = mongoose
