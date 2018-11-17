'use strict'

const API = require('../lib/API.class')

module.exports = (req, res, next) => {
    req.API = new API(req, res)

    if (req.API.method === 'OPTIONS') {
        req.API.quickResponse()
    } else {
        next()
    }
}