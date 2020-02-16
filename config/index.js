'use strict'

/**
 *  Main configuration
 *
 */

const path = require('path')
const config = {
    'server': {
        'port': 3200
    },
    'api': {
        'basePath': '/api/v1',
        'db': {
            'server': 'mongodb://127.0.0.1:27017/hackathon-api',
            'uid': '',
            'pwd': ''
        },
        'allowOrigin': '*',
        'allowMethods': 'PUT, POST, GET, DELETE, OPTIONS, PATCH',
        'allowHeaders': '*'
    },
    'swagger': {
        'version': '1.1'
    },
    'logger': {
        'level': 'DEBUG',
        'logPath': path.join(__dirname, '/../logs/'),
        'splitSize': 1024 * 1024 * 2
    }
}

module.exports = config
