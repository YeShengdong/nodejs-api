const fs = require('fs')
const _ = require('lodash')
const path = require('path')
const config = require('./index')
const maxLogSize = config.logger.splitSize
const level = config.logger.level
const log4jsConfig = {
    'appenders': {
        'access': {
            'type': 'dateFile',
            'filename': path.join(config.logger.logPath, '/http/http.log'),
            'pattern': '-yyyy-MM-dd',
            'maxLogSize': maxLogSize,
            'category': 'http'
        },
        'api': {
            'type': 'dateFile',
            'filename': path.join(config.logger.logPath, '/api/api.log'),
            'pattern': '-yyyy-MM-dd',
            'maxLogSize': maxLogSize,
            'category': 'api'
        },
        'mongodb': {
            'type': 'dateFile',
            'filename': path.join(config.logger.logPath, '/mongodb/mongodb.log'),
            'pattern': '-yyyy-MM-dd',
            'maxLogSize': maxLogSize,
            'category': 'mongodb'
        }
    },
    'categories': {
        'default': { 'appenders': [ 'access' ], 'level': level },
        'http': { 'appenders': [ 'access' ], 'level': level },
        'mongodb': { 'appenders': [ 'mongodb' ], 'level': level },
        'api': { 'appenders': [ 'api' ], 'level': level }
    }
}

//  Create a directory for log if there is no directory on the server
_.forEach(log4jsConfig.appenders, (value, key) => {
    const fileName = key;

    if (fileName !== undefined) {
        const filePath = path.dirname(fileName);

        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
    }
})

module.exports = log4jsConfig
