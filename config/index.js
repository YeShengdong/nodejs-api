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
            'host': 'localhost',
            'port': 3306,
            'database': 'nodejs-api',
            'username': 'root',
            'password': 'root'
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
