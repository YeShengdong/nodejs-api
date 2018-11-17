'use strict'

/**
 *  Main configuration
 *
 */

const path = require('path')
const config = {
    'api': {
        'routePrefix': '/api/v1',
        'db': {
            'server': 'mongodb://127.0.0.1:27017/hackathon-api',
            'uid': '',
            'pwd': ''
        },
        'token': {
            'secret': 'testToken',
            'expiresIn': '6h'
        },
        'allowOrigin': '*',
        'allowMethods': 'PUT, POST, GET, DELETE, OPTIONS, PATCH'
    },
    'logger': {
        'level': 'DEBUG',
        'logPath': path.join(__dirname, '/../logs/'),
        'splitSize': 1024 * 1024 * 2
    }
}

module.exports = config
