'use strict'

let API = require('../lib/API.class')

exports.init = (req, res, next) => {
    req.API = new API(req, res)

    if (req.API.method === 'OPTIONS') {
        req.API.quickResponse()
    } else {
        next()
    }
}
